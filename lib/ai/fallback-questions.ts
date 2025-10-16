/**
 * Fallback Questions System
 * Provides backup questions when AI generation fails
 */

import { Question, QuestionDifficulty, QuestionCategory } from '@/types/game';
import { sampleQuestions } from '@/lib/data/sampleQuestions';

/**
 * Get fallback questions when AI fails
 * Returns a mix of sample questions or generates from templates
 */
export function getFallbackQuestions(
  difficulty: QuestionDifficulty,
  category: QuestionCategory,
  count: number = 5
): Question[] {
  // First, try to get matching questions from sample pool
  const matchingQuestions = sampleQuestions.filter(
    (q) => q.difficulty === difficulty && q.category === category
  );

  // If we have enough matching questions, return them
  if (matchingQuestions.length >= count) {
    return shuffleArray(matchingQuestions).slice(0, count);
  }

  // If not enough matching, get from same difficulty
  const sameDifficulty = sampleQuestions.filter(
    (q) => q.difficulty === difficulty
  );

  if (sameDifficulty.length >= count) {
    return shuffleArray(sameDifficulty).slice(0, count);
  }

  // As last resort, return any available questions
  return shuffleArray(sampleQuestions).slice(0, count);
}

/**
 * Check if we have enough cached questions in database
 */
export async function checkQuestionCacheHealth(): Promise<{
  healthy: boolean;
  counts: Record<string, number>;
  warnings: string[];
}> {
  const warnings: string[] = [];
  const counts: Record<string, number> = {};

  // This would check Supabase in production
  // For now, we'll use sample questions
  const totalQuestions = sampleQuestions.length;
  counts['total'] = totalQuestions;

  if (totalQuestions < 50) {
    warnings.push('Low total question count. Consider generating more questions.');
  }

  const difficulties: QuestionDifficulty[] = ['easy', 'medium', 'hard'];
  for (const diff of difficulties) {
    const count = sampleQuestions.filter((q) => q.difficulty === diff).length;
    counts[diff] = count;
    
    if (count < 10) {
      warnings.push(`Low ${diff} question count: ${count}`);
    }
  }

  const categories: QuestionCategory[] = [
    'rainbow_wallet',
    'web3_basics',
    'defi',
    'nfts',
    'security',
  ];
  
  for (const cat of categories) {
    const count = sampleQuestions.filter((q) => q.category === cat).length;
    counts[cat] = count;
    
    if (count < 5) {
      warnings.push(`Low ${cat} question count: ${count}`);
    }
  }

  return {
    healthy: warnings.length === 0,
    counts,
    warnings,
  };
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Fallback question templates for emergency use
 */
export const fallbackTemplates = {
  rainbow_wallet: [
    {
      question: 'What is Rainbow Wallet?',
      options: [
        'A Bitcoin mining app',
        'A mobile-first Ethereum wallet',
        'A blockchain explorer',
        'A cryptocurrency exchange',
      ],
      correct_answer: 'A mobile-first Ethereum wallet',
      explanation: 'Rainbow is a fun, simple, and secure way to manage your Ethereum assets.',
      difficulty: 'easy' as QuestionDifficulty,
      category: 'rainbow_wallet' as QuestionCategory,
    },
  ],
  web3_basics: [
    {
      question: 'What does Web3 refer to?',
      options: [
        'The third version of a website',
        'A new internet protocol',
        'The decentralized internet built on blockchain',
        'A web development framework',
      ],
      correct_answer: 'The decentralized internet built on blockchain',
      explanation: 'Web3 represents the next evolution of the internet, built on blockchain technology and emphasizing decentralization.',
      difficulty: 'easy' as QuestionDifficulty,
      category: 'web3_basics' as QuestionCategory,
    },
  ],
};
