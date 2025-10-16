import React from 'react';
import { motion } from 'framer-motion';

interface RainbowCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'outline';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: boolean;
  animate?: boolean;
}

export const RainbowCard: React.FC<RainbowCardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hoverEffect = true,
  animate = true
}) => {
  const baseClasses = "rounded-2xl transition-all duration-300";

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12"
  };

  const variantClasses = {
    default: "bg-white shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-purple-200",
    gradient: "bg-gradient-to-br from-white to-purple-50 shadow-lg border border-purple-100 hover:shadow-xl hover:from-purple-50 hover:to-pink-50",
    glass: "bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/90",
    outline: "bg-transparent border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50/50"
  };

  const cardClasses = `${baseClasses} ${paddingClasses[padding]} ${variantClasses[variant]} ${className}`;

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={hoverEffect ? {
          y: -5,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        } : {}}
        className={cardClasses}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${cardClasses} ${hoverEffect ? 'hover-lift hover-glow' : ''}`}>
      {children}
    </div>
  );
};
