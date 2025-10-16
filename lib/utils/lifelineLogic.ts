import { LifelinesUsed, LifelineType, Question } from '@/types/game';

export interface LifelineEffect {
  type: LifelineType;
  description: string;
  canUse: boolean;
  effect?: any;
}

export class LifelineManager {
  private lifelinesUsed: LifelinesUsed = {};

  constructor(initialState?: LifelinesUsed) {
    if (initialState) {
      this.lifelinesUsed = { ...initialState };
    }
  }

  // Check if a lifeline can be used
  canUseLifeline(type: LifelineType): boolean {
    return !this.lifelinesUsed[type];
  }

  // Get all available lifelines
  getAvailableLifelines(): LifelineEffect[] {
    return [
      {
        type: 'fiftyFifty',
        description: 'Remove two incorrect answers',
        canUse: this.canUseLifeline('fiftyFifty'),
      },
      {
        type: 'askNetwork',
        description: 'See what the community thinks',
        canUse: this.canUseLifeline('askNetwork'),
      },
      {
        type: 'phoneFriend',
        description: 'Get advice from a friend',
        canUse: this.canUseLifeline('phoneFriend'),
      },
    ];
  }

  // Use 50:50 lifeline
  useFiftyFifty(question: Question): string[] {
    if (!this.canUseLifeline('fiftyFifty')) {
      throw new Error('50:50 lifeline already used');
    }

    this.lifelinesUsed.fiftyFifty = true;

    // Find the correct answer and one random incorrect answer
    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(question.correct_answer);
    const incorrectIndices = [0, 1, 2, 3].filter(i => i !== correctIndex);
    
    // Randomly select one incorrect answer to keep
    const keepIncorrectIndex = incorrectIndices[Math.floor(Math.random() * incorrectIndices.length)];
    
    // Return indices of answers to keep (correct + one incorrect)
    const keepIndices = [correctIndex, keepIncorrectIndex].sort();
    return keepIndices.map(i => ['A', 'B', 'C', 'D'][i]);
  }

  // Use Ask the Network lifeline
  useAskNetwork(question: Question): { [key: string]: number } {
    if (!this.canUseLifeline('askNetwork')) {
      throw new Error('Ask the Network lifeline already used');
    }

    this.lifelinesUsed.askNetwork = true;

    // Generate simulated community votes
    // Bias toward correct answer but add some randomness
    const votes: { [key: string]: number } = { A: 0, B: 0, C: 0, D: 0 };
    const correctAnswer = question.correct_answer;
    
    // Generate random percentages with bias toward correct answer
    const correctWeight = 0.4 + Math.random() * 0.3; // 40-70% for correct
    const remainingWeight = 1 - correctWeight;
    
    votes[correctAnswer] = Math.round(correctWeight * 100);
    
    const otherOptions = ['A', 'B', 'C', 'D'].filter(opt => opt !== correctAnswer);
    let remainingPercentage = 100 - votes[correctAnswer];
    
    otherOptions.forEach((option, index) => {
      if (index === otherOptions.length - 1) {
        // Last option gets remaining percentage
        votes[option] = remainingPercentage;
      } else {
        const percentage = Math.floor(Math.random() * (remainingPercentage - (otherOptions.length - index - 1)));
        votes[option] = percentage;
        remainingPercentage -= percentage;
      }
    });
    
    return votes;
  }

  // Use Phone a Friend lifeline
  usePhoneFriend(question: Question): { suggestion: string; confidence: number; message: string } {
    if (!this.canUseLifeline('phoneFriend')) {
      throw new Error('Phone a Friend lifeline already used');
    }

    this.lifelinesUsed.phoneFriend = true;

    // Generate friend's response with some randomness
    const correctAnswer = question.correct_answer;
    const confidence = 60 + Math.random() * 30; // 60-90% confidence
    const isCorrect = Math.random() < (confidence / 100);
    
    const suggestion = isCorrect ? correctAnswer : 
      ['A', 'B', 'C', 'D'].filter(opt => opt !== correctAnswer)[
        Math.floor(Math.random() * 3)
      ];

    const messages = [
      `👋 I think it's probably ${suggestion}) — but I'm only ${Math.round(confidence)}% sure!`,
      `🤔 My gut says ${suggestion}), though I could be wrong. About ${Math.round(confidence)}% confident.`,
      `💭 I'd go with ${suggestion}) if I were you. Feeling ${Math.round(confidence)}% sure about this one.`,
      `🎯 ${suggestion}) sounds right to me! I'm ${Math.round(confidence)}% confident on this.`,
      `✨ I'm leaning towards ${suggestion}). Not 100% sure, but maybe ${Math.round(confidence)}% confident?`,
    ];

    return {
      suggestion,
      confidence: Math.round(confidence),
      message: messages[Math.floor(Math.random() * messages.length)],
    };
  }

  // Mark a lifeline as used
  markAsUsed(type: LifelineType): void {
    this.lifelinesUsed[type] = true;
  }

  // Get current state
  getState(): LifelinesUsed {
    return { ...this.lifelinesUsed };
  }

  // Reset all lifelines
  reset(): void {
    this.lifelinesUsed = {};
  }

  // Get count of used lifelines
  getUsedCount(): number {
    return Object.values(this.lifelinesUsed).filter(Boolean).length;
  }
}