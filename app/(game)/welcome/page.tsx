'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getDisplayName, getStoredNickname } from '@/lib/utils/user';

export default function WelcomePage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [nickname, setNickname] = useState('');

  // Load user's nickname
  useEffect(() => {
    if (address) {
      const storedNickname = getStoredNickname(address);
      setNickname(storedNickname || '');
    }
  }, [address]);

  const handleStartGame = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      router.push('/');
      return;
    }

    setIsStarting(true);
    // Navigate to quiz page
    router.push('/quiz');
  };

  if (!isConnected) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white rounded-2xl p-8 border border-gray-200"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Ready to Become a <span className="rainbow-text">Rainbownaire</span>?
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            Connected as: <span className="font-mono text-black">{getDisplayName(address, nickname)}</span>
          </p>
        </motion.div>

        {/* Game Rules Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-black mb-6">How to Play</h2>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="font-bold text-black mb-1">15 Questions</h3>
                <p className="text-gray-700">Answer progressively harder questions about Rainbow Wallet and Web3</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">⏱️</div>
              <div>
                <h3 className="font-bold text-black mb-1">20 Seconds Each</h3>
                <p className="text-gray-700">You have 20 seconds to answer each question</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="font-bold text-black mb-1">3 Lifelines</h3>
                <p className="text-gray-700">50:50, Ask the Network, and Phone a Friend</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">💯</div>
              <div>
                <h3 className="font-bold text-black mb-1">Earn Points</h3>
                <p className="text-gray-700">Correct: +100pts | Fast bonus: +25pts | Streak: +50pts</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={handleStartGame}
            disabled={isStarting}
            className="btn-rainbow text-xl px-12 py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isStarting ? (
              <div className="flex items-center gap-2">
                <div className="spinner-rainbow w-5 h-5"></div>
                Starting...
              </div>
            ) : (
              '🚀 Start Quiz'
            )}
          </button>

          <button
            onClick={() => router.push('/')}
            className="mt-4 block mx-auto text-gray-600 hover:text-black transition-colors"
          >
            ← Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
