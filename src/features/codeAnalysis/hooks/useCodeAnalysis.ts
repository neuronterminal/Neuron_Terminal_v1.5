import { useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { analyzeCodeComplexity } from '../utils/complexity';
import { detectPatterns } from '../utils/patterns';
import { type CodeAnalysis } from '../types';

export function useCodeAnalysis() {
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = useCallback(async (code: string) => {
    setIsAnalyzing(true);
    try {
      const complexity = await analyzeCodeComplexity(code);
      const patterns = await detectPatterns(code);
      
      setAnalysis({
        complexity,
        patterns,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Code analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return { analysis, isAnalyzing, analyzeCode };
}