'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Mock leaderboard data (will be replaced with Supabase data later)
const mockLeaderboardData = [
  { rank: 1, address: '0x1234...5678', ens: 'rainbow.eth', score: 1450, questionsAnswered: 15, accuracy: 96, date: '2025-01-10' },
  { rank: 2, address: '0x8765...4321', ens: 'web3wizard.eth', score: 1420, questionsAnswered: 15, accuracy: 94, date: '2025-01-10' },
  { rank: 3, address: '0xabcd...efgh', ens: null, score: 1380, questionsAnswered: 15, accuracy: 92, date: '2025-01-09' },
  { rank: 4, address: '0x9876...1234', ens: 'cryptoqueen.eth', score: 1350, questionsAnswered: 15, accuracy: 90, date: '2025-01-09' },
  { rank: 5, address: '0x5678...9012', ens: null, score: 1320, questionsAnswered: 15, accuracy: 88, date: '2025-01-08' },
  { rank: 6, address: '0x3456...7890', ens: 'defi_master.eth', score: 1280, questionsAnswered: 15, accuracy: 85, date: '2025-01-08' },
  { rank: 7, address: '0x2345...6789', ens: null, score: 1250, questionsAnswered: 15, accuracy: 83, date: '2025-01-07' },
  { rank: 8, address: '0x6789...0123', ens: 'nftcollector.eth', score: 1220, questionsAnswered: 15, accuracy: 81, date: '2025-01-07' },
  { rank: 9, address: '0x4567...8901', ens: null, score: 1180, questionsAnswered: 15, accuracy: 78, date: '2025-01-06' },
  { rank: 10, address: '0x7890...2345', ens: 'blockchain_pro.eth', score: 1150, questionsAnswered: 15, accuracy: 76, date: '2025-01-06' },
];

type TimeFilter = 'week' | 'allTime';

export default function LeaderboardPage() {
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');

  // Filter data based on time selection (mock filtering for now)
  const filteredData = mockLeaderboardData.filter(entry => {
    if (timeFilter === 'week') {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    }
    return true; // all time
  });

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Rainbownaire
            </span>
            {' '}Leaderboard
          </h1>
          <p className="text-black text-lg">
            🏆 Top Web3 Quiz Champions
          </p>
        </motion.div>

        {/* Time Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setTimeFilter('week')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              timeFilter === 'week'
                ? 'bg-yellow-400 text-black scale-105'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            📅 This Week
          </button>
          <button
            onClick={() => setTimeFilter('allTime')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              timeFilter === 'allTime'
                ? 'bg-yellow-400 text-black scale-105'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            ♾️ All Time
          </button>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden"
        >
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-4 grid grid-cols-12 gap-4 font-bold text-black border-b-2 border-gray-200">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-2 text-center hidden md:block">Questions</div>
            <div className="col-span-3 text-center">Accuracy</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredData.map((entry, index) => (
              <motion.div
                key={entry.address}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors ${
                  entry.rank <= 3 ? 'bg-yellow-50' : ''
                }`}
              >
                {/* Rank */}
                <div className="col-span-1 text-2xl font-bold">
                  {getMedalEmoji(entry.rank)}
                </div>

                {/* Player */}
                <div className="col-span-4">
                  <div className="font-bold text-black">
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
                  <div className="text-2xl font-bold text-purple-600">
                    {entry.score}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>

                {/* Questions (hidden on mobile) */}
                <div className="col-span-2 text-center hidden md:block">
                  <div className="text-lg font-bold text-black">
                    {entry.questionsAnswered}/15
                  </div>
                </div>

                {/* Accuracy */}
                <div className="col-span-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${entry.accuracy}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-black min-w-[40px]">
                      {entry.accuracy}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
        >
          <button
            onClick={() => router.push('/welcome')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
          >
            🎮 Play Quiz
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-gray-200 text-black rounded-xl font-bold text-lg hover:bg-gray-300 transition-colors"
          >
            🏠 Home
          </button>
        </motion.div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-600 text-sm"
        >
          <p>🌈 Connect your wallet and climb the leaderboard!</p>
          <p className="mt-2">Scores are calculated based on accuracy, speed, and lifeline usage.</p>
        </motion.div>
      </div>
    </div>
  );
}
