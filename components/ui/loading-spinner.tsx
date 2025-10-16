import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'rainbow' | 'dots' | 'pulse' | 'bars';
  className?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'rainbow',
  className = '',
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  if (variant === 'rainbow') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} border-4 border-transparent border-t-purple-500 border-r-pink-500 border-b-blue-500 border-l-green-500 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-600"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-purple-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-gradient-to-r from-purple-500 to-pink-500 rounded-full ${className}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    );
  }

  if (variant === 'bars') {
    return (
      <div className={`flex items-end gap-1 ${className}`}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-purple-500 rounded-t-full"
            style={{ height: `${Math.random() * 20 + 10}px` }}
            animate={{
              height: [`${Math.random() * 20 + 10}px`, `${Math.random() * 30 + 15}px`, `${Math.random() * 20 + 10}px`]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

// Skeleton loader for content loading states
interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
  animate?: boolean;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  lines = 3,
  className = '',
  animate = true
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <motion.div
          key={i}
          className={`h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
          animate={animate ? {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />
      ))}
    </div>
  );
};
