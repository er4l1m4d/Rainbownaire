// Game configuration constants
export const GAME_CONFIG = {
  TOTAL_QUESTIONS: 15,
  QUESTION_TIME_LIMIT: 20, // seconds
  WARNING_TIME_THRESHOLD: 5, // seconds
  FAST_ANSWER_THRESHOLD: 10, // seconds
  STREAK_THRESHOLD: 3, // consecutive correct answers for bonus
} as const;

// Scoring constants
export const SCORE_VALUES = {
  CORRECT_ANSWER: 100,
  FAST_BONUS: 25,
  STREAK_BONUS: 50,
  WRONG_PENALTY: -50,
  LIFELINE_PENALTY: -10,
} as const;

// Question categories
export const QUESTION_CATEGORIES = [
  'rainbow',
  'wallets',
  'nfts',
  'security',
  'defi',
  'web3',
] as const;

// Question difficulties
export const QUESTION_DIFFICULTIES = [
  'easy',
  'medium',
  'hard',
] as const;

// Lifeline types
export const LIFELINE_TYPES = [
  'fiftyFifty',
  'askNetwork',
  'phoneFriend',
] as const;

// UI Constants
export const UI_CONFIG = {
  ANIMATION_DURATION: 300, // milliseconds
  TOAST_DURATION: 3000, // milliseconds
  LOADING_DELAY: 500, // milliseconds
  DEBOUNCE_DELAY: 300, // milliseconds
} as const;

// Color themes for Rainbow gradients
export const RAINBOW_COLORS = {
  primary: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'],
  light: ['#667eea20', '#764ba220', '#f093fb20', '#f5576c20', '#4facfe20'],
  dark: ['#667eea80', '#764ba280', '#f093fb80', '#f5576c80', '#4facfe80'],
} as const;

// Error messages (themed)
export const ERROR_MESSAGES = {
  WALLET_DISCONNECTED: 'Your wallet flew away 🪄 — reconnect to continue your rainbow streak!',
  QUESTION_LOAD_FAILED: 'Oops! Couldn\'t find your rainbow quiz 🌈 — reloading a new one!',
  ANSWER_SUBMIT_FAILED: 'Couldn\'t lock in your answer — try again?',
  LEADERBOARD_LOAD_FAILED: 'Leaderboard cloud not syncing ☁️ — showing offline results.',
  SESSION_CREATE_FAILED: 'Rainbow broke a wing 🪶 — let\'s try starting a new game!',
  NETWORK_ERROR: 'Internet connection got colorful 🌈 — check your connection!',
  GENERIC_ERROR: 'Something went sideways 🌀 — but we\'re on it!',
} as const;

// Success messages (themed)
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Rainbow connection established! 🌈✨',
  GAME_STARTED: 'Let the rainbow quiz begin! 🎯',
  CORRECT_ANSWER: 'Brilliant! ✨',
  WRONG_ANSWER: 'Not quite, but keep going! 💪',
  GAME_COMPLETED: 'You did it! Rainbow champion! 🏆',
  NEW_HIGH_SCORE: 'You just hit a new vibe record! 🌈💪 Keep glowing!',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  SESSION_NEW: '/api/session/new',
  SESSION_COMPLETE: '/api/session/[sessionId]/complete',
  SUBMIT_ANSWER: '/api/session/[sessionId]/submitAnswer',
  LEADERBOARD: '/api/leaderboard',
  QUESTIONS_BATCH: '/api/questions/batch',
  AI_GENERATE: '/api/ai/generate',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  GAME_STATE: 'rainbownaire_game_state',
  PLAYER_PREFERENCES: 'rainbownaire_player_prefs',
  CACHED_QUESTIONS: 'rainbownaire_cached_questions',
  LEADERBOARD_CACHE: 'rainbownaire_leaderboard_cache',
} as const;

// Social sharing messages
export const SOCIAL_MESSAGES = {
  SHARE_SCORE: (score: number) => `Just scored ${score} points on Rainbownaire! 🌈 Think you can beat me? Try it out!`,
  INVITE_FRIEND: 'Hey! Want to test your Web3 knowledge? Try Rainbownaire - a fun Rainbow Wallet quiz game! 🌈',
} as const;