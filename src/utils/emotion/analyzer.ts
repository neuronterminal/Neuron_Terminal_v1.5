import Sentiment from 'sentiment';
import { EmotionAnalysis, EmotionResult } from './types';

const sentiment = new Sentiment();

export function analyzeEmotion(text: string): EmotionResult {
  const analysis: EmotionAnalysis = sentiment.analyze(text);
  
  return {
    type: analysis.score > 0 ? 'positive' : analysis.score < 0 ? 'negative' : 'neutral',
    score: analysis.score,
    details: analysis
  };
}