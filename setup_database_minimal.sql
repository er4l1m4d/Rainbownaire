-- ========================================
-- Rainbownaire Database Setup - ESSENTIAL TABLES ONLY
-- ========================================
-- Simple version - just the core tables needed for leaderboard functionality

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- PLAYERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.players (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    wallet_address TEXT NOT NULL UNIQUE,
    display_name TEXT,
    joined_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    total_games_played INTEGER DEFAULT 0 NOT NULL,
    total_points INTEGER DEFAULT 0 NOT NULL,
    last_active TIMESTAMPTZ
);

-- ========================================
-- QUIZ SESSIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0 NOT NULL,
    start_time TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    end_time TIMESTAMPTZ,
    completed BOOLEAN DEFAULT false NOT NULL,
    total_time_spent INTEGER
);

-- ========================================
-- LEADERBOARD ENTRIES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.leaderboard_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    session_id UUID NOT NULL REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
    achieved_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ========================================
-- BASIC INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS players_wallet_address_idx ON public.players(wallet_address);
CREATE INDEX IF NOT EXISTS quiz_sessions_player_id_idx ON public.quiz_sessions(player_id);
CREATE INDEX IF NOT EXISTS leaderboard_entries_score_idx ON public.leaderboard_entries(score DESC);
CREATE INDEX IF NOT EXISTS leaderboard_entries_achieved_at_idx ON public.leaderboard_entries(achieved_at DESC);

-- ========================================
-- ROW LEVEL SECURITY
-- ========================================
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (allow all for now - adjust as needed)
CREATE POLICY "Allow all operations on players" ON public.players FOR ALL USING (true);
CREATE POLICY "Allow all operations on quiz_sessions" ON public.quiz_sessions FOR ALL USING (true);
CREATE POLICY "Allow all operations on leaderboard_entries" ON public.leaderboard_entries FOR ALL USING (true);

-- ========================================
-- SAMPLE DATA
-- ========================================
INSERT INTO public.questions (question_text, answer_options, correct_answer, difficulty, category, source_type) VALUES
('What is Web3?', '["The next version of the internet", "Centralized computing", "Traditional banking", "Social media"]', 'A', 'easy', 'web3_basics', 'manual'),
('What does NFT stand for?', '["Non-Fungible Token", "Network File Transfer", "New Financial Technology", "National Finance Token"]', 'A', 'easy', 'nft', 'manual'),
('Which wallet is Rainbow?', '["A Web3 wallet", "A traditional bank", "A social platform", "An exchange"]', 'A', 'easy', 'rainbow_wallet', 'manual')
ON CONFLICT DO NOTHING;
