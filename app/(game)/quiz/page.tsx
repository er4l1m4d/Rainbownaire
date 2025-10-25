'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { QuestionCard } from '@/components/game/QuestionCard';
import { Timer } from '@/components/game/Timer';
import { LifelineButtons } from '@/components/game/LifelineButtons';
import { sampleQuestions, getRandomQuestions } from '@/lib/data/sampleQuestions';
import { Question, LifelinesUsed, LifelineType } from '@/types/game';
import { LifelineManager } from '@/lib/utils/lifelineLogic';
import { calculateQuestionScore } from '@/lib/utils/scoring';
import { usePFP } from '@/hooks/usePFP';
import { shuffleArray, getStoredNickname } from '@/lib/utils/user';
import Image from 'next/image';

export default function QuizPage() {
  const router = useRouter();
  const { isConnected, address } = useAccount();

  // PFP management
  const { pfpData } = usePFP();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [lifelinesUsed, setLifelinesUsed] = useState<LifelinesUsed>({});
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  const [showNetworkVotes, setShowNetworkVotes] = useState(false);
  const [friendAdvice, setFriendAdvice] = useState<string | null>(null);
  const [showPointsPopup, setShowPointsPopup] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  // Shuffled questions state
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  // Initialize shuffled questions when component mounts
  useEffect(() => {
    // Get 15 random questions from the full question pool
    const randomQuestions = getRandomQuestions(15);

    if (randomQuestions && randomQuestions.length > 0) {
      // Shuffle questions order
      const shuffled = shuffleArray(randomQuestions);

      // Shuffle answer options within each question while keeping letters in order
      const shuffledWithOptions = shuffled.map(question => {
        // Extract the content part of each answer option
        const answerContents = question.answer_options.map(option => {
          // Match pattern like "A) Answer content" and extract "Answer content"
          const match = option.match(/^[A-D]\)\s*(.+)$/);
          return match ? match[1] : option;
        });

        // Shuffle the content
        const shuffledContents = shuffleArray(answerContents);

        // Find which content is the correct answer
        const correctAnswerContent = question.answer_options.find(option => {
          const match = option.match(/^[A-D]\)\s*(.+)$/);
          if (match) {
            // Check if this option's letter matches the correct answer
            const letter = option.charAt(0);
            return letter === question.correct_answer;
          }
          return false;
        });

        // Extract the correct answer content
        let correctContent = '';
        if (correctAnswerContent) {
          const match = correctAnswerContent.match(/^[A-D]\)\s*(.+)$/);
          if (match) {
            correctContent = match[1];
          }
        }

        // Find where the correct answer content ended up in the shuffled array
        const newCorrectIndex = shuffledContents.indexOf(correctContent);
        const letterOptions = ['A', 'B', 'C', 'D'];
        const newCorrectAnswer = letterOptions[newCorrectIndex] as 'A' | 'B' | 'C' | 'D';

        // Create new options with letters in order but shuffled content
        const shuffledOptions = ['A', 'B', 'C', 'D'].map((letter, index) =>
          `${letter}) ${shuffledContents[index]}`
        );

        return {
          ...question,
          answer_options: shuffledOptions,
          correct_answer: newCorrectAnswer
        };
      });

      setShuffledQuestions(shuffledWithOptions);
      setIsLoading(false);
    }
  }, []);

  const currentQuestion = shuffledQuestions?.[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;
  const lifelineManager = new LifelineManager(lifelinesUsed);
  
  // Set loading state when questions change
  useEffect(() => {
    if (shuffledQuestions && shuffledQuestions.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [shuffledQuestions]);

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleTimeUp = () => {
    if (!isAnswered) {
      // Defer the state update to avoid React error during render
      setTimeout(() => {
        handleAnswer(null); // Auto-submit as wrong
      }, 0);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleAnswer = (answer: string | null) => {
    setIsAnswered(true);
    const isCorrect = answer === currentQuestion.correct_answer;
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

    // Calculate score
    const scoreCalc = calculateQuestionScore(
      isCorrect,
      timeSpent,
      isCorrect ? consecutiveCorrect + 1 : 0,
      lifelinesUsed
    );

    const newScore = Math.max(0, score + scoreCalc.totalScore);
    setScore(newScore);


    // Track correct answers
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setConsecutiveCorrect(prev => prev + 1);
    } else {
      setConsecutiveCorrect(0);
    }

    // Show points popup
    setPointsEarned(scoreCalc.totalScore);
    setIsCorrectAnswer(isCorrect);
    setShowPointsPopup(true);
  };

  const handleSkip = () => {
    // Move to next question immediately without scoring
    setIsAnswered(true);

    // Reset streak since they skipped
    setConsecutiveCorrect(0);

    // Show skip popup (0 points earned)
    setPointsEarned(0);
    setIsCorrectAnswer(false);
    setShowPointsPopup(true);
  };

  const nextQuestion = () => {
    // Reset question state
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setHiddenOptions([]);
    setShowNetworkVotes(false);
    setFriendAdvice(null);
    setIsAnswered(false);
    setQuestionStartTime(Date.now());
  };

  const handleContinueToNext = async () => {
    setShowPointsPopup(false);

    // Move to next question after showing popup
    setTimeout(async () => {
      if (isLastQuestion) {
        // Submit score to leaderboard before showing results
        if (address) {
          try {
            // Get nickname from localStorage
            const nickname = getStoredNickname(address);

            await fetch('/api/leaderboard', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                playerAddress: address,
                score: score,
                correctAnswers: correctAnswers,
                totalQuestions: shuffledQuestions.length,
                displayName: nickname, // Include nickname from localStorage
              }),
            });
          } catch (error) {
            console.error('Failed to submit score to leaderboard:', error);
            // Continue to results even if leaderboard submission fails
          }
        }

        router.push(`/results?score=${score}&correct=${correctAnswers}`);
      } else {
        nextQuestion();
      }
    }, 500);
  };

  const handleUseLifeline = (type: LifelineType) => {
    if (!lifelineManager.canUseLifeline(type)) return;

    switch (type) {
      case 'fiftyFifty':
        const keepOptions = lifelineManager.useFiftyFifty(currentQuestion);
        const allOptions = ['A', 'B', 'C', 'D'];
        const toHide = allOptions.filter(opt => !keepOptions.includes(opt));
        setHiddenOptions(toHide);
        break;

      case 'askNetwork':
        lifelineManager.useAskNetwork(currentQuestion);
        setShowNetworkVotes(true);
        break;

      case 'phoneFriend':
        const advice = lifelineManager.usePhoneFriend(currentQuestion);
        setFriendAdvice(advice.message);
        break;
    }

    setLifelinesUsed(lifelineManager.getState());
  };

  if (!isConnected) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-rainbow w-12 h-12"></div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Question Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't load the current question. Please try again.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-rainbow-500 text-white rounded-lg hover:bg-rainbow-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8" suppressHydrationWarning={true}>
      <div className="max-w-5xl mx-auto" suppressHydrationWarning={true}>
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8 bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200" suppressHydrationWarning={true}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* PFP Display */}
            {pfpData && (
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={pfpData}
                      alt="Profile Picture"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="text-center md:text-left">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-1 sm:mb-2">
                Question {currentQuestionIndex + 1} / {shuffledQuestions.length}
              </h1>
              <div className="w-full md:w-64 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%` }}
                  className="h-full progress-rainbow"
                />
              </div>
            </div>

            {/* Timer */}
            <Timer
              key={currentQuestionIndex}
              initialTime={20}
              onTimeUp={handleTimeUp}
              isPaused={isAnswered}
            />

            {/* Score */}
            <div className="score-display">
              <div className="text-xs sm:text-sm">Score</div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold">{score}</div>
            </div>
          </div>

          {/* Lifelines */}
          <LifelineButtons
            lifelinesUsed={lifelinesUsed}
            onUseLifeline={handleUseLifeline}
            disabled={isAnswered}
          />
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          isAnswered={isAnswered}
          correctAnswer={isAnswered && currentQuestion ? currentQuestion.correct_answer : undefined}
          isLoading={isLoading}
          hiddenOptions={hiddenOptions}
        />

        {/* Submit Button & Skip Button */}
        {!isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            {selectedAnswer ? (
              <button
                onClick={() => handleAnswer(selectedAnswer)}
                className="btn-rainbow px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-xl w-full sm:w-auto"
              >
                Submit Answer
              </button>
            ) : (
              <>
                <button
                  onClick={handleSkip}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 sm:px-7 md:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-xl transition-colors w-full sm:w-auto"
                >
                  Skip Question ⏭️
                </button>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Select an answer to submit or skip to continue
                </p>
              </>
            )}
          </motion.div>
        )}

        {/* Points Popup */}
        {showPointsPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleContinueToNext}
          >
            <motion.div
              initial={{ scale: 0.8, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-sm w-full mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 ${isCorrectAnswer ? 'text-green-500' : 'text-gray-500'}`}>
                {isCorrectAnswer ? '✅' : '❌'}
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2">
                {isCorrectAnswer ? 'Correct!' : pointsEarned === 0 ? 'Skipped' : 'Incorrect'}
              </h3>

              <div className="mb-6 sm:mb-8">
                <div className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 ${pointsEarned > 0 ? 'text-green-500' : 'text-gray-500'}`}>
                  {pointsEarned > 0 ? '+' : ''}{pointsEarned} pts
                </div>
                <div className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                  {pointsEarned === 0 && !isCorrectAnswer ? 'Question skipped' : `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`}
                </div>
                
                <button
                  onClick={handleContinueToNext}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white py-3 sm:py-4 px-6 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:shadow-xl"
                >
                  {isLastQuestion ? '🎯 View Results' : 'Next Question →'}
                </button>
                
                <button
                  onClick={handleContinueToNext}
                  className="mt-3 sm:mt-4 text-gray-500 hover:text-gray-700 text-xs sm:text-sm font-medium"
                >
                  or click anywhere to continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Lifeline Modals */}
        {showNetworkVotes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNetworkVotes(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4">Network Thinks 🌐</h3>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Here's what the Rainbow community suggests...</p>
              <div className="space-y-2">
                {['A', 'B', 'C', 'D'].map(option => {
                  const isCorrect = option === currentQuestion.correct_answer;
                  const percentage = isCorrect ? 45 + Math.random() * 20 : Math.random() * 25;
                  return (
                    <div key={option} className="flex items-center gap-2">
                      <span className="font-bold w-8 text-sm sm:text-base">{option})</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 sm:h-4">
                        <div
                          className="bg-purple-500 h-full rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{Math.round(percentage)}%</span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => setShowNetworkVotes(false)}
                className="mt-4 sm:mt-6 w-full bg-black text-white py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {friendAdvice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setFriendAdvice(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4">Friend Says 📞</h3>
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-sm sm:text-base md:text-lg text-black">{friendAdvice}</p>
              </div>
              <button
                onClick={() => setFriendAdvice(null)}
                className="w-full bg-black text-white py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base"
              >
                Thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
