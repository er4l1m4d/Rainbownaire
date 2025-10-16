'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/types/game';

interface QuestionCardProps {
  question?: Question | null;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  isAnswered: boolean;
  correctAnswer?: string;
  hiddenOptions?: string[];
  isLoading?: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  isAnswered,
  correctAnswer,
  hiddenOptions = [],
  isLoading = false,
}: QuestionCardProps) {
  // Show loading state
  if (isLoading || !question) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-lg border-2 border-gray-200">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-3 mt-6">
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6"></div>
              <div className="h-6 bg-gray-200 rounded w-4/6"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const getOptionLetter = (optionText: string): string => {
    return optionText.charAt(0);
  };

  const getOptionStatus = (optionText: string): 'correct' | 'incorrect' | 'selected' | 'default' => {
    const letter = getOptionLetter(optionText);
    
    if (!isAnswered) {
      return selectedAnswer === letter ? 'selected' : 'default';
    }
    
    if (correctAnswer === letter) {
      return 'correct';
    }
    
    if (selectedAnswer === letter && selectedAnswer !== correctAnswer) {
      return 'incorrect';
    }
    
    return 'default';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-lg border-2 border-gray-200"
      >
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">❓</span>
          <h2 className="text-xl md:text-2xl font-bold text-black flex-1">
            {question?.question_text || 'Question not available'}
          </h2>
        </div>
        
        {/* Question metadata */}
        <div className="flex gap-2 text-sm">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
            {question.difficulty}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
            {question.category}
          </span>
        </div>
      </motion.div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="wait">
          {question.answer_options.map((option, index) => {
            const letter = getOptionLetter(option);
            const isHidden = hiddenOptions.includes(letter);
            const status = getOptionStatus(option);

            if (isHidden) {
              return (
                <motion.div
                  key={option}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-20 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
                >
                  <span className="text-gray-400 text-sm">Eliminated</span>
                </motion.div>
              );
            }

            return (
              <motion.button
                key={option}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                onClick={() => !isAnswered && onSelectAnswer(letter)}
                disabled={isAnswered}
                className={`
                  relative p-4 rounded-xl font-bold text-left transition-all duration-200
                  ${status === 'correct' && 'answer-option correct'}
                  ${status === 'incorrect' && 'answer-option incorrect'}
                  ${status === 'selected' && !isAnswered && 'answer-option selected'}
                  ${status === 'default' && 'answer-option'}
                  ${isAnswered ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Option letter badge */}
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                    ${status === 'correct' ? 'bg-green-500 text-white' :
                      status === 'incorrect' ? 'bg-red-500 text-white' :
                      status === 'selected' ? 'bg-purple-500 text-white' :
                      'bg-gray-200 text-black'}
                  `}>
                    {letter}
                  </div>
                  
                  {/* Option text */}
                  <span className="flex-1 text-black">
                    {option.substring(3)}
                  </span>

                  {/* Status icon */}
                  {isAnswered && status === 'correct' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-2xl"
                    >
                      ✓
                    </motion.span>
                  )}
                  {isAnswered && status === 'incorrect' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-2xl"
                    >
                      ✗
                    </motion.span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
