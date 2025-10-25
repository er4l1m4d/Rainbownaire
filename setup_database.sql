-- ========================================
-- Rainbownaire Database Setup for Supabase
-- ========================================
-- Run these queries in your Supabase SQL Editor
-- Make sure to replace with your actual Supabase project URL and keys in .env.local

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. PLAYERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.players (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    wallet_address TEXT NOT NULL UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    joined_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    total_games_played INTEGER DEFAULT 0 NOT NULL,
    total_points INTEGER DEFAULT 0 NOT NULL,
    last_active TIMESTAMPTZ,

    -- Constraints
    CONSTRAINT players_wallet_address_check CHECK (length(wallet_address) > 0)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS players_wallet_address_idx ON public.players(wallet_address);
CREATE INDEX IF NOT EXISTS players_last_active_idx ON public.players(last_active DESC);
CREATE INDEX IF NOT EXISTS players_total_points_idx ON public.players(total_points DESC);

-- ========================================
-- 2. QUESTIONS TABLE (for admin question management)
-- ========================================
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question_text TEXT NOT NULL,
    answer_options JSONB NOT NULL,
    correct_answer TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    category TEXT NOT NULL,
    source_type TEXT NOT NULL DEFAULT 'manual',
    created_by UUID REFERENCES public.players(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Constraints
    CONSTRAINT questions_answer_options_check CHECK (jsonb_array_length(answer_options) = 4)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS questions_difficulty_idx ON public.questions(difficulty);
CREATE INDEX IF NOT EXISTS questions_category_idx ON public.questions(category);
CREATE INDEX IF NOT EXISTS questions_created_at_idx ON public.questions(created_at DESC);

-- ========================================
-- 3. QUIZ SESSIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    current_question_index INTEGER DEFAULT 0 NOT NULL,
    score INTEGER DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    lifelines_used JSONB DEFAULT '{}' NOT NULL,
    start_time TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    end_time TIMESTAMPTZ,
    completed BOOLEAN DEFAULT false NOT NULL,
    total_time_spent INTEGER, -- in seconds

    -- Constraints
    CONSTRAINT quiz_sessions_score_check CHECK (score >= 0),
    CONSTRAINT quiz_sessions_question_index_check CHECK (current_question_index >= 0 AND current_question_index <= 15)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS quiz_sessions_player_id_idx ON public.quiz_sessions(player_id);
CREATE INDEX IF NOT EXISTS quiz_sessions_is_active_idx ON public.quiz_sessions(is_active);
CREATE INDEX IF NOT EXISTS quiz_sessions_completed_idx ON public.quiz_sessions(completed);
CREATE INDEX IF NOT EXISTS quiz_sessions_start_time_idx ON public.quiz_sessions(start_time DESC);

-- ========================================
-- 4. QUIZ SESSION QUESTIONS TABLE (for detailed tracking)
-- ========================================
CREATE TABLE IF NOT EXISTS public.quiz_session_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    selected_answer TEXT,
    is_correct BOOLEAN,
    answered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS quiz_session_questions_session_id_idx ON public.quiz_session_questions(session_id);
CREATE INDEX IF NOT EXISTS quiz_session_questions_question_id_idx ON public.quiz_session_questions(question_id);
CREATE INDEX IF NOT EXISTS quiz_session_questions_answered_at_idx ON public.quiz_session_questions(answered_at);

-- ========================================
-- 5. LEADERBOARD ENTRIES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.leaderboard_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    session_id UUID NOT NULL REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
    rank INTEGER,
    achieved_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Constraints
    CONSTRAINT leaderboard_entries_score_check CHECK (score >= 0),
    CONSTRAINT leaderboard_entries_unique_player_session UNIQUE (player_id, session_id)
);

-- Create indexes for optimal leaderboard performance
CREATE INDEX IF NOT EXISTS leaderboard_entries_score_idx ON public.leaderboard_entries(score DESC);
CREATE INDEX IF NOT EXISTS leaderboard_entries_achieved_at_idx ON public.leaderboard_entries(achieved_at DESC);
CREATE INDEX IF NOT EXISTS leaderboard_entries_player_id_idx ON public.leaderboard_entries(player_id);
CREATE INDEX IF NOT EXISTS leaderboard_entries_session_id_idx ON public.leaderboard_entries(session_id);

-- Composite index for time-based filtering
CREATE INDEX IF NOT EXISTS leaderboard_entries_score_time_idx ON public.leaderboard_entries(score DESC, achieved_at DESC);

-- ========================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_session_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;

-- Players: Users can only see/modify their own data
CREATE POLICY "Players can view all players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Players can insert their own record" ON public.players FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = wallet_address OR true);
CREATE POLICY "Players can update their own record" ON public.players FOR UPDATE USING (auth.jwt() ->> 'sub' = wallet_address OR true);

-- Questions: Everyone can read, only authenticated users can create
CREATE POLICY "Anyone can view questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create questions" ON public.questions FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Quiz Sessions: Users can only see their own sessions
CREATE POLICY "Users can view their own quiz sessions" ON public.quiz_sessions FOR SELECT USING (
    player_id IN (SELECT id FROM public.players WHERE wallet_address = auth.jwt() ->> 'sub' OR true)
);
CREATE POLICY "Users can manage their own quiz sessions" ON public.quiz_sessions FOR ALL USING (
    player_id IN (SELECT id FROM public.players WHERE wallet_address = auth.jwt() ->> 'sub' OR true)
);

-- Quiz Session Questions: Users can only see their own session questions
CREATE POLICY "Users can view their own session questions" ON public.quiz_session_questions FOR SELECT USING (
    session_id IN (
        SELECT qs.id FROM public.quiz_sessions qs
        JOIN public.players p ON qs.player_id = p.id
        WHERE p.wallet_address = auth.jwt() ->> 'sub' OR true
    )
);
CREATE POLICY "Users can manage their own session questions" ON public.quiz_session_questions FOR ALL USING (
    session_id IN (
        SELECT qs.id FROM public.quiz_sessions qs
        JOIN public.players p ON qs.player_id = p.id
        WHERE p.wallet_address = auth.jwt() ->> 'sub' OR true
    )
);

-- Leaderboard Entries: Everyone can view, users can only create their own
CREATE POLICY "Anyone can view leaderboard entries" ON public.leaderboard_entries FOR SELECT USING (true);
CREATE POLICY "Users can create their own leaderboard entries" ON public.leaderboard_entries FOR INSERT WITH CHECK (
    player_id IN (SELECT id FROM public.players WHERE wallet_address = auth.jwt() ->> 'sub' OR true)
);

-- ========================================
-- 7. FUNCTIONS AND TRIGGERS
-- ========================================

-- Function to automatically update player stats when leaderboard entry is created
CREATE OR REPLACE FUNCTION update_player_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the player's total games and points
    UPDATE public.players
    SET
        total_games_played = total_games_played + 1,
        total_points = total_points + NEW.score,
        last_active = NOW()
    WHERE id = NEW.player_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update player stats
CREATE TRIGGER trigger_update_player_stats
    AFTER INSERT ON public.leaderboard_entries
    FOR EACH ROW
    EXECUTE FUNCTION update_player_stats();

-- Function to calculate rank for leaderboard entries
CREATE OR REPLACE FUNCTION calculate_leaderboard_ranks()
RETURNS TRIGGER AS $$
BEGIN
    -- Update ranks for all entries (simple approach - in production you might want more efficient ranking)
    WITH ranked_entries AS (
        SELECT id,
               ROW_NUMBER() OVER (ORDER BY score DESC, achieved_at ASC) as new_rank
        FROM public.leaderboard_entries
        WHERE achieved_at >= (NOW() - INTERVAL '7 days') -- Only rank recent entries for performance
    )
    UPDATE public.leaderboard_entries
    SET rank = ranked_entries.new_rank
    FROM ranked_entries
    WHERE public.leaderboard_entries.id = ranked_entries.id;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically calculate ranks
CREATE TRIGGER trigger_calculate_ranks
    AFTER INSERT OR UPDATE OF score ON public.leaderboard_entries
    FOR EACH ROW
    EXECUTE FUNCTION calculate_leaderboard_ranks();

-- ========================================
-- 8. SAMPLE DATA (Optional - for testing)
-- ========================================

-- Insert some sample questions for testing
INSERT INTO public.questions (question_text, answer_options, correct_answer, difficulty, category, source_type) VALUES
('What is the maximum total supply of ETH?', '["21 million", "18 million", "Infinite", "100 million"]', 'C', 'easy', 'web3_basics', 'manual'),
('Which blockchain is known as the "world computer"?', '["Bitcoin", "Ethereum", "Solana", "Polygon"]', 'B', 'medium', 'blockchain', 'manual'),
('What does NFT stand for?', '["Non-Fungible Token", "New Financial Technology", "Network File Transfer", "Non-Financial Transaction"]', 'A', 'easy', 'nft', 'manual'),
('What is the native cryptocurrency of the Rainbow Wallet ecosystem?', '["RAIN", "ETH", "BTC", "USDC"]', 'A', 'medium', 'rainbow_wallet', 'manual'),
('Which consensus mechanism does Ethereum use?', '["Proof of Work", "Proof of Stake", "Both A and B", "Delegated Proof of Stake"]', 'C', 'hard', 'blockchain', 'manual')
ON CONFLICT DO NOTHING;

-- ========================================
-- 9. GRANTS AND PERMISSIONS
-- ========================================

-- Grant necessary permissions (adjust as needed for your setup)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ========================================
-- SUCCESS MESSAGE
-- ========================================
-- If you see this message, the tables have been created successfully!
-- Don't forget to update your .env.local file with your Supabase credentials:
--
-- NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
-- NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
--
-- You can find these in your Supabase project settings.
