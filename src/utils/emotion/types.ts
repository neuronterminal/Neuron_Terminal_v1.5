export interface EmotionAnalysis {
  score: number;
  comparative: number;
  tokens: string[];
  positive: string[];
  negative: string[];
}

export interface EmotionResult {
  type: 'positive' | 'negative' | 'neutral';
  score: number;
  details: EmotionAnalysis;
}