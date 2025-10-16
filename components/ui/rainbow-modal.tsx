import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RainbowModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export const RainbowModal: React.FC<RainbowModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  className = '',
  showCloseButton = true,
  closeOnOverlayClick = true
}) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl"
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={closeOnOverlayClick ? onClose : undefined}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} w-full mx-4 ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10"
            >
              ×
            </button>
          )}

          {title && (
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
          )}

          <div className={title ? "px-6 py-4" : "p-6"}>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
