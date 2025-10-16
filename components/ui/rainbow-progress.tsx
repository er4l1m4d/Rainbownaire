import React from 'react';
import { motion } from 'framer-motion';

interface RainbowProgressProps {
  value: number;
  max?: number;
  variant?: 'default' | 'rainbow' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  className?: string;
  animated?: boolean;
}

export const RainbowProgress: React.FC<RainbowProgressProps> = ({
  value,
  max = 100,
  variant = 'rainbow',
  size = 'md',
  showPercentage = false,
  className = '',
  animated = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6"
  };

  const variantClasses = {
    default: "bg-gray-200",
    rainbow: "bg-gradient-to-r from-purple-200 to-pink-200",
    gradient: "bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200"
  };

  const fillClasses = {
    default: "bg-purple-500",
    rainbow: "progress-rainbow",
    gradient: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
  };

  const progressBar = (
    <div className={`w-full ${sizeClasses[size]} ${variantClasses[variant]} rounded-full overflow-hidden ${className}`}>
      <motion.div
        className={`h-full ${fillClasses[variant]} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: animated ? `${percentage}%` : `${percentage}%` }}
        transition={{ duration: animated ? 1.5 : 0, ease: "easeOut" }}
      />
    </div>
  );

  if (showPercentage) {
    return (
      <div className="flex items-center gap-3">
        {progressBar}
        <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
          {Math.round(percentage)}%
        </span>
      </div>
    );
  }

  return progressBar;
};
