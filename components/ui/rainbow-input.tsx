import React from 'react';
import { motion } from 'framer-motion';

interface RainbowInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  id?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

export const RainbowInput: React.FC<RainbowInputProps> = ({
  label,
  error,
  helperText,
  variant = 'outline',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const baseClasses = "w-full rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-200";

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg"
  };

  const variantClasses = {
    default: "border-gray-200 focus:border-purple-500 bg-white",
    outline: "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300",
    filled: "border-transparent focus:border-purple-500 bg-gray-50 hover:bg-gray-100"
  };

  const inputClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      {label && (
        <motion.label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {label}
        </motion.label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <motion.input
          id={inputId}
          className={`${inputClasses} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
          }`}
          whileFocus={{ scale: 1.02 }}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          placeholder={props.placeholder}
          type={props.type}
          disabled={props.disabled}
          required={props.required}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <motion.p
          className="text-sm text-red-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}

      {helperText && !error && (
        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {helperText}
        </motion.p>
      )}
    </div>
  );
};
