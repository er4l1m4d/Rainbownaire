'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Types for leaderboard data
interface LeaderboardEntry {
  rank: number;
  address: string;
  ens: string | null;
  score: number;
  questionsAnswered: number;
  accuracy: number;
  date: string;
}

type TimeFilter = 'week' | 'allTime';

export default function LeaderboardPage() {
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch leaderboard data
  const fetchLeaderboardData = async (filter: TimeFilter) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/leaderboard?timeFilter=${filter}&limit=50`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setLeaderboardData(result.data);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      let errorMessage = 'Failed to load leaderboard';

      if (err instanceof Error) {
        if (err.message.includes('Database configuration missing')) {
          errorMessage = 'Database not configured. Please check environment variables.';
        } else if (err.message.includes('Database connection failed')) {
          errorMessage = 'Cannot connect to database. Please check your Supabase configuration.';
        } else if (err.message.includes('Players table not accessible')) {
          errorMessage = 'Database tables not set up. Please run the database setup script.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'No scores submitted yet. Be the first to play!';
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or filter changes
  useEffect(() => {
    fetchLeaderboardData(timeFilter);
  }, [timeFilter]);

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-10 md:py-12 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 md:mb-8 bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-center">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent">
              Rainbownaire
            </span>
            {' '}Leaderboard
          </h1>
          <p className="text-black text-sm sm:text-base md:text-lg text-center">
            🏆 Top Web3 Quiz Champions
          </p>
        </motion.div>

        {/* Time Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8"
        >
          <button
            onClick={() => setTimeFilter('week')}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${timeFilter === 'week'
                ? 'bg-yellow-400 text-black scale-105'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            📅 This Week
          </button>
          <button
            onClick={() => setTimeFilter('allTime')}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${timeFilter === 'allTime'
                ? 'bg-yellow-400 text-black scale-105'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            ♾️ All Time
          </button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center gap-3 text-lg text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              Loading leaderboard...
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-red-600 text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Leaderboard</h3>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <div className="text-xs text-gray-500 mb-4">
                {error.includes('Database not configured') && (
                  <div className="text-left">
                    <p className="font-medium mb-2">To fix this:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to your Vercel dashboard</li>
                      <li>Navigate to Project Settings → Environment Variables</li>
                      <li>Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                      <li>Redeploy your project</li>
                    </ol>
                  </div>
                )}
                {error.includes('Database tables not set up') && (
                  <div className="text-left">
                    <p className="font-medium mb-2">To fix this:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to your Supabase dashboard</li>
                      <li>Navigate to SQL Editor</li>
                      <li>Copy the SQL from setup_database_minimal.sql</li>
                      <li>Run the SQL to create the required tables</li>
                    </ol>
                  </div>
                )}
                {error.includes('No scores submitted yet') && (
                  <div className="text-left">
                    <p className="font-medium mb-2">To get started:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Complete a full quiz (15 questions)</li>
                      <li>Your score will be automatically submitted</li>
                      <li>Check back here to see your ranking!</li>
                    </ol>
                  </div>
                )}
              <div className="text-xs text-gray-500 mb-4">
                {error.includes('Database not configured') && (
                  <div className="text-left">
                    <p className="font-medium mb-2">To fix this:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to your Vercel dashboard</li>
                      <li>Navigate to Project Settings → Environment Variables</li>
                      <li>Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                      <li>Redeploy your project</li>
                    </ol>
                  </div>
                )}
                {error.includes('Database tables not set up') && (
                  <div className="text-left">
                    <p className="font-medium mb-2">To fix this:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to your Supabase dashboard</li>
                      <li>Navigate to SQL Editor</li>
                      <li>Copy the SQL from setup_database_minimal.sql</li>
                      <li>Run the SQL to create the required tables</li>
                    </ol>
                  </div>
                )}
                {error.includes('No scores submitted yet') && (
                  <div className="text-left">
                    <p className="font-medium mb-2">To get started:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Complete a full quiz (15 questions)</li>
                      <li>Your score will be automatically submitted</li>
                      <li>Check back here to see your ranking!</li>
                    </ol>
                  </div>
                )}
                {error.includes('Cannot connect to database') && (
                  <div className="text-left">
                    <p className="font-medium mb-2">To fix this:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Verify your Supabase credentials are correct</li>
                      <li>Check that your Supabase project is active</li>
                      <li>Ensure the API keys have the right permissions</li>
                      <li>Try redeploying your project</li>
                    </ol>
                  </div>
                )}
                {!error.includes('No scores submitted yet') && (
                  <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                    <p className="font-medium mb-1">🔧 Debug:</p>
                    <a
                      href="/api/health"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Check database health →
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => fetchLeaderboardData(timeFilter)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Leaderboard Table */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden"
          >
            {leaderboardData.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">🏆</div>
                <p className="text-lg font-medium mb-2">No leaderboard data available yet.</p>
                <p className="text-sm mb-6">Be the first to set a high score!</p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto text-left">
                  <h4 className="font-medium text-blue-800 mb-2">How to get on the leaderboard:</h4>
                  <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
                    <li>Complete a full quiz (15 questions)</li>
                    <li>Your score will be automatically submitted</li>
                    <li>Check back here to see your ranking!</li>
                  </ol>
                </div>
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-3 sm:px-4 md:px-6 py-3 sm:py-4 grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 font-bold text-black border-b-2 border-gray-200 text-sm sm:text-base">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-4">Player</div>
                  <div className="col-span-2 text-center">Score</div>
                  <div className="col-span-2 text-center hidden md:block">Questions</div>
                  <div className="col-span-3 text-center">Accuracy</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {leaderboardData.map((entry, index) => (
                    <motion.div
                      key={entry.address}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 items-center hover:bg-gray-50 transition-colors ${
                        entry.rank <= 3 ? 'bg-yellow-50' : ''
                      }`}
                    >
                      {/* Rank */}
                      <div className="col-span-1 text-lg sm:text-xl md:text-2xl font-bold">
                        {getMedalEmoji(entry.rank)}
                      </div>

                      {/* Player */}
                      <div className="col-span-4">
                        <div className="font-bold text-black text-sm sm:text-base">
                          {entry.ens || `${entry.address.slice(0, 6)}...${entry.address.slice(-4)}`}
                        </div>
                        {entry.ens && (
                          <div className="text-xs text-gray-500">
                            {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                          </div>
                        )}
                      </div>

                      {/* Score */}
                      <div className="col-span-2 text-center">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">
                          {entry.score}
                        </div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>

                      {/* Questions (hidden on mobile) */}
                      <div className="col-span-2 text-center hidden md:block">
                        <div className="text-base sm:text-lg font-bold text-black">
                          {entry.questionsAnswered}/15
                        </div>
                      </div>

                      {/* Accuracy */}
                      <div className="col-span-3 text-center">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 max-w-[80px] sm:max-w-[100px]">
                            <div
                              className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all"
                              style={{ width: `${entry.accuracy}%` }}
                            />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-black min-w-[30px] sm:min-w-[40px]">
                            {entry.accuracy}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 justify-center"
        >
          <button
            onClick={() => router.push('/welcome')}
            className="px-6 sm:px-7 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-lg w-full sm:w-auto"
          >
            🎮 Play Quiz
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 sm:px-7 md:px-8 py-3 sm:py-4 bg-gray-200 text-black rounded-xl font-bold text-base sm:text-lg hover:bg-gray-300 transition-colors w-full sm:w-auto"
          >
            🏠 Home
          </button>
        </motion.div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4 sm:mt-6 md:mt-8 text-gray-600 text-xs sm:text-sm"
        >
          <p>🌈 Connect your wallet and climb the leaderboard!</p>
          <p className="mt-1 sm:mt-2">Scores are calculated based on accuracy, speed, and lifeline usage.</p>
        </motion.div>
      </div>
    </div>
  );
}
