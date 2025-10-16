export const TIMER_CONFIG = {
  QUESTION_TIME_LIMIT: 20, // seconds per question
  WARNING_THRESHOLD: 5, // show warning when this many seconds left
} as const;

export class GameTimer {
  private timeLeft: number;
  private intervalId: NodeJS.Timeout | null = null;
  private callbacks: {
    onTick?: (timeLeft: number) => void;
    onWarning?: (timeLeft: number) => void;
    onTimeUp?: () => void;
  } = {};

  constructor(initialTime: number = TIMER_CONFIG.QUESTION_TIME_LIMIT) {
    this.timeLeft = initialTime;
  }

  start(callbacks: {
    onTick?: (timeLeft: number) => void;
    onWarning?: (timeLeft: number) => void;
    onTimeUp?: () => void;
  }) {
    this.callbacks = callbacks;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.timeLeft--;
      
      // Call tick callback
      this.callbacks.onTick?.(this.timeLeft);
      
      // Call warning callback
      if (this.timeLeft === TIMER_CONFIG.WARNING_THRESHOLD) {
        this.callbacks.onWarning?.(this.timeLeft);
      }
      
      // Call time up callback
      if (this.timeLeft <= 0) {
        this.stop();
        this.callbacks.onTimeUp?.();
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset(newTime: number = TIMER_CONFIG.QUESTION_TIME_LIMIT) {
    this.stop();
    this.timeLeft = newTime;
  }

  getTimeLeft(): number {
    return this.timeLeft;
  }

  getTimeSpent(originalTime: number = TIMER_CONFIG.QUESTION_TIME_LIMIT): number {
    return originalTime - this.timeLeft;
  }

  isWarningTime(): boolean {
    return this.timeLeft <= TIMER_CONFIG.WARNING_THRESHOLD;
  }

  isTimeUp(): boolean {
    return this.timeLeft <= 0;
  }

  getProgressPercentage(originalTime: number = TIMER_CONFIG.QUESTION_TIME_LIMIT): number {
    return ((originalTime - this.timeLeft) / originalTime) * 100;
  }
}

// Utility function to format time display
export function formatTimerDisplay(seconds: number): string {
  if (seconds <= 0) return '0:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `0:${secs.toString().padStart(2, '0')}`;
}

// Session timer for tracking total game time
export class SessionTimer {
  private startTime: number;
  private endTime?: number;
  private isRunning: boolean = false;

  constructor() {
    this.startTime = Date.now();
  }

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now();
      this.isRunning = true;
    }
  }

  stop() {
    if (this.isRunning) {
      this.endTime = Date.now();
      this.isRunning = false;
    }
  }

  getTotalSeconds(): number {
    const end = this.endTime || Date.now();
    return Math.floor((end - this.startTime) / 1000);
  }

  reset() {
    this.startTime = Date.now();
    this.endTime = undefined;
    this.isRunning = false;
  }
}