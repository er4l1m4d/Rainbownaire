// Game related types
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionCategory = 'rainbow_wallet' | 'web3_basics' | 'defi' | 'nfts' | 'security';

export interface Question {
  id: string;
  question_text: string;
  answer_options: string[];
  correct_answer: 'A' | 'B' | 'C' | 'D';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  source_type: 'ai' | 'manual';
  created_at: string;
}

export interface Player {
  id: string;
  wallet_address: string;
  display_name?: string;
  avatar_url?: string;
  joined_at: string;
  total_games_played: number;
  total_points: number;
  last_active?: string;
}

export interface QuizSession {
  id: string;
  player_id: string;
  current_question_index: number;
  score: number;
  is_active: boolean;
  lifelines_used: LifelinesUsed;
  start_time: string;
  end_time?: string;
  completed: boolean;
  total_time_spent?: number;
}

export interface QuizSessionQuestion {
  id: string;
  session_id: string;
  question_id: string;
  selected_answer?: 'A' | 'B' | 'C' | 'D';
  is_correct?: boolean;
  answered_at: string;
}

export interface LeaderboardEntry {
  id: string;
  player_id: string;
  score: number;
  session_id: string;
  rank?: number;
  achieved_at: string;
  player?: Player;
}

export interface LifelinesUsed {
  fiftyFifty?: boolean;
  askNetwork?: boolean;
  phoneFriend?: boolean;
}

export type LifelineType = 'fiftyFifty' | 'askNetwork' | 'phoneFriend';

export interface GameState {
  currentSession?: QuizSession;
  currentQuestion?: Question;
  questions: Question[];
  player?: Player;
  isLoading: boolean;
  error?: string;
}