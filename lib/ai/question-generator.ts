/**
 * Question Generation Service
 * Orchestrates AI question generation, validation, and storage
 */

import { geminiClient } from './gemini-client';
import { generateQuestionPrompt, extractJSON, PromptOptions } from './prompts';
import { Question, QuestionDifficulty, QuestionCategory } from '@/types/game';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export interface GeneratedQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  difficulty: QuestionDifficulty;
  category: QuestionCategory;
}

export interface GenerationResult {
  success: boolean;
  questions: GeneratedQuestion[];
  errors: string[];
}

export class QuestionGenerator {
  /**
   * Generate a single question
   */
  async generateOne(
    difficulty: QuestionDifficulty,
    category: QuestionCategory,
    avoidTopics: string[] = []
  ): Promise<GeneratedQuestion | null> {
    try {
      // Check if API key is available
      if (!process.env.GOOGLE_GEMINI_API_KEY) {
        console.error('❌ GOOGLE_GEMINI_API_KEY environment variable is not set');
        return null;
      }

      const prompt = generateQuestionPrompt({
        difficulty,
        category,
        count: 1,
        avoidTopics,
      });

      console.log('🤖 Generating question...');
      const response = await geminiClient.generateCompletion(prompt, {
        temperature: 0.8, // Higher for more creative questions
        maxOutputTokens: 2048,
        topP: 0.9,
      });

      const parsed = extractJSON(response);
      const question = this.validateAndClean(parsed);

      if (question) {
        console.log('✅ Question generated successfully');
        return question;
      } else {
        console.error('❌ Generated question failed validation');
        return null;
      }
    } catch (error) {
      console.error('❌ Error generating question:', error);
      return null;
    }
  }

  /**
   * Generate multiple questions in batch
   */
  async generateBatch(
    count: number,
    difficulty: QuestionDifficulty,
    category: QuestionCategory,
    avoidTopics: string[] = []
  ): Promise<GenerationResult> {
    const questions: GeneratedQuestion[] = [];
    const errors: string[] = [];

    console.log(`🚀 Starting batch generation: ${count} ${difficulty} questions about ${category}`);

    for (let i = 0; i < count; i++) {
      try {
        const question = await this.generateOne(difficulty, category, avoidTopics);
        
        if (question) {
          questions.push(question);
          console.log(`✅ Generated question ${i + 1}/${count}`);
        } else {
          errors.push(`Failed to generate question ${i + 1}`);
          console.error(`❌ Failed to generate question ${i + 1}/${count}`);
        }

        // Small delay to avoid rate limiting
        if (i < count - 1) {
          await this.sleep(500);
        }
      } catch (error) {
        const errorMsg = `Error generating question ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    console.log(`🎯 Batch generation complete: ${questions.length}/${count} successful`);

    return {
      success: questions.length > 0,
      questions,
      errors,
    };
  }

  /**
   * Generate a balanced set of questions across difficulties
   */
  async generateBalancedSet(
    category: QuestionCategory,
    total: number = 15
  ): Promise<GenerationResult> {
    // Distribution: 40% easy, 40% medium, 20% hard
    const easyCount = Math.ceil(total * 0.4);
    const mediumCount = Math.ceil(total * 0.4);
    const hardCount = total - easyCount - mediumCount;

    console.log(`📊 Generating balanced set for ${category}:`);
    console.log(`  - ${easyCount} easy questions`);
    console.log(`  - ${mediumCount} medium questions`);
    console.log(`  - ${hardCount} hard questions`);

    const [easyResult, mediumResult, hardResult] = await Promise.all([
      this.generateBatch(easyCount, 'easy', category),
      this.generateBatch(mediumCount, 'medium', category),
      this.generateBatch(hardCount, 'hard', category),
    ]);

    return {
      success: easyResult.success || mediumResult.success || hardResult.success,
      questions: [
        ...easyResult.questions,
        ...mediumResult.questions,
        ...hardResult.questions,
      ],
      errors: [
        ...easyResult.errors,
        ...mediumResult.errors,
        ...hardResult.errors,
      ],
    };
  }

  /**
   * Save generated questions to Supabase
   */
  async saveToDatabase(questions: GeneratedQuestion[]): Promise<{
    saved: number;
    failed: number;
    errors: string[];
  }> {
    const supabase = await createSupabaseServerClient();
    let saved = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const question of questions) {
      try {
        const { error } = await supabase.from('questions').insert({
          question_text: question.question,
          answer_options: question.options,
          correct_answer: question.correct_answer,
          difficulty: question.difficulty,
          category: question.category,
          source_type: 'ai_generated',
          created_at: new Date().toISOString(),
        });

        if (error) {
          failed++;
          errors.push(`Failed to save question: ${error.message}`);
          console.error('❌ Database error:', error);
        } else {
          saved++;
          console.log('✅ Question saved to database');
        }
      } catch (error) {
        failed++;
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Exception saving question: ${errorMsg}`);
        console.error('❌ Exception:', error);
      }
    }

    console.log(`💾 Database save complete: ${saved} saved, ${failed} failed`);

    return { saved, failed, errors };
  }

  /**
   * Validate and clean a generated question
   */
  private validateAndClean(data: any): GeneratedQuestion | null {
    try {
      // Check required fields
      if (!data.question || !data.options || !data.correct_answer) {
        console.error('Missing required fields');
        return null;
      }

      // Validate options array
      if (!Array.isArray(data.options) || data.options.length !== 4) {
        console.error('Invalid options array (must have exactly 4 options)');
        return null;
      }

      // Validate correct answer is in options
      if (!data.options.includes(data.correct_answer)) {
        console.error('Correct answer not found in options');
        return null;
      }

      // Validate difficulty
      const validDifficulties: QuestionDifficulty[] = ['easy', 'medium', 'hard'];
      if (!validDifficulties.includes(data.difficulty)) {
        console.error('Invalid difficulty level');
        return null;
      }

      // Validate category
      const validCategories: QuestionCategory[] = [
        'rainbow_wallet',
        'web3_basics',
        'defi',
        'nfts',
        'security',
      ];
      if (!validCategories.includes(data.category)) {
        console.error('Invalid category');
        return null;
      }

      // Clean and return
      return {
        question: this.cleanText(data.question),
        options: data.options.map((opt: string) => this.cleanText(opt)),
        correct_answer: this.cleanText(data.correct_answer),
        explanation: this.cleanText(data.explanation || ''),
        difficulty: data.difficulty,
        category: data.category,
      };
    } catch (error) {
      console.error('Validation error:', error);
      return null;
    }
  }

  /**
   * Clean text by removing extra whitespace and formatting
   */
  private cleanText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, ' ') // Replace newlines with space
      .replace(/[""]/g, '"') // Normalize quotes
      .replace(/['']/g, "'"); // Normalize apostrophes
  }

  /**
   * Utility: Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const questionGenerator = new QuestionGenerator();
