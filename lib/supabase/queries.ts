import { createSupabaseClient } from './client';
import { Database } from '@/types/db';
import { Question, Player, QuizSession, LeaderboardEntry } from '@/types/game';
import { SupabaseClient } from '@supabase/supabase-js';

type Tables = Database['public']['Tables'];

// Note: Using any type for Supabase client until database is initialized
// This bypasses TypeScript errors when the database schema hasn't been created yet
export class SupabaseQueries {
  private supabase: any;

  constructor() {
    this.supabase = createSupabaseClient();
  }

  // Player queries
  async getOrCreatePlayer(walletAddress: string): Promise<Player | null> {
    try {
      // First try to get existing player
      const { data: existingPlayer } = await this.supabase
        .from('players')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (existingPlayer) {
        return existingPlayer as Player;
      }

      // Create new player if doesn't exist
      const { data: newPlayer, error } = await this.supabase
        .from('players')
        .insert({
          wallet_address: walletAddress,
          joined_at: new Date().toISOString(),
        } as any)
        .select()
        .single();

      if (error) throw error;
      return newPlayer as Player;
    } catch (error) {
      console.error('Error getting/creating player:', error);
      return null;
    }
  }

  async updatePlayer(playerId: string, updates: Partial<Player>): Promise<boolean> {
    try {
      // @ts-ignore - Supabase typing issue when database not initialized
      const { error } = await this.supabase
        .from('players')
        .update(updates)
        .eq('id', playerId);

      return !error;
    } catch (error) {
      console.error('Error updating player:', error);
      return false;
    }
  }

  // Question queries
  async getRandomQuestions(count: number = 15): Promise<Question[]> {
    try {
      const { data, error } = await this.supabase
        .from('questions')
        .select('*')
        .limit(count * 2); // Get more than needed for randomization

      if (error) throw error;
      
      // Shuffle and return requested count
      const shuffled = (data || []).sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count) as Question[];
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  }

  async createQuestion(question: Omit<Question, 'id' | 'created_at'>): Promise<Question | null> {
    try {
      // @ts-ignore - Supabase typing issue when database not initialized
      const { data, error } = await this.supabase
        .from('questions')
        .insert({
          ...question,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as Question;
    } catch (error) {
      console.error('Error creating question:', error);
      return null;
    }
  }

  // Quiz session queries
  async createQuizSession(playerId: string): Promise<QuizSession | null> {
    try {
      // @ts-ignore - Supabase typing issue when database not initialized
      const { data, error } = await this.supabase
        .from('quiz_sessions')
        .insert({
          player_id: playerId,
          start_time: new Date().toISOString(),
          lifelines_used: {},
        })
        .select()
        .single();

      if (error) throw error;
      return data as QuizSession;
    } catch (error) {
      console.error('Error creating quiz session:', error);
      return null;
    }
  }

  async updateQuizSession(sessionId: string, updates: Partial<QuizSession>): Promise<boolean> {
    try {
      // @ts-ignore - Supabase typing issue when database not initialized
      const { error } = await this.supabase
        .from('quiz_sessions')
        .update(updates)
        .eq('id', sessionId);

      return !error;
    } catch (error) {
      console.error('Error updating quiz session:', error);
      return false;
    }
  }

  async getQuizSession(sessionId: string): Promise<QuizSession | null> {
    try {
      const { data, error } = await this.supabase
        .from('quiz_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;
      return data as QuizSession;
    } catch (error) {
      console.error('Error fetching quiz session:', error);
      return null;
    }
  }

  // Leaderboard queries
  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    try {
      const { data, error } = await this.supabase
        .from('leaderboard_entries')
        .select(`
          *,
          player:players(*)
        `)
        .order('score', { ascending: false })
        .order('achieved_at', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return (data || []) as LeaderboardEntry[];
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  async createLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'achieved_at'>): Promise<boolean> {
    try {
      // @ts-ignore - Supabase typing issue when database not initialized
      const { error } = await this.supabase
        .from('leaderboard_entries')
        .insert({
          ...entry,
          achieved_at: new Date().toISOString(),
        });

      return !error;
    } catch (error) {
      console.error('Error creating leaderboard entry:', error);
      return false;
    }
  }

  // Quiz session questions
  async recordAnswer(
    sessionId: string,
    questionId: string,
    selectedAnswer: string,
    isCorrect: boolean
  ): Promise<boolean> {
    try {
      // @ts-ignore - Supabase typing issue when database not initialized
      const { error } = await this.supabase
        .from('quiz_session_questions')
        .insert({
          session_id: sessionId,
          question_id: questionId,
          selected_answer: selectedAnswer,
          is_correct: isCorrect,
          answered_at: new Date().toISOString(),
        });

      return !error;
    } catch (error) {
      console.error('Error recording answer:', error);
      return false;
    }
  }
}

export const supabaseQueries = new SupabaseQueries();