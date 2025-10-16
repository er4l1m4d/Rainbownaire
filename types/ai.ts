export interface AIQuestionPrompt {
  prompt: string;
  category: 'wallets' | 'nfts' | 'security' | 'defi' | 'rainbow';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AIGeneratedQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  category: string;
  difficulty: string;
}

export interface QuestionGenerationRequest {
  count: number;
  category?: string;
  difficulty?: string;
}

export interface QuestionGenerationResponse {
  success: boolean;
  questions: AIGeneratedQuestion[];
  error?: string;
}