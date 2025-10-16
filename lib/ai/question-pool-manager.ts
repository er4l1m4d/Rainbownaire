/**
 * Question Pool Manager
 * Handles automatic question generation, database caching, and avoiding repeats
 */

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { questionGenerator } from '@/lib/ai/question-generator';
import { getFallbackQuestions } from '@/lib/ai/fallback-questions';
import { Question, QuestionDifficulty, QuestionCategory } from '@/types/game';

export interface QuestionPoolOptions {
  count?: number;
  difficulty?: QuestionDifficulty | 'mixed';
  category?: QuestionCategory | 'mixed';
  excludeQuestionIds?: string[];
  playerWalletAddress?: string;
}

export class QuestionPoolManager {
  /**
   * Get questions for a quiz session
   * Strategy:
   * 1. Try database first (fast, instant)
   * 2. Auto-generate if needed (Gemini, 1-2s)
   * 3. Save generated for reuse
   * 4. Avoid questions player has seen
   */
  async getQuestionsForQuiz(options: QuestionPoolOptions = {}): Promise<Question[]> {
    const {
      count = 15,
      difficulty = 'mixed',
      category = 'mixed',
      excludeQuestionIds = [],
      playerWalletAddress,
    } = options;

    console.log(`📚 Getting ${count} questions for quiz...`);

    try {
      // Get player's history to avoid repeats
      const seenQuestionIds = playerWalletAddress
        ? await this.getPlayerQuestionHistory(playerWalletAddress)
        : [];

      const allExcludedIds = [...excludeQuestionIds, ...seenQuestionIds];

      // Try database first
      const dbQuestions = await this.getApprovedQuestionsFromDB(
        count,
        difficulty,
        category,
        allExcludedIds
      );

      console.log(`✅ Found ${dbQuestions.length}/${count} questions in database`);

      if (dbQuestions.length >= count) {
        return dbQuestions.slice(0, count);
      }

      // Need more - auto-generate!
      const needed = count - dbQuestions.length;
      console.log(`🤖 Auto-generating ${needed} new questions with Gemini...`);

      const newQuestions = await this.autoGenerateQuestions(needed, difficulty, category);

      console.log(`✅ Generated ${newQuestions.length} new questions`);

      const allQuestions = [...dbQuestions, ...newQuestions];

      // Fallback if still not enough
      if (allQuestions.length < count) {
        const fallbackNeeded = count - allQuestions.length;
        console.log(`⚠️ Using ${fallbackNeeded} fallback questions`);

        const fallbackQuestions = getFallbackQuestions(
          difficulty === 'mixed' ? 'medium' : difficulty,
          category === 'mixed' ? 'web3_basics' : category,
          fallbackNeeded
        );

        allQuestions.push(...fallbackQuestions);
      }

      return allQuestions.slice(0, count);
    } catch (error) {
      console.error('❌ Error getting questions:', error);
      return getFallbackQuestions('medium', 'web3_basics', count);
    }
  }

  /**
   * Get approved questions from database - temporarily disabled
   * TODO: Fix Supabase typing issues for deployment
   */
  private async getApprovedQuestionsFromDB(
    count: number,
    difficulty: QuestionDifficulty | 'mixed',
    category: QuestionCategory | 'mixed',
    excludeIds: string[]
  ): Promise<Question[]> {
    // Temporarily disabled due to Supabase typing issues
    // TODO: Fix when Supabase types are properly generated
    console.log('💾 Database queries temporarily disabled for deployment');
    return [];
  }

  /**
   * Auto-generate new questions using Gemini AI
   */
  private async autoGenerateQuestions(
    count: number,
    difficulty: QuestionDifficulty | 'mixed',
    category: QuestionCategory | 'mixed'
  ): Promise<Question[]> {
    try {
      const questions: Question[] = [];

      if (difficulty === 'mixed') {
        const easyCount = Math.ceil(count * 0.4);
        const mediumCount = Math.ceil(count * 0.4);
        const hardCount = count - easyCount - mediumCount;

        const [easy, medium, hard] = await Promise.all([
          this.generateBatch(easyCount, 'easy', category),
          this.generateBatch(mediumCount, 'medium', category),
          this.generateBatch(hardCount, 'hard', category),
        ]);

        questions.push(...easy, ...medium, ...hard);
      } else {
        const generated = await this.generateBatch(count, difficulty, category);
        questions.push(...generated);
      }

      // Auto-approve for seamless UX
      const questionsWithApproval = questions.map((q) => ({
        ...q,
        approved: true,
      }));

      // Save to database for future reuse
      await this.saveQuestionsToDatabase(questionsWithApproval);

      return questionsWithApproval;
    } catch (error) {
      console.error('Error auto-generating questions:', error);
      return [];
    }
  }

  /**
   * Generate batch for specific difficulty/category
   */
  private async generateBatch(
    count: number,
    difficulty: QuestionDifficulty,
    category: QuestionCategory | 'mixed'
  ): Promise<Question[]> {
    const questions: Question[] = [];

    const categories: QuestionCategory[] =
      category === 'mixed'
        ? ['rainbow_wallet', 'web3_basics', 'defi', 'nfts', 'security']
        : [category];

    const questionsPerCategory = Math.ceil(count / categories.length);

    for (const cat of categories) {
      try {
        const result = await questionGenerator.generateBatch(
          Math.min(questionsPerCategory, count - questions.length),
          difficulty,
          cat
        );

        questions.push(
          ...result.questions.map((q) => ({
            id: this.generateId(),
            question_text: q.question,
            answer_options: q.options,
            correct_answer: this.answerToLetter(q.correct_answer, q.options),
            difficulty: q.difficulty,
            category: q.category,
            source_type: 'ai' as const,
            created_at: new Date().toISOString(),
          }))
        );

        if (questions.length >= count) break;
      } catch (error) {
        console.error(`Error generating ${cat} questions:`, error);
      }
    }

    return questions.slice(0, count);
  }

  /**
   * Save questions to database (temporarily disabled)
   * TODO: Fix Supabase typing issues for deployment
   */
  private async saveQuestionsToDatabase(questions: any[]): Promise<void> {
    // Temporarily disabled due to Supabase typing issues
    // TODO: Fix when Supabase types are properly generated
    console.log('💾 Database saving temporarily disabled for deployment');
  }

  /**
   * Get player's question history (avoid repeats) - temporarily disabled
   * TODO: Fix Supabase typing issues for deployment
   */
  private async getPlayerQuestionHistory(walletAddress: string): Promise<string[]> {
    // Temporarily disabled due to Supabase typing issues
    // TODO: Fix when Supabase types are properly generated
    console.log('💾 Player question history temporarily disabled for deployment');
    return [];
  }

  /**
   * Convert answer text to letter
   */
  private answerToLetter(answer: string, options: string[]): 'A' | 'B' | 'C' | 'D' {
    const index = options.indexOf(answer);
    if (index === -1) return 'A';
    return ['A', 'B', 'C', 'D'][index] as 'A' | 'B' | 'C' | 'D';
  }

  /**
   * Shuffle array
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Pre-warm question pool (optional, for better UX) - temporarily disabled
   * TODO: Fix Supabase typing issues for deployment
   */
  async prewarmQuestionPool(targetCount: number = 100): Promise<{
    generated: number;
    total: number;
  }> {
    console.log(`🔥 Pre-warming question pool to ${targetCount} questions...`);

    // Temporarily disabled due to Supabase typing issues
    // TODO: Fix when Supabase types are properly generated
    console.log('💾 Database queries temporarily disabled for deployment');

    return {
      generated: 0,
      total: 0,
    };
  }
}

// Export singleton
export const questionPoolManager = new QuestionPoolManager();
