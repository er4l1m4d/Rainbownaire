/**
 * Google Gemini API Client
 * Handles communication with Google Gemini API for question generation
 * Free tier: 60 requests per minute
 */

// No specific types needed - Gemini has its own response format

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_MODEL = 'gemini-1.5-flash'; // Fast and free

export class GeminiClient {
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
    this.apiKey = apiKey || process.env.GOOGLE_GEMINI_API_KEY || '';
    this.model = model;
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;

    if (!this.apiKey) {
      console.warn('⚠️ Google Gemini API key not found. AI generation will fail.');
    }
  }

  /**
   * Generate text completion from Gemini model
   */
  async generateCompletion(
    prompt: string,
    options: {
      temperature?: number;
      maxOutputTokens?: number;
      topP?: number;
      topK?: number;
    } = {}
  ): Promise<string> {
    const {
      temperature = 0.8,
      maxOutputTokens = 2048,
      topP = 0.95,
      topK = 40,
    } = options;

    let lastError: Error | null = null;

    // Retry logic for handling rate limits and temporary failures
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await fetch(
          `${GEMINI_API_URL}/${this.model}:generateContent?key=${this.apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature,
                maxOutputTokens,
                topP,
                topK,
                responseMimeType: 'application/json', // Force JSON output
              },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));

          // Handle rate limiting with exponential backoff
          if (response.status === 429 || response.status === 503) {
            const waitTime = this.retryDelay * Math.pow(2, attempt);
            console.log(
              `⏳ Rate limited. Retrying in ${waitTime}ms... (Attempt ${attempt + 1}/${this.maxRetries})`
            );
            await this.sleep(waitTime);
            continue;
          }

          throw new Error(
            `Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText}`
          );
        }

        const data = await response.json();

        // Extract text from Gemini response format
        if (
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content &&
          data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0]
        ) {
          return data.candidates[0].content.parts[0].text || '';
        }

        throw new Error('Unexpected response format from Gemini API');
      } catch (error) {
        lastError = error as Error;

        // Don't retry on authentication errors
        if (error instanceof Error && error.message.includes('401')) {
          throw new Error('Invalid Gemini API key. Please check your credentials.');
        }

        if (error instanceof Error && error.message.includes('400')) {
          throw new Error(
            'Bad request to Gemini API. Check your prompt format.'
          );
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
      maxOutputTokens?: number;
      topP?: number;
      topK?: number;
    }
  ): Promise<string[]> {
    const results = await Promise.allSettled(
      prompts.map((prompt) => this.generateCompletion(prompt, options))
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(
          `❌ Batch generation failed for prompt ${index}:`,
          result.reason
        );
        return ''; // Return empty string for failed generations
      }
    });
  }

  /**
   * Check if the API key is valid
   */
  async checkApiKey(): Promise<{ valid: boolean; error?: string }> {
    try {
      const response = await fetch(
        `${GEMINI_API_URL}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: 'test',
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.status === 401 || response.status === 403) {
        return {
          valid: false,
          error: 'Invalid API key',
        };
      }

      return { valid: true };
    } catch (error) {
      console.error('Error checking API key:', error);
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Utility: Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
export const geminiClient = new GeminiClient();
