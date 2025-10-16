/**
 * API Route: Batch Question Generation (Cron Job Ready)
 * Endpoint for automated daily question generation
 * Can be triggered by Vercel Cron or external scheduler
 */

import { NextRequest, NextResponse } from 'next/server';
import { questionGenerator } from '@/lib/ai/question-generator';
import { checkQuestionCacheHealth } from '@/lib/ai/fallback-questions';
import { QuestionCategory, QuestionDifficulty } from '@/types/game';

/**
 * Batch generation strategy:
 * - Generate 60 questions total per day
 * - Distribute across all categories
 * - Mix of difficulties (40% easy, 40% medium, 20% hard)
 */
const DAILY_GENERATION_CONFIG = {
  totalQuestions: 60,
  categories: [
    'rainbow_wallet',
    'web3_basics',
    'defi',
    'nfts',
    'security',
  ] as QuestionCategory[],
  difficultyDistribution: {
    easy: 0.4,
    medium: 0.4,
    hard: 0.2,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Verify authorization (in production, check API key or secret)
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.CRON_SECRET || 'your-cron-secret';
    
    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🚀 Starting batch question generation...');

    // Check current question cache health
    const healthCheck = await checkQuestionCacheHealth();
    console.log('📊 Cache health:', healthCheck);

    // Calculate questions per category
    const questionsPerCategory = Math.floor(
      DAILY_GENERATION_CONFIG.totalQuestions / DAILY_GENERATION_CONFIG.categories.length
    );

    const results = {
      timestamp: new Date().toISOString(),
      totalGenerated: 0,
      totalSaved: 0,
      totalFailed: 0,
      categoryResults: [] as any[],
      errors: [] as string[],
    };

    // Generate questions for each category
    for (const category of DAILY_GENERATION_CONFIG.categories) {
      console.log(`\n📝 Generating questions for ${category}...`);

      const easyCount = Math.ceil(questionsPerCategory * DAILY_GENERATION_CONFIG.difficultyDistribution.easy);
      const mediumCount = Math.ceil(questionsPerCategory * DAILY_GENERATION_CONFIG.difficultyDistribution.medium);
      const hardCount = questionsPerCategory - easyCount - mediumCount;

      const categoryResult = {
        category,
        easy: { generated: 0, saved: 0 },
        medium: { generated: 0, saved: 0 },
        hard: { generated: 0, saved: 0 },
        errors: [] as string[],
      };

      // Generate easy questions
      try {
        const easyResult = await questionGenerator.generateBatch(easyCount, 'easy', category);
        categoryResult.easy.generated = easyResult.questions.length;
        
        if (easyResult.questions.length > 0) {
          const saveResult = await questionGenerator.saveToDatabase(easyResult.questions);
          categoryResult.easy.saved = saveResult.saved;
          results.totalSaved += saveResult.saved;
        }
        
        results.totalGenerated += easyResult.questions.length;
        categoryResult.errors.push(...easyResult.errors);
      } catch (error) {
        const errorMsg = `Failed to generate easy ${category}: ${error instanceof Error ? error.message : 'Unknown'}`;
        categoryResult.errors.push(errorMsg);
        results.errors.push(errorMsg);
      }

      // Small delay to avoid rate limits
      await sleep(1000);

      // Generate medium questions
      try {
        const mediumResult = await questionGenerator.generateBatch(mediumCount, 'medium', category);
        categoryResult.medium.generated = mediumResult.questions.length;
        
        if (mediumResult.questions.length > 0) {
          const saveResult = await questionGenerator.saveToDatabase(mediumResult.questions);
          categoryResult.medium.saved = saveResult.saved;
          results.totalSaved += saveResult.saved;
        }
        
        results.totalGenerated += mediumResult.questions.length;
        categoryResult.errors.push(...mediumResult.errors);
      } catch (error) {
        const errorMsg = `Failed to generate medium ${category}: ${error instanceof Error ? error.message : 'Unknown'}`;
        categoryResult.errors.push(errorMsg);
        results.errors.push(errorMsg);
      }

      await sleep(1000);

      // Generate hard questions
      try {
        const hardResult = await questionGenerator.generateBatch(hardCount, 'hard', category);
        categoryResult.hard.generated = hardResult.questions.length;
        
        if (hardResult.questions.length > 0) {
          const saveResult = await questionGenerator.saveToDatabase(hardResult.questions);
          categoryResult.hard.saved = saveResult.saved;
          results.totalSaved += saveResult.saved;
        }
        
        results.totalGenerated += hardResult.questions.length;
        categoryResult.errors.push(...hardResult.errors);
      } catch (error) {
        const errorMsg = `Failed to generate hard ${category}: ${error instanceof Error ? error.message : 'Unknown'}`;
        categoryResult.errors.push(errorMsg);
        results.errors.push(errorMsg);
      }

      results.categoryResults.push(categoryResult);
      
      // Longer delay between categories
      await sleep(2000);
    }

    results.totalFailed = DAILY_GENERATION_CONFIG.totalQuestions - results.totalGenerated;

    console.log('\n✅ Batch generation complete!');
    console.log(`   Generated: ${results.totalGenerated}`);
    console.log(`   Saved: ${results.totalSaved}`);
    console.log(`   Failed: ${results.totalFailed}`);

    return NextResponse.json({
      success: true,
      message: 'Batch generation completed',
      ...results,
    });

  } catch (error) {
    console.error('❌ Batch generation failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Batch generation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Batch Question Generation API (Cron Job)',
    usage: {
      method: 'POST',
      headers: {
        authorization: 'Bearer YOUR_CRON_SECRET',
      },
      description: 'Generates a daily batch of questions across all categories',
      config: DAILY_GENERATION_CONFIG,
    },
    vercel_cron: {
      schedule: '0 0 * * *', // Daily at midnight
      example_config: {
        crons: [
          {
            path: '/api/ai/batch-generate',
            schedule: '0 0 * * *',
          },
        ],
      },
    },
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
