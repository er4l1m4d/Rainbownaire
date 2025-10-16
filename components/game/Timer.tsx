'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  initialTime?: number;
  onTimeUp: () => void;
  isPaused?: boolean;
  onTick?: (timeLeft: number) => void;
}

export function Timer({ 
  initialTime = 20, 
  onTimeUp, 
  isPaused = false,
  onTick 
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const isWarning = timeLeft <= 5;

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        if (newTime <= 0) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        
        onTick?.(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused, onTimeUp, onTick]);

  return (
    <div className="flex items-center gap-4">
      {/* Timer Display */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">⏱️</span>
        <motion.span
          key={timeLeft}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`text-3xl font-bold ${
            isWarning ? 'text-red-500' : 'text-black'
          }`}
        >
          {timeLeft}s
        </motion.span>
      </div>

      {/* Progress Ring */}
      <div className="relative w-16 h-16">
        <svg className="transform -rotate-90 w-16 h-16">
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke={isWarning ? '#ef4444' : '#667eea'}
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - timeLeft / initialTime)}`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 0 }}
            animate={{ 
              strokeDashoffset: `${2 * Math.PI * 28 * (1 - timeLeft / initialTime)}` 
            }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </div>
    </div>
  );
}
