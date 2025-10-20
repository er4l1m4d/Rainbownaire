import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeFilter = searchParams.get('timeFilter') || 'allTime';
    const limit = parseInt(searchParams.get('limit') || '50');

    const supabase = await createSupabaseServerClient();

    // Build the query based on time filter
    let query = supabase
      .from('leaderboard_entries')
      .select(`
        id,
        player_id,
        score,
        achieved_at,
        players (
          id,
          wallet_address,
          display_name
        )
      `)
      .order('score', { ascending: false })
      .limit(limit);

    // For week filter, only get entries from the last 7 days
    if (timeFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      query = query.gte('achieved_at', weekAgo.toISOString());
    }

    const { data: leaderboardData, error } = await query;

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leaderboard data' },
        { status: 500 }
      );
    }

    // Transform the data to match the expected format
    const formattedData = (leaderboardData || []).map((entry: any, index: number) => ({
      rank: index + 1,
      address: entry.players?.wallet_address || 'Unknown',
      ens: entry.players?.display_name || null,
      score: entry.score,
      questionsAnswered: 15, // Default value since we don't track this yet
      accuracy: Math.floor(Math.random() * 20) + 80, // Mock accuracy for now
      date: new Date(entry.achieved_at).toISOString().split('T')[0],
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      total: formattedData.length,
    });

  } catch (error) {
    console.error('Error in leaderboard API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
