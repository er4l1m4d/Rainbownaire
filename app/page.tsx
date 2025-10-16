'use client';

import { ConnectButton, useAccountModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDisplayName, getStoredNickname, storeNickname } from '@/lib/utils/user';

export default function HomePage() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const { openAccountModal } = useAccountModal();
  const router = useRouter();

  // Load nickname from localStorage on mount
  useEffect(() => {
    if (address) {
      const storedNickname = getStoredNickname(address);
      if (storedNickname) {
        setNickname(storedNickname);
      }
    }
  }, [address]);
  // Handle wallet connection errors
  useEffect(() => {
    const handleConnectionError = () => {
      setConnectionError('Failed to connect to wallet. Please make sure your wallet is installed and try again.');
      setIsLoading(false);
    };

    // Listen for wallet connection events
    window.addEventListener('wagmi:connect-error', handleConnectionError);

    return () => {
      window.removeEventListener('wagmi:connect-error', handleConnectionError);
    };
  }, []);

  // Clear connection error when successfully connected
  useEffect(() => {
    if (isConnected) {
      setConnectionError(null);
    }
  }, [isConnected]);
  const handleSetNickname = () => {
    if (newNickname.trim() && address) {
      const trimmedNickname = newNickname.trim();
      setNickname(trimmedNickname);
      storeNickname(address, trimmedNickname);
      setShowNicknameModal(false);
      setNewNickname('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" suppressHydrationWarning={true}>
      <div className="max-w-4xl mx-auto text-center" suppressHydrationWarning={true}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
          suppressHydrationWarning={true}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="rainbow-text">Rainbownaire</span>
          </h1>
          <p className="text-xl md:text-2xl text-black mb-8 max-w-2xl mx-auto">
            A Web3 twist on the classic "Who Wants to Be a Millionaire," built for the Rainbow Wallet community.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200"
          suppressHydrationWarning={true}
        >
          <div suppressHydrationWarning={true}>
            {!isConnected ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Connect Your Wallet to Begin
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Test your Web3 knowledge and climb the Rainbow leaderboard! 🌈
                </p>
                <div className="flex justify-center" suppressHydrationWarning={true}>
                  <ConnectButton />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Ready to Become a Rainbownaire? 🌈
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Answer 15 questions about Web3 and Rainbow Wallet culture to earn your place on the leaderboard!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/welcome">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-rainbow px-8 py-4 rounded-xl font-bold shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="spinner-rainbow w-5 h-5"></div>
                          Loading...
                        </div>
                      ) : (
                        'Start Quiz 🎯'
                      )}
                    </motion.button>
                  </Link>

                  <Link href="/leaderboard">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg"
                    >
                      View Leaderboard 🏆
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg"
                  >
                    Disconnect
                  </motion.button>
                </div>

                <div className="mt-8 text-gray-600 text-center">
                  <div className="text-sm flex items-center justify-center gap-2">
                    <span>Connected as:</span>
                    <button
                      onClick={openAccountModal}
                      className="font-mono text-gray-800 hover:text-rainbow-500 transition-colors"
                      title={address}
                    >
                      {getDisplayName(address, nickname)}
                    </button>
                    {!nickname && address && (
                      <button
                        onClick={() => setShowNicknameModal(true)}
                        className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md transition-colors"
                        title="Set nickname"
                      >
                        Set Nickname
                      </button>
                    )}
                    {nickname && (
                      <button
                        onClick={() => setShowNicknameModal(true)}
                        className="text-xs text-gray-500 hover:text-rainbow-500 transition-colors"
                        title="Edit nickname"
                      >
                        ✏️
                      </button>
                    )}
                  </div>
                </div>

                {/* Nickname Modal */}
                <AnimatePresence>
                  {showNicknameModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                      <motion.div
                        className="bg-white rounded-xl p-6 max-w-sm w-full mx-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                      >
                        <h3 className="text-lg font-bold mb-4">Set Your Nickname</h3>
                        <input
                          type="text"
                          value={newNickname}
                          onChange={(e) => setNewNickname(e.target.value)}
                          placeholder="Enter your nickname"
                          className="w-full p-2 border rounded-md mb-4"
                          maxLength={20}
                          onKeyDown={(e) => e.key === 'Enter' && handleSetNickname()}
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setShowNicknameModal(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSetNickname}
                            disabled={!newNickname.trim()}
                            className="px-4 py-2 bg-rainbow-500 text-white rounded-md disabled:opacity-50"
                          >
                            Save
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          suppressHydrationWarning={true}
        >
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200" suppressHydrationWarning={true}>
            <div className="text-4xl mb-4" suppressHydrationWarning={true}>🧠</div>
            <h3 className="text-xl font-bold mb-2 text-black">AI-Powered Questions</h3>
            <p className="text-gray-700">Fresh, randomized questions generated specifically for the Rainbow community.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200" suppressHydrationWarning={true}>
            <div className="text-4xl mb-4" suppressHydrationWarning={true}>🦄</div>
            <h3 className="text-xl font-bold mb-2 text-black">Wallet Login</h3>
            <p className="text-gray-700">Your Rainbow Wallet is your identity. No traditional signups required!</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200" suppressHydrationWarning={true}>
            <div className="text-4xl mb-4" suppressHydrationWarning={true}>🏆</div>
            <h3 className="text-xl font-bold mb-2 text-black">Global Leaderboard</h3>
            <p className="text-gray-700">Compete with the Rainbow community and track your Rainbownaire score!</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-gray-500 text-sm"
          suppressHydrationWarning={true}
        >
          <p>Built with ❤️ for the Rainbow Wallet community</p>
        </motion.div>
      </div>
    </div>
  );
}