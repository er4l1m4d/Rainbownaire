# Rainbownaire Database Setup

## Overview
This directory contains SQL files to set up the database tables required for the Rainbownaire quiz application to work properly.

## Files

### `setup_database.sql` (Comprehensive)
- **Full-featured setup** with all tables, indexes, triggers, and RLS policies
- **Advanced features**: Automatic rank calculation, player stats tracking
- **Production-ready**: Includes security policies and performance optimizations
- **Sample data**: Includes test questions for immediate testing

### `setup_database_minimal.sql` (Simple)
- **Essential tables only** for basic leaderboard functionality
- **Quick setup** for testing and development
- **No complex features** - just the core tables needed

## Setup Instructions

### Step 1: Get Supabase Credentials
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon/public key**

### Step 2: Update Environment Variables
Update your `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Run SQL Setup
1. In your Supabase dashboard, go to **SQL Editor**
2. Choose which setup file to use:
   - **For full features**: Copy and paste `setup_database.sql`
   - **For minimal setup**: Copy and paste `setup_database_minimal.sql`
3. Click **Run** to execute the SQL

### Step 4: Verify Setup
After running the SQL, you should see:
- ✅ All tables created successfully
- ✅ Indexes and constraints in place
- ✅ Row Level Security enabled
- ✅ Sample questions inserted (if using comprehensive setup)

## Database Tables Created

### Core Tables:
- **`players`** - User wallet addresses and stats
- **`quiz_sessions`** - Individual quiz attempts
- **`leaderboard_entries`** - High scores and rankings
- **`questions`** - Quiz questions (comprehensive setup only)

### Features:
- **Automatic player creation** when first quiz is completed
- **Score tracking** with timestamps for weekly/all-time filtering
- **Rank calculation** (in comprehensive setup)
- **Security policies** to protect user data

## Testing the Setup

1. **Complete a quiz** in your app
2. **Check the leaderboard** at `/leaderboard`
3. **Verify database** in Supabase dashboard → **Table Editor**

## Troubleshooting

If the leaderboard still doesn't work:
1. **Check environment variables** are set correctly
2. **Verify tables exist** in Supabase dashboard
3. **Check browser console** for API error messages
4. **Test API endpoint** directly: `http://localhost:3000/api/leaderboard`

## Next Steps

After database setup:
1. **Test quiz completion** → Score should appear in database
2. **Check leaderboard page** → Should show rankings
3. **Verify filtering** → Weekly vs All-time leaderboards

The leaderboard should now be fully functional! 🎉
