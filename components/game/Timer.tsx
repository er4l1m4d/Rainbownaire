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
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      {/* Timer Display */}
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-lg sm:text-xl md:text-2xl">⏱️</span>
        <motion.span
          key={timeLeft}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`text-xl sm:text-2xl md:text-3xl font-bold ${
            isWarning ? 'text-red-500' : 'text-black'
          }`}
        >
          {timeLeft}s
        </motion.span>
      </div>
    </div>
  );
}
