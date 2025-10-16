import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  show: boolean;
  message?: string;
  onComplete?: () => void;
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  isCorrect,
  show,
  message,
  onComplete
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
          onAnimationComplete={onComplete}
          className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-none`}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`relative px-8 py-4 rounded-2xl shadow-2xl ${
              isCorrect
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {/* Pulsing background effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className={`absolute inset-0 rounded-2xl ${
                isCorrect ? 'bg-green-400' : 'bg-red-400'
              }`}
            />

            <div className="relative flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: isCorrect ? 1 : 0,
                  ease: 'easeInOut'
                }}
                className="text-3xl"
              >
                {isCorrect ? '🎉' : '😅'}
              </motion.div>

              <div className="text-center">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold"
                >
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </motion.div>

                {message && (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm opacity-90"
                  >
                    {message}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Floating celebration particles
interface CelebrationParticlesProps {
  show: boolean;
  count?: number;
}

export const CelebrationParticles: React.FC<CelebrationParticlesProps> = ({
  show,
  count = 20
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 1,
    emoji: ['🎉', '✨', '🌟', '💫', '🎊'][Math.floor(Math.random() * 5)]
  }));

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-2xl"
              initial={{
                x: `${particle.x}%`,
                y: '100%',
                scale: 0,
                rotate: 0,
                opacity: 1
              }}
              animate={{
                y: `${particle.y - 100}%`,
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: 'easeOut'
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
