import { useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { embedText } from '../utils/ml/encoder';

export function useContextAnalyzer() {
  const analyzeContext = useCallback(async (text: string) => {
    const embedding = await embedText(text);
    
    // Simple context analysis using TensorFlow.js
    const contextScore = tf.tidy(() => {
      const normalized = tf.norm(embedding).arraySync();
      return normalized as number;
    });

    return {
      relevance: contextScore,
      timestamp: new Date(),
      text
    };
  }, []);

  return { analyzeContext };
}