import React from 'react';
import { motion } from 'framer-motion';

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const RainbowButton: React.FC<RainbowButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = "btn-rainbow font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "rainbow-gradient text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "rainbow-gradient text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border-2 border-purple-500 text-purple-500 hover:rainbow-gradient hover:text-white bg-transparent rainbow-hover",
    ghost: "text-purple-600 hover:rainbow-gradient hover:text-white bg-transparent rainbow-hover"
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      type={props.type || 'button'}
      aria-label={props['aria-label']}
      aria-describedby={props['aria-describedby']}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="spinner-rainbow w-4 h-4"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};
