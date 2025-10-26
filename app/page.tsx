'use client';

import { ConnectButton, useAccountModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDisplayName, getStoredNickname, storeNickname } from '@/lib/utils/user';
import { PFPManager } from '@/components/ui/PFPManager';
import { usePFP } from '@/hooks/usePFP';

const HomePage = memo(function HomePage() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const { openAccountModal } = useAccountModal();
  const router = useRouter();

  // PFP management
  const { pfpData, updatePFP } = usePFP();

  // Memoized nickname loading to prevent unnecessary re-renders
  const loadNickname = useCallback((walletAddress: string) => {
    const storedNickname = getStoredNickname(walletAddress);
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  // Load nickname from localStorage on mount - optimized
  useEffect(() => {
    if (address) {
      loadNickname(address);
    }
  }, [address, loadNickname]);

  // Handle wallet connection errors - optimized
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

  // Memoized nickname handler to prevent unnecessary re-renders
  const handleSetNickname = useCallback(async () => {
    if (newNickname.trim() && address) {
      const trimmedNickname = newNickname.trim();
      setNickname(trimmedNickname);
      storeNickname(address, trimmedNickname);

      // Update nickname in database asynchronously (don't block UI)
      try {
        await fetch('/api/leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            playerAddress: address,
            score: 0,
            correctAnswers: 0,
            totalQuestions: 0,
            displayName: trimmedNickname,
            updateOnly: true,
          }),
        });
      } catch (error) {
        console.error('Failed to update nickname in database:', error);
        // Don't show error to user - localStorage is primary storage
      }

      setShowNicknameModal(false);
      setNewNickname('');
    }
  }, [newNickname, address]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" suppressHydrationWarning={true}>
      <div className="max-w-4xl mx-auto text-center" suppressHydrationWarning={true}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8 md:mb-12 bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200"
          suppressHydrationWarning={true}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-3 sm:mb-4 md:mb-6">
            <span className="rainbow-text">Rainbownaire</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-black mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2 sm:px-0">
            A Web3 twist on the classic "Who Wants to Be a Millionaire," built for the Rainbow Wallet community.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-gray-200"
          suppressHydrationWarning={true}
        >
          <div suppressHydrationWarning={true}>
            {!isConnected ? (
              <>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 md:mb-6">
                  Connect Your Wallet to Begin
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8">
                  Test your Web3 knowledge and climb the Rainbow leaderboard! 🌈
                </p>
                <div className="flex justify-center" suppressHydrationWarning={true}>
                  <ConnectButton />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 md:mb-6">
                  Ready to Become a Rainbownaire? 🌈
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8">
                  Answer 15 questions about Web3 and Rainbow Wallet culture to earn your place on the leaderboard!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <Link href="/welcome">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg transition-all duration-200 w-full sm:w-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="spinner-rainbow w-4 h-4"></div>
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
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-200 shadow-lg text-sm sm:text-base w-full sm:w-auto"
                    >
                      View Leaderboard 🏆
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => disconnect()}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-200 shadow-lg text-sm sm:text-base w-full sm:w-auto"
                  >
                    Disconnect
                  </motion.button>
                </div>

                <div className="mt-4 sm:mt-6 md:mt-8 text-gray-600 text-center">
                  <div className="text-xs sm:text-sm flex items-center justify-center gap-2 flex-wrap">
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

                  {/* PFP Manager */}
                  <div className="mt-3 sm:mt-4 md:mt-6 flex justify-center">
                    <PFPManager
                      currentPFP={pfpData}
                      onPFPChange={updatePFP}
                      size="sm"
                      showRemove={true}
                    />
                  </div>
                </div>

                {/* Nickname Modal */}
                <AnimatePresence>
                  {showNicknameModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                      <motion.div
                        className="bg-white rounded-xl p-4 sm:p-6 max-w-sm w-full mx-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                      >
                        <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Set Your Nickname</h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                          Choose a nickname to display on the leaderboard
                        </p>
                        <input
                          type="text"
                          value={newNickname}
                          onChange={(e) => setNewNickname(e.target.value)}
                          placeholder="Enter your nickname"
                          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          maxLength={20}
                          onKeyDown={(e) => e.key === 'Enter' && handleSetNickname()}
                          autoFocus
                        />
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setShowNicknameModal(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSetNickname}
                            disabled={!newNickname.trim()}
                            className="px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-500 disabled:hover:via-pink-500 disabled:hover:to-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                          >
                            Save Nickname
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
          className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          suppressHydrationWarning={true}
        >
          <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200" suppressHydrationWarning={true}>
            <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4" suppressHydrationWarning={true}>🧠</div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-black">AI-Powered Questions</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-700">Fresh, randomized questions generated specifically for the Rainbow community.</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200" suppressHydrationWarning={true}>
            <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4" suppressHydrationWarning={true}>🦄</div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-black">Wallet Login</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-700">Your Rainbow Wallet is your identity. No traditional signups required!</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200" suppressHydrationWarning={true}>
            <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4" suppressHydrationWarning={true}>🏆</div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-black">Global Leaderboard</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-700">Compete with the Rainbow community and track your Rainbownaire score!</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 sm:mt-12 md:mt-16 text-gray-500 text-xs sm:text-sm"
          suppressHydrationWarning={true}
        >
          <p>
            Made with ❤️ by{' '}
            <a
              href="https://x.com/jigz_crypto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 underline font-medium"
            >
              Jigz
            </a>
            {' '} & {' '}
            <a
              href="https://x.com/davee0x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 underline font-medium"
            >
              Dave
            </a>
            {' '}for the Rainbow Community
          </p>
        </motion.div>
      </div>
    </div>
  );
});

export default HomePage;