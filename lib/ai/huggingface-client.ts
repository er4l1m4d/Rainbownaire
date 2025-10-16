/**
 * Hugging Face API Client
 * Handles communication with Hugging Face Inference API for question generation
 */

import { HuggingFaceResponse, HuggingFaceError } from '@/types/ai';

const HF_API_URL = 'https://api-inference.huggingface.co/models';
const DEFAULT_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2'; // Fast, good for structured output

export class HuggingFaceClient {
  private apiKey: string;
  private model: string;
  private maxRetries: number;
  private retryDelay: number;

  constructor(
    apiKey?: string,
    model: string = DEFAULT_MODEL,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ) {
    this.apiKey = apiKey || process.env.HUGGING_FACE_API_KEY || '';
    this.model = model;
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;

    if (!this.apiKey) {
      console.warn('⚠️ Hugging Face API key not found. AI generation will fail.');
    }
  }

  /**
   * Generate text completion from Hugging Face model
   */
  async generateCompletion(
    prompt: string,
    options: {
      temperature?: number;
      max_new_tokens?: number;
      top_p?: number;
      repetition_penalty?: number;
    } = {}
  ): Promise<string> {
    const {
      temperature = 0.7,
      max_new_tokens = 1000,
      top_p = 0.95,
      repetition_penalty = 1.1,
    } = options;

    let lastError: HuggingFaceError | null = null;

    // Retry logic for handling rate limits and temporary failures
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await fetch(`${HF_API_URL}/${this.model}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              temperature,
              max_new_tokens,
              top_p,
              repetition_penalty,
              return_full_text: false,
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          
          // Handle rate limiting with exponential backoff
          if (response.status === 429 || response.status === 503) {
            const waitTime = this.retryDelay * Math.pow(2, attempt);
            console.log(`⏳ Rate limited. Retrying in ${waitTime}ms... (Attempt ${attempt + 1}/${this.maxRetries})`);
            await this.sleep(waitTime);
            continue;
          }

          throw new Error(
            `Hugging Face API error: ${response.status} - ${errorData.error || response.statusText}`
          );
        }

        const data: HuggingFaceResponse = await response.json();

        // Handle different response formats
        if (Array.isArray(data)) {
          return data[0]?.generated_text || '';
        }

        if (typeof data === 'object' && 'generated_text' in data) {
          return data.generated_text;
        }

        throw new Error('Unexpected response format from Hugging Face API');

      } catch (error) {
        lastError = error as HuggingFaceError;
        
        // Don't retry on authentication errors
        if (error instanceof Error && error.message.includes('401')) {
          throw new Error('Invalid Hugging Face API key. Please check your credentials.');
        }

        // Log the error and continue to next retry
        console.error(`❌ Attempt ${attempt + 1} failed:`, error);
        
        if (attempt < this.maxRetries - 1) {
          await this.sleep(this.retryDelay);
        }
      }
    }

    // All retries exhausted
    throw new Error(
      `Failed to generate completion after ${this.maxRetries} attempts. Last error: ${lastError?.message || 'Unknown error'}`
    );
  }

  /**
   * Generate multiple completions in parallel
   */
  async generateBatch(
    prompts: string[],
    options?: {
      temperature?: number;
      max_new_tokens?: number;
      top_p?: number;
      repetition_penalty?: number;
    }
  ): Promise<string[]> {
    const results = await Promise.allSettled(
      prompts.map(prompt => this.generateCompletion(prompt, options))
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`❌ Batch generation failed for prompt ${index}:`, result.reason);
        return ''; // Return empty string for failed generations
      }
    });
  }

  /**
   * Check if the model is available and loaded
   */
  async checkModelStatus(): Promise<{ loaded: boolean; estimatedTime?: number }> {
    try {
      const response = await fetch(`${HF_API_URL}/${this.model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: 'test',
        }),
      });

      if (response.status === 503) {
        const data = await response.json();
        return {
          loaded: false,
          estimatedTime: data.estimated_time,
        };
      }

      return { loaded: true };
    } catch (error) {
      console.error('Error checking model status:', error);
      return { loaded: false };
    }
  }

  /**
   * Utility: Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get current model name
   */
  getModel(): string {
    return this.model;
  }

  /**
   * Switch to a different model
   */
  setModel(model: string): void {
    this.model = model;
  }
}

// Export singleton instance
export const huggingFaceClient = new HuggingFaceClient();
