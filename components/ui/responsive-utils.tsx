import React from 'react';
import { motion } from 'framer-motion';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = 'lg',
  padding = 'md'
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-full ${maxWidthClasses[maxWidth]} mx-auto ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Mobile-optimized button grid
interface ResponsiveButtonGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ResponsiveButtonGrid: React.FC<ResponsiveButtonGridProps> = ({
  children,
  columns = { sm: 1, md: 2, lg: 2 },
  gap = 'md',
  className = ''
}) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  };

  const gridCols = `grid-cols-${columns.sm} ${
    columns.md ? `md:grid-cols-${columns.md}` : ''
  } ${
    columns.lg ? `lg:grid-cols-${columns.lg}` : ''
  }`;

  return (
    <div className={`grid ${gridCols} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

// Mobile-optimized text sizing
interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'body',
  className = '',
  as: Component = 'p'
}) => {
  const variantClasses = {
    title: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
    subtitle: 'text-lg sm:text-xl md:text-2xl font-semibold',
    body: 'text-sm sm:text-base leading-relaxed',
    caption: 'text-xs sm:text-sm text-gray-600'
  };

  return (
    <Component className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
};

// Touch-friendly button component
interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = "touch-manipulation rounded-xl font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-offset-2";

  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[44px]', // Minimum 44px for touch targets
    md: 'px-6 py-4 text-base min-h-[48px]',
    lg: 'px-8 py-5 text-lg min-h-[52px]'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50',
    outline: 'bg-transparent border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  // Filter out props that conflict with Framer Motion
  const {
    onDrag,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate,
    formTarget,
    ...motionProps
  } = props;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};
