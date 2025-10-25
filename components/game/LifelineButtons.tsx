'use client';

import { motion } from 'framer-motion';
import { LifelinesUsed, LifelineType } from '@/types/game';

interface LifelineButtonsProps {
  lifelinesUsed: LifelinesUsed;
  onUseLifeline: (type: LifelineType) => void;
  disabled?: boolean;
}

export function LifelineButtons({ 
  lifelinesUsed, 
  onUseLifeline,
  disabled = false 
}: LifelineButtonsProps) {
  const lifelines = [
    {
      type: 'fiftyFifty' as LifelineType,
      icon: '⚖️',
      label: '50:50',
      description: 'Remove 2 wrong answers',
    },
    {
      type: 'askNetwork' as LifelineType,
      icon: '🌐',
      label: 'Ask Network',
      description: 'See community votes',
    },
    {
      type: 'phoneFriend' as LifelineType,
      icon: '📞',
      label: 'Phone Friend',
      description: 'Get friend\'s help',
    },
  ];

  return (
    <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
      {lifelines.map((lifeline) => {
        const isUsed = lifelinesUsed[lifeline.type];
        const isDisabled = disabled || isUsed;

        return (
          <motion.button
            key={lifeline.type}
            whileHover={!isDisabled ? { scale: 1.05 } : {}}
            whileTap={!isDisabled ? { scale: 0.95 } : {}}
            onClick={() => !isDisabled && onUseLifeline(lifeline.type)}
            disabled={isDisabled}
            className={`
              relative group px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-bold transition-all duration-200 text-sm sm:text-base
              ${isUsed
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg hover:shadow-xl'
              }
              ${disabled && !isUsed ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            title={lifeline.description}
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl">{lifeline.icon}</span>
              <span className="text-xs sm:text-sm">{lifeline.label}</span>
            </div>

            {/* Tooltip */}
            {!isUsed && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                <div className="bg-black text-white text-xs rounded-lg px-2 sm:px-3 py-1 sm:py-2 whitespace-nowrap">
                  {lifeline.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Used indicator */}
            {isUsed && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                ✓
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
