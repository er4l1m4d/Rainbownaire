import React from 'react';
import { motion } from 'framer-motion';

interface RainbowBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export const RainbowBadge: React.FC<RainbowBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  animate = true
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const variantClasses = {
    default: "bg-purple-100 text-purple-800 border-purple-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
    info: "bg-blue-100 text-blue-800 border-blue-200"
  };

  const badgeContent = (
    <span className={`inline-flex items-center font-medium rounded-full border ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );

  if (animate) {
    return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {badgeContent}
      </motion.span>
    );
  }

  return badgeContent;
};
