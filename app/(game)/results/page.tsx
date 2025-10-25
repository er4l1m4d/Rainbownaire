'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { getDisplayName, getStoredNickname } from '@/lib/utils/user';
import { sampleQuestions } from '@/lib/data/sampleQuestions';
import html2canvas from 'html2canvas';
import Image from 'next/image';

// Helper function to determine score rank
const getScoreRank = (score: number): string => {
  const maxScore = sampleQuestions.length * 100;

  if (score >= maxScore * 0.9) return '🌟 Perfect Score!';
  if (score >= maxScore * 0.8) return '🏆 Quiz Master!';
  if (score >= maxScore * 0.7) return '⭐ Excellent!';
  if (score >= maxScore * 0.6) return '🎯 Great Job!';
  if (score >= maxScore * 0.5) return '👍 Good Work!';
  if (score >= maxScore * 0.3) return '📚 Keep Learning!';
  return '🌱 Getting Started!';
};

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isConnected, address } = useAccount();

  // PFP management - using local state instead of hook
  const [pfpData, setPfpData] = useState<string | null>(null);

  const score = parseInt(searchParams.get('score') || '0');
  const correctAnswers = parseInt(searchParams.get('correct') || '0');
  const totalQuestions = sampleQuestions.length; // This will be 15 for the random selection
  const maxPossibleScore = totalQuestions * 100; // Base score only
  const percentage = Math.round((score / maxPossibleScore) * 100);
  const accuracyPercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const rank = getScoreRank(score);

  // No Rainbow bonus calculation needed
  const rainbowBonus = 0;

  // Tweet text for social sharing
  const tweetText = `I just scored ${score} points in Rainbownaire quiz! 🌈 ${rank} Can you beat my score?`;

  const [isDappBrowser, setIsDappBrowser] = useState(false);
  const [browserType, setBrowserType] = useState<string>('');
  const [scorecardImageUrl, setScorecardImageUrl] = useState<string>('');
  const [showScorecardPreview, setShowScorecardPreview] = useState(false);
  const [isGeneratingScorecard, setIsGeneratingScorecard] = useState(false);
  const [nickname, setNickname] = useState<string>('');
  const [pfpData, setPfpData] = useState<string | null>(null);

  // Load user's nickname
  useEffect(() => {
    if (address) {
      const storedNickname = getStoredNickname(address);
      setNickname(storedNickname || '');
    }
  }, [address]);

  const handleShare = async () => {
    if (typeof window === 'undefined') return;

    const shareUrl = `${window.location.origin}/results?score=${score}`;
    const shareText = `I just scored ${score} points in Rainbownaire quiz! 🌈 ${rank} Can you beat my score?`;

    try {
      // Try Web Share API first (mobile browsers)
      if (navigator.share) {
        await navigator.share({
          title: 'My Rainbownaire Score!',
          text: shareText,
          url: shareUrl,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard! 📋');
      }
    } catch (err) {
      console.error('Failed to share:', err);
      // Final fallback: copy link
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard! 📋');
      } catch (clipboardErr) {
        alert('Failed to share. Please copy the URL manually! 📋');
      }
    }
  };

  const handleCopyLink = async () => {
    if (typeof window === 'undefined') return;

    const shareUrl = `${window.location.origin}/results?score=${score}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard! 📋');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy link. Please try again! 📋');
    }
  };

  const copyImageToClipboard = async () => {
    if (!scorecardImageUrl || typeof window === 'undefined' || typeof navigator === 'undefined') return;

    try {
      // For dApp browsers, provide alternative instructions
      if (isDappBrowser) {
        // Try basic clipboard first
        await navigator.clipboard.writeText(scorecardImageUrl);
        alert(`Image data copied! In ${browserType}, try: 1) Long-press the image 2) Select "Share" or "Save Image" 📱`);
        return;
      }

      // Fetch the image and convert to blob
      const response = await fetch(scorecardImageUrl);
      const blob = await response.blob();

      // Try modern ClipboardItem API first
      if (navigator.clipboard && window.ClipboardItem) {
        try {
          const clipboardItem = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([clipboardItem]);
          alert('Image copied to clipboard! You can now paste it anywhere. 🖼️');
          return;
        } catch (clipboardError) {
          console.warn('ClipboardItem failed, falling back to text:', clipboardError);
        }
      }

      // Fallback: copy the data URL as text (user can paste into image editors)
      await navigator.clipboard.writeText(scorecardImageUrl);
      alert('Image data copied! You can paste this into image editing apps. 🖼️');

    } catch (err) {
      console.error('Failed to copy image:', err);
      // Final fallback: copy share link
      handleCopyLink();
      alert('Copy not supported. Link copied instead! 📋');
    }
  };

  const handleTwitterShare = () => {
    if (typeof window === 'undefined') return;

    const shareUrl = `${window.location.origin}/results?score=${score}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const generateScorecard = async () => {
    if (isGeneratingScorecard || typeof window === 'undefined' || typeof document === 'undefined') return;

    try {
      setIsGeneratingScorecard(true);

      // Use the much simpler and more reliable approach
      const element = document.getElementById('scorecard-preview');
      if (!element) {
        throw new Error('Scorecard preview element not found');
      }

      // Enhanced html2canvas options for better dApp browser compatibility
      const canvasOptions = {
        background: '#ffffff',
        useCORS: true,
        allowTaint: true, // Allow cross-origin images
        logging: false,
        width: 800,
        height: element.scrollHeight,
        scale: 2, // Higher resolution for better quality
        // Remove animations for screenshot
        ignoreElements: (element: Element) => {
          return element.classList.contains('spinner-rainbow') ||
                 element.tagName === 'BUTTON' ||
                 element.getAttribute('data-html2canvas-ignore') === 'true';
        }
      };

      // For dApp browsers, use simplified options
      const finalOptions = isDappBrowser ? {
        ...canvasOptions,
        allowTaint: true,
        useCORS: false, // Disable CORS for dApp browsers
        scale: 1, // Lower scale for better performance
      } : canvasOptions;

      const canvas = await html2canvas(element, finalOptions);
      const imageUrl = canvas.toDataURL('image/png');
      setScorecardImageUrl(imageUrl);
      setShowScorecardPreview(true);

    } catch (error) {
      console.error('Error generating scorecard:', error);

      // Provide specific error messages for dApp browsers
      let errorMessage = 'Failed to generate scorecard';
      if (isDappBrowser) {
        errorMessage = `${browserType} browser has limited image generation support. Try using Chrome or Safari instead.`;
      } else {
        errorMessage = error instanceof Error ? error.message : 'Unknown error';
      }

      alert(`${errorMessage}. Please try sharing the link instead! 📋`);
    } finally {
      setIsGeneratingScorecard(false);
    }
  };

  const downloadScorecard = () => {
    if (!scorecardImageUrl || typeof window === 'undefined' || typeof document === 'undefined') {
      // Fallback to copying share URL
      handleCopyLink();
      alert('PNG not ready yet. Share link copied instead! 📋');
      return;
    }

    try {
      // For dApp browsers, use alternative download methods
      if (isDappBrowser) {
        // Try to open image in new tab first
        const newWindow = window.open(scorecardImageUrl, '_blank');
        if (newWindow) {
          alert(`Image opened in new tab! ${isDappBrowser ? 'Long-press to save or share the image.' : 'Right-click to save.'}`);
          return;
        }
      }

      // Standard download for regular browsers
      const displayName = getDisplayName(address, nickname) || 'Quiz Player';
      const link = document.createElement('a');
      link.download = `rainbownaire-scorecard-${displayName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = scorecardImageUrl;
      link.target = '_blank'; // Open in new tab as fallback
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to copying the image URL
      handleCopyLink();
      alert('Download not supported in this browser. Link copied instead! 📋');
    }
  };

  const handleWebShare = async () => {
    if (typeof window === 'undefined' || !navigator.share) {
      // Fallback to copying link
      handleCopyLink();
      return;
    }

    try {
      const shareUrl = `${window.location.origin}/results?score=${score}`;
      await navigator.share({
        title: 'My Rainbownaire Score!',
        text: tweetText,
        url: shareUrl,
      });
    } catch (error) {
      console.error('Web Share failed:', error);
      handleCopyLink();
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8" suppressHydrationWarning={true}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
        suppressHydrationWarning={true}
      >
        {/* Score Card */}
        <motion.div
          className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Congratulations Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
              <span className="rainbow-text">Congratulations!</span>
            </h1>
            <p className="text-lg sm:text-xl text-black font-bold">
              You've completed the quiz! 🎉
            </p>
          </div>

          {/* Final Score */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="text-gray-700 text-sm sm:text-base md:text-lg mb-2">Your Final Score</div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-2 sm:mb-3 md:mb-4"
            >
              {score}
            </motion.div>
            {rainbowBonus > 0 && (
              <div className="text-xs sm:text-sm text-purple-600 mb-2 flex items-center justify-center gap-1">
                <span>🌈</span>
                <span>+{rainbowBonus} Rainbow Wallet bonus!</span>
              </div>
            )}
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600 mb-3 sm:mb-4">{rank}</div>
            
            {/* Progress Bar */}
            <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${accuracyPercentage}%` }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-full progress-rainbow"
              />
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-2">{accuracyPercentage}% of questions answered correctly</div>
          </div>

          {/* dApp Browser Warning */}
          {isDappBrowser && (
            <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-orange-600">📱</span>
                <span className="text-orange-700 font-medium text-sm">
                  Using {browserType} - Limited Features
                </span>
              </div>
              <p className="text-orange-600 text-xs">
                PNG generation and clipboard may not work. Try: 1) Long-press images to save 2) Use "Share/Mobile Options" button 3) Copy the link and share manually
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white rounded-xl p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl mb-2">📊</div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-black">{totalQuestions}</div>
              <div className="text-xs sm:text-sm text-gray-600">Questions</div>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl mb-2">💯</div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-black">{accuracyPercentage}%</div>
              <div className="text-xs sm:text-sm text-gray-600">Accuracy</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-3 sm:space-y-4 mt-4 sm:mt-6 md:mt-8"
        >
          <button
            onClick={() => {
              setIsGeneratingScorecard(true);
              generateScorecard();
              setTimeout(() => setIsGeneratingScorecard(false), 1000);
            }}
            disabled={isGeneratingScorecard}
            className="btn-rainbow text-lg sm:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-xl font-bold shadow-lg w-full disabled:opacity-50"
          >
            {isGeneratingScorecard ? (
              <div className="flex items-center justify-center gap-2">
                <div className="spinner-rainbow w-4 h-4"></div>
                Generating PNG...
              </div>
            ) : (
              '🎨 Generate PNG Scorecard'
            )}
          </button>

          {/* Sharing text */}
          <p className="text-gray-600 text-xs sm:text-sm text-center mb-3 sm:mb-4">
            Share your score with friends and challenge them! 🚀
          </p>

          {/* Two buttons side by side */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={() => router.push('/welcome')}
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg transition-all duration-200"
            >
              🔁 Play Again
            </button>

            <button
              onClick={() => router.push('/leaderboard')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-xl transition-all duration-200 shadow-md text-sm sm:text-base md:text-lg"
            >
              🏆 View Leaderboard
            </button>
          </div>

          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base"
          >
            ← Back to Home
          </button>
        </motion.div>
      </motion.div>

      {/* Hidden scorecard preview for html2canvas capture */}
      <div className="fixed -left-[9999px] -top-[9999px] opacity-0 pointer-events-none">
        <div id="scorecard-preview" className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 w-[800px]" style={{
          background: '#f9fafb',
          border: '2px solid #e5e7eb',
          borderRadius: '16px',
          padding: '32px',
          width: '800px',
          fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
        }}>
          {/* Header */}
          <div className="mb-6 flex items-center gap-4" style={{ marginBottom: '24px' }}>
            {/* PFP Display */}
            {pfpData && (
              <div className="flex-shrink-0" style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img
                    src={pfpData}
                    alt="Profile Picture"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <h2 className="text-gray-700 text-lg mb-2" style={{
                color: '#374151',
                fontSize: '18px',
                marginBottom: '8px',
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
              }}>{getDisplayName(address, nickname) || 'Quiz Player'}, here is your final score!</h2>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-7xl font-bold text-black mb-4"
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '16px',
              fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
            }}
          >
            {score}
          </motion.div>
          {rainbowBonus > 0 && (
            <div className="text-sm text-purple-600 mb-2 flex items-center justify-center gap-1" style={{
              fontSize: '14px',
              color: '#7c3aed',
              marginBottom: '8px',
              fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
            }}>
              <span>🌈</span>
              <span>+{rainbowBonus} Rainbow Wallet bonus!</span>
            </div>
          )}
          <div className="text-2xl font-bold text-purple-600 mb-6" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#7c3aed',
            marginBottom: '24px',
            fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
          }}>{rank}</div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4" style={{
            width: '100%',
            height: '16px',
            background: '#e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${accuracyPercentage}%` }}
              transition={{ delay: 0.4, duration: 1 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{
                height: '100%',
                background: `linear-gradient(to right, #8b5cf6, #ec4899)`,
                borderRadius: '8px',
                transition: 'width 1s ease-out'
              }}
            />
          </div>
          <div className="text-sm text-gray-600 mb-6" style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '24px',
            fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
          }}>{accuracyPercentage}% of questions answered correctly</div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }}>
            <div className="bg-white rounded-xl p-4" style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
            }}>
              <div className="text-3xl mb-2" style={{
                fontSize: '24px',
                marginBottom: '8px'
              }}>📊</div>
              <div className="text-2xl font-bold text-black" style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
              }}>{totalQuestions}</div>
              <div className="text-sm text-gray-600" style={{
                fontSize: '14px',
                color: '#6b7280',
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
              }}>Questions</div>
            </div>

            <div className="bg-white rounded-xl p-4" style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
            }}>
              <div className="text-3xl mb-2" style={{
                fontSize: '24px',
                marginBottom: '8px'
              }}>💯</div>
              <div className="text-2xl font-bold text-black" style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
              }}>{accuracyPercentage}%</div>
              <div className="text-sm text-gray-600" style={{
                fontSize: '14px',
                color: '#6b7280',
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
              }}>Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scorecard Preview Modal */}
      <AnimatePresence>
        {showScorecardPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50"
            onClick={() => setShowScorecardPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-4 sm:p-5 md:p-6 max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowScorecardPreview(false)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 text-xl sm:text-2xl z-10"
              >
                ×
              </button>

              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">
                {scorecardImageUrl ? 'Your Scorecard Image' : 'Share Your Scorecard'}
              </h3>

              {/* PNG Image Preview or Live Preview */}
              <div className="mb-4 sm:mb-6">
                {scorecardImageUrl ? (
                  <div className="text-center">
                    <img
                      src={scorecardImageUrl}
                      alt="Scorecard"
                      className="w-full max-w-md mx-auto h-auto rounded-lg shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="text-center p-6 sm:p-8">
                    <p className="text-gray-600 text-sm sm:text-base">Generating your scorecard...</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-4">
                {scorecardImageUrl ? (
                  <>
                    <p className="text-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Choose how to share your scorecard! 🎉</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <button
                        onClick={downloadScorecard}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        📥 Download PNG
                      </button>

                      <button
                        onClick={copyImageToClipboard}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        🖼️ Copy Image
                      </button>

                      <button
                        onClick={handleShare}
                        className="bg-gray-800 hover:bg-gray-900 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        📱 {isDappBrowser ? 'Share/Mobile Options' : 'Share Link'}
                      </button>

                      <button
                        onClick={handleTwitterShare}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        🐦 Share on Twitter
                      </button>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">💙 Loving the quiz?</p>
                      <p className="text-sm text-gray-600">
                        Don't forget to follow{' '}
                        <a
                          href="https://x.com/davee0x"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 underline font-medium"
                        >
                          Dave
                        </a>
                        {' '}&{' '}
                        <a
                          href="https://x.com/jigz_crypto"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 underline font-medium"
                        >
                          Jigz
                        </a>
                        {' '}for more updates!
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Generate your scorecard image to share! 🎉</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <button
                        onClick={downloadScorecard}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        🎨 Generate PNG
                      </button>

                      <button
                        onClick={handleShare}
                        className="bg-gray-800 hover:bg-gray-900 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        📱 {isDappBrowser ? 'Share/Mobile Options' : 'Share Link'}
                      </button>

                      <button
                        onClick={handleTwitterShare}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        🐦 Share on Twitter
                      </button>

                      <button
                        onClick={() => setShowScorecardPreview(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                      >
                        Close Preview
                      </button>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">💙 Loving the quiz?</p>
                      <p className="text-sm text-gray-600">
                        Don't forget to follow{' '}
                        <a
                          href="https://x.com/davee0x"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 underline font-medium"
                        >
                          Dave
                        </a>
                        {' '}&{' '}
                        <a
                          href="https://x.com/jigz_crypto"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 underline font-medium"
                        >
                          Jigz
                        </a>
                        {' '}for more updates!
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-rainbow w-12 h-12"></div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
