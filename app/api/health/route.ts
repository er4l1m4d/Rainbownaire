import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Database configuration missing',
        details: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    const supabase = await createSupabaseServerClient();

    // Test basic connectivity
    const { data: healthData, error: healthError } = await (supabase as any)
      .from('leaderboard_entries')
      .select('count')
      .limit(1);

    if (healthError) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: healthError.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Test players table
    const { data: playersData, error: playersError } = await (supabase as any)
      .from('players')
      .select('count')
      .limit(1);

    if (playersError) {
      return NextResponse.json({
        success: false,
        error: 'Players table not accessible',
        details: playersError.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Get actual leaderboard count
    const { data: leaderboardData, error: leaderboardError } = await (supabase as any)
      .from('leaderboard_entries')
      .select('*', { count: 'exact' });

    if (leaderboardError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch leaderboard data',
        details: leaderboardError.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: {
        totalEntries: leaderboardData?.length || 0,
        environment: {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
        },
        database: {
          connection: '✅ Working',
          tables: {
            players: '✅ Accessible',
            leaderboard_entries: '✅ Accessible'
          }
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
