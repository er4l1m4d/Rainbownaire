import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface AnimatedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const layoutVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

export const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      variants={layoutVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen ${className}`}
    >
      <motion.div variants={childVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
};

// Floating background elements for visual appeal
export const FloatingBackground: React.FC = () => {
  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full opacity-10"
      style={{
        background: `linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`,
        width: `${Math.random() * 100 + 50}px`,
        height: `${Math.random() * 100 + 50}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  ));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {floatingElements}
    </div>
  );
};
