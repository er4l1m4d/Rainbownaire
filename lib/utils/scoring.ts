import { LifelinesUsed } from '@/types/game';

// Scoring constants
export const SCORING = {
  CORRECT_ANSWER: 100,
  FAST_BONUS: 25, // bonus for answering within 10 seconds
  STREAK_BONUS: 50, // bonus for 3+ consecutive correct answers
  WRONG_ANSWER_PENALTY: -50,
  LIFELINE_PENALTY: -10, // for Ask Network and Phone Friend
  FAST_ANSWER_THRESHOLD: 10, // seconds
  STREAK_THRESHOLD: 3, // consecutive correct answers
} as const;

export interface ScoreCalculation {
  baseScore: number;
  fastBonus: number;
  streakBonus: number;
  lifelinePenalty: number;
  totalScore: number;
}

export function calculateQuestionScore(
  isCorrect: boolean,
  timeSpent: number,
  consecutiveCorrect: number,
  lifelinesUsed: LifelinesUsed
): ScoreCalculation {
  const calculation: ScoreCalculation = {
    baseScore: 0,
    fastBonus: 0,
    streakBonus: 0,
    lifelinePenalty: 0,
    totalScore: 0,
  };

  if (isCorrect) {
    // Base score for correct answer
    calculation.baseScore = SCORING.CORRECT_ANSWER;

    // Fast bonus (answered within 10 seconds)
    if (timeSpent <= SCORING.FAST_ANSWER_THRESHOLD) {
      calculation.fastBonus = SCORING.FAST_BONUS;
    }

    // Streak bonus (3+ consecutive correct answers)
    if (consecutiveCorrect >= SCORING.STREAK_THRESHOLD) {
      calculation.streakBonus = SCORING.STREAK_BONUS;
    }
  } else {
    // Penalty for wrong answer
    calculation.baseScore = SCORING.WRONG_ANSWER_PENALTY;
  }

  // Lifeline penalties (except 50:50)
  let lifelineCount = 0;
  if (lifelinesUsed.askNetwork) lifelineCount++;
  if (lifelinesUsed.phoneFriend) lifelineCount++;
  
  calculation.lifelinePenalty = lifelineCount * SCORING.LIFELINE_PENALTY;

  // Calculate total
  calculation.totalScore = 
    calculation.baseScore + 
    calculation.fastBonus + 
    calculation.streakBonus + 
    calculation.lifelinePenalty;

  return calculation;
}

export function updateSessionScore(
  currentScore: number,
  scoreCalculation: ScoreCalculation
): number {
  return Math.max(0, currentScore + scoreCalculation.totalScore);
}

export function calculateFinalScore(
  correctAnswers: number,
  totalQuestions: number,
  totalTimeSpent: number,
  lifelinesUsed: LifelinesUsed
): number {
  // This is a simplified version - in practice, you'd sum up individual question scores
  const baseScore = correctAnswers * SCORING.CORRECT_ANSWER;
  
  // Time bonus (bonus for completing quickly)
  const averageTimePerQuestion = totalTimeSpent / totalQuestions;
  const timeBonus = averageTimePerQuestion < 15 ? correctAnswers * 10 : 0;
  
  // Lifeline penalty
  let lifelineCount = 0;
  if (lifelinesUsed.askNetwork) lifelineCount++;
  if (lifelinesUsed.phoneFriend) lifelineCount++;
  const lifelinePenalty = lifelineCount * SCORING.LIFELINE_PENALTY;
  
  return Math.max(0, baseScore + timeBonus + lifelinePenalty);
}

export function getScoreRank(score: number): string {
  if (score >= 1400) return '🌈 Rainbow Legend';
  if (score >= 1200) return '💎 Crystal Clear';
  if (score >= 1000) return '⭐ Rising Star';
  if (score >= 800) return '🔥 On Fire';
  if (score >= 600) return '💪 Getting Strong';
  if (score >= 400) return '🌱 Learning Fast';
  if (score >= 200) return '🎯 Getting Started';
  return '🌈 Rainbow Rookie';
}