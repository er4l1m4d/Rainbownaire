// Rainbow Wallet UI Components
export { RainbowButton } from './rainbow-button';
export { RainbowCard } from './rainbow-card';
export { RainbowInput } from './rainbow-input';
export { RainbowBadge } from './rainbow-badge';
export { RainbowProgress } from './rainbow-progress';
export { RainbowModal } from './rainbow-modal';
export { PageTransition, usePageTransition } from './page-transition';
export { AnimatedLayout, FloatingBackground } from './animated-layout';
export { AnswerFeedback, CelebrationParticles } from './answer-feedback';
export { LoadingSpinner, SkeletonLoader } from './loading-spinner';
export { ResponsiveContainer, ResponsiveButtonGrid, ResponsiveText, TouchButton } from './responsive-utils';
export { SkipLink, AccessibleHeading, AccessibleButton, AccessibleInput, LiveRegion, useFocusTrap } from './accessibility';

// Re-export commonly used design elements
export const rainbowColors = {
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#f093fb',
  warning: '#f5576c',
  success: '#4facfe'
};

export const rainbowGradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
  subtle: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  warm: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ff6b6b 100%)',
  cool: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4facfe 100%)'
};
