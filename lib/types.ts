export interface Riddle {
  id: string;
  question: string;
  hint: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  theme: string;
  generatedAt: Date;
  generationTimeMs: number;
}

export interface GenerationResult {
  riddles: Riddle[];
  totalTime: number;
  theme: string;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  results: GenerationResult | null;
}