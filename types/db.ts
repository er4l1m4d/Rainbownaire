export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          id: string
          wallet_address: string
          display_name: string | null
          avatar_url: string | null
          joined_at: string
          total_games_played: number
          total_points: number
          last_active: string | null
        }
        Insert: {
          id?: string
          wallet_address: string
          display_name?: string | null
          avatar_url?: string | null
          joined_at?: string
          total_games_played?: number
          total_points?: number
          last_active?: string | null
        }
        Update: {
          id?: string
          wallet_address?: string
          display_name?: string | null
          avatar_url?: string | null
          joined_at?: string
          total_games_played?: number
          total_points?: number
          last_active?: string | null
        }
      }
      questions: {
        Row: {
          id: string
          question_text: string
          answer_options: Json
          correct_answer: string
          difficulty: string
          category: string
          source_type: string
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          question_text: string
          answer_options: Json
          correct_answer: string
          difficulty: string
          category: string
          source_type: string
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          question_text?: string
          answer_options?: Json
          correct_answer?: string
          difficulty?: string
          category?: string
          source_type?: string
          created_by?: string | null
          created_at?: string
        }
      }
      quiz_sessions: {
        Row: {
          id: string
          player_id: string
          current_question_index: number
          score: number
          is_active: boolean
          lifelines_used: Json
          start_time: string
          end_time: string | null
          completed: boolean
          total_time_spent: number | null
        }
        Insert: {
          id?: string
          player_id: string
          current_question_index?: number
          score?: number
          is_active?: boolean
          lifelines_used?: Json
          start_time?: string
          end_time?: string | null
          completed?: boolean
          total_time_spent?: number | null
        }
        Update: {
          id?: string
          player_id?: string
          current_question_index?: number
          score?: number
          is_active?: boolean
          lifelines_used?: Json
          start_time?: string
          end_time?: string | null
          completed?: boolean
          total_time_spent?: number | null
        }
      }
      quiz_session_questions: {
        Row: {
          id: string
          session_id: string
          question_id: string
          selected_answer: string | null
          is_correct: boolean | null
          answered_at: string
        }
        Insert: {
          id?: string
          session_id: string
          question_id: string
          selected_answer?: string | null
          is_correct?: boolean | null
          answered_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          question_id?: string
          selected_answer?: string | null
          is_correct?: boolean | null
          answered_at?: string
        }
      }
      leaderboard_entries: {
        Row: {
          id: string
          player_id: string
          score: number
          session_id: string
          rank: number | null
          achieved_at: string
        }
        Insert: {
          id?: string
          player_id: string
          score: number
          session_id: string
          rank?: number | null
          achieved_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          score?: number
          session_id?: string
          rank?: number | null
          achieved_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}