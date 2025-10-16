/**
 * API Route: Generate Questions
 * Endpoint for admin to trigger AI question generation
 */

import { NextRequest, NextResponse } from 'next/server';
import { questionGenerator } from '@/lib/ai/question-generator';
import { QuestionDifficulty, QuestionCategory } from '@/types/game';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available before processing
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: 'Gemini API key not configured',
          message: 'Please set GOOGLE_GEMINI_API_KEY in your environment variables'
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { 
      difficulty, 
      category, 
      count = 1,
      saveToDb = false,
    } = body;

    // Validate inputs
    if (!difficulty || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: difficulty and category' },
        { status: 400 }
      );
    }

    const validDifficulties: QuestionDifficulty[] = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(difficulty)) {
      return NextResponse.json(
        { error: 'Invalid difficulty. Must be: easy, medium, or hard' },
        { status: 400 }
      );
    }

    const validCategories: QuestionCategory[] = [
      'rainbow_wallet',
      'web3_basics',
      'defi',
      'nfts',
      'security',
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    if (count < 1 || count > 20) {
      return NextResponse.json(
        { error: 'Count must be between 1 and 20' },
        { status: 400 }
      );
    }

    // Generate questions
    console.log(`📝 Generating ${count} ${difficulty} ${category} questions...`);
    
    const result = await questionGenerator.generateBatch(
      count,
      difficulty,
      category
    );

    // Optionally save to database
    let saveResult = null;
    if (saveToDb && result.questions.length > 0) {
      console.log('💾 Saving to database...');
      saveResult = await questionGenerator.saveToDatabase(result.questions);
    }

    return NextResponse.json({
      success: result.success,
      generated: result.questions.length,
      questions: result.questions,
      errors: result.errors,
      saved: saveResult,
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate questions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Question Generation API',
    usage: {
      method: 'POST',
      body: {
        difficulty: 'easy | medium | hard',
        category: 'rainbow_wallet | web3_basics | defi | nfts | security',
        count: 'number (1-20)',
        saveToDb: 'boolean (optional)',
      },
    },
  });
}
