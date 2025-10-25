import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeFilter = searchParams.get('timeFilter') || 'allTime';
    const limit = parseInt(searchParams.get('limit') || '50');

    // Check if Supabase environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = await createSupabaseServerClient();

    // Test the connection by checking if we can access the leaderboard_entries table
    const { data: testData, error: testError } = await supabase
      .from('leaderboard_entries')
      .select('id')
      .limit(1);

    if (testError) {
      console.error('Database connection test failed:', testError);
      return NextResponse.json(
        { error: `Database connection failed: ${testError.message}` },
        { status: 500 }
      );
    }

    // Build the query based on time filter
    let query = supabase
      .from('leaderboard_entries')
      .select(`
        id,
        player_id,
        score,
        achieved_at,
        session_id,
        players (
          id,
          wallet_address,
          display_name
        ),
        quiz_sessions (
          total_time_spent,
          end_time
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
        { error: `Failed to fetch leaderboard data: ${error.message}` },
        { status: 500 }
      );
    }

    // Transform the data to match the expected format
    const formattedData = (leaderboardData || []).map((entry: any, index: number) => {
      // Calculate accuracy from the session data if available
      let accuracy = 85; // Default fallback
      if (entry.quiz_sessions) {
        const session = Array.isArray(entry.quiz_sessions) ? entry.quiz_sessions[0] : entry.quiz_sessions;
        if (session && session.total_time_spent) {
          // Estimate accuracy based on score and time spent
          const timeEfficiency = Math.max(0, Math.min(1, session.total_time_spent / (15 * 60))); // 15 questions * 60 seconds max
          accuracy = Math.floor(70 + (entry.score / 1500) * 30 * (1 - timeEfficiency)); // Score-based with time penalty
        }
      }

      return {
        rank: index + 1,
        address: entry.players?.wallet_address || 'Unknown',
        ens: entry.players?.display_name || null,
        score: entry.score,
        questionsAnswered: 15, // Default value since we don't track individual question answers yet
        accuracy: Math.max(0, Math.min(100, accuracy)),
        date: new Date(entry.achieved_at).toISOString().split('T')[0],
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedData,
      total: formattedData.length,
    });

  } catch (error) {
    console.error('Error in leaderboard API:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerAddress, score, correctAnswers, totalQuestions, displayName, updateOnly } = body;

    if (!playerAddress) {
      return NextResponse.json(
        { error: 'Player address is required' },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    // If this is just a nickname update (not a score submission)
    if (updateOnly && displayName) {
      // First, ensure the player exists in the database
      let { data: player, error: playerError } = await supabase
        .from('players')
        .select('id')
        .eq('wallet_address', playerAddress)
        .single();

      if (playerError && playerError.code !== 'PGRST116') {
        console.error('Error checking for player:', playerError);
        return NextResponse.json(
          { error: 'Failed to verify player' },
          { status: 500 }
        );
      }

      // If player doesn't exist, create them (without updating stats)
      if (!player) {
        const { data: newPlayer, error: createPlayerError } = await supabase
          .from('players')
          .insert({
            wallet_address: playerAddress,
            display_name: displayName.trim(),
            total_games_played: 0,
            total_points: 0,
            joined_at: new Date().toISOString(),
            last_active: new Date().toISOString(),
          })
          .select('id')
          .single();

        if (createPlayerError) {
          console.error('Error creating player:', createPlayerError);
          return NextResponse.json(
            { error: 'Failed to create player record' },
            { status: 500 }
          );
        }

        player = newPlayer;
      } else {
        // Update player's display name and last active time
        const { error: updatePlayerError } = await supabase
          .from('players')
          .update({
            display_name: displayName.trim(),
            last_active: new Date().toISOString(),
          })
          .eq('id', player.id);

        if (updatePlayerError) {
          console.error('Error updating player:', updatePlayerError);
          return NextResponse.json(
            { error: 'Failed to update player record' },
            { status: 500 }
          );
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          playerId: player.id,
          displayName: displayName.trim(),
        },
      });
    }

    // Regular score submission flow
    if (!score) {
      return NextResponse.json(
        { error: 'Score is required for leaderboard submission' },
        { status: 400 }
      );
    }

    // First, ensure the player exists in the database
    let { data: player, error: playerError } = await supabase
      .from('players')
      .select('id')
      .eq('wallet_address', playerAddress)
      .single();

    if (playerError && playerError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking for player:', playerError);
      return NextResponse.json(
        { error: 'Failed to verify player' },
        { status: 500 }
      );
    }

    // If player doesn't exist, create them
    if (!player) {
      const { data: newPlayer, error: createPlayerError } = await supabase
        .from('players')
        .insert({
          wallet_address: playerAddress,
          display_name: displayName || null,
          total_games_played: 1,
          total_points: score,
          joined_at: new Date().toISOString(),
          last_active: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (createPlayerError) {
        console.error('Error creating player:', createPlayerError);
        return NextResponse.json(
          { error: 'Failed to create player record' },
          { status: 500 }
        );
      }

      player = newPlayer;
    } else {
      // Update player's total games and points, and display name if provided
      const updateData: any = {
        total_games_played: (player.total_games_played || 0) + 1,
        total_points: (player.total_points || 0) + score,
        last_active: new Date().toISOString(),
      };

      // Only update display_name if a new one is provided
      if (displayName && displayName.trim()) {
        updateData.display_name = displayName.trim();
      }

      const { error: updatePlayerError } = await supabase
        .from('players')
        .update(updateData)
        .eq('id', player.id);

      if (updatePlayerError) {
        console.error('Error updating player:', updatePlayerError);
        return NextResponse.json(
          { error: 'Failed to update player record' },
          { status: 500 }
        );
      }
    }

    // Create a quiz session to track this game
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .insert({
        player_id: player.id,
        score: score,
        is_active: false,
        completed: true,
        start_time: new Date(Date.now() - (totalQuestions * 30000)).toISOString(), // Rough estimate: 30s per question
        end_time: new Date().toISOString(),
        total_time_spent: totalQuestions * 30, // Rough estimate in seconds
      })
      .select('id')
      .single();

    if (sessionError) {
      console.error('Error creating session:', sessionError);
      return NextResponse.json(
        { error: 'Failed to create quiz session' },
        { status: 500 }
      );
    }

    // Create leaderboard entry
    const { data: leaderboardEntry, error: leaderboardError } = await supabase
      .from('leaderboard_entries')
      .insert({
        player_id: player.id,
        score: score,
        session_id: session.id,
        achieved_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (leaderboardError) {
      console.error('Error creating leaderboard entry:', leaderboardError);
      return NextResponse.json(
        { error: 'Failed to save leaderboard entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        entryId: leaderboardEntry.id,
        playerId: player.id,
        score: score,
      },
    });

  } catch (error) {
    console.error('Error in leaderboard submission API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
