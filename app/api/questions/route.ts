/**
 * API Route: Get Questions for Quiz
 * Auto-generates questions if needed, saves for reuse
 */

import { NextRequest, NextResponse } from 'next/server';
import { questionPoolManager } from '@/lib/ai/question-pool-manager';
import { QuestionDifficulty, QuestionCategory } from '@/types/game';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const count = parseInt(searchParams.get('count') || '15');
    const difficulty = (searchParams.get('difficulty') || 'mixed') as
      | QuestionDifficulty
      | 'mixed';
    const category = (searchParams.get('category') || 'mixed') as QuestionCategory | 'mixed';
    const walletAddress = searchParams.get('walletAddress') || undefined;

    console.log(`📝 Getting ${count} questions...`);

    const questions = await questionPoolManager.getQuestionsForQuiz({
      count,
      difficulty,
      category,
      playerWalletAddress: walletAddress,
    });

    return NextResponse.json({
      success: true,
      questions,
      count: questions.length,
      source: 'mixed', // Database + auto-generated
    });
  } catch (error) {
    console.error('❌ Error getting questions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get questions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, targetCount } = body;

    if (action === 'prewarm') {
      console.log(`🔥 Pre-warming question pool...`);

      const result = await questionPoolManager.prewarmQuestionPool(targetCount || 100);

      return NextResponse.json({
        success: true,
        message: 'Question pool pre-warmed',
        generated: result.generated,
        total: result.total,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use action: "prewarm"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
