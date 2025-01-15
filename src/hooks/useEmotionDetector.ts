import { useCallback } from "react";
import { analyzeEmotion } from "../utils/emotion/analyzer";
import type { EmotionResult } from "../utils/emotion/types";

export function useEmotionDetector() {
  const detectEmotion = useCallback((text: string): EmotionResult => {
    return analyzeEmotion(text);
  }, []);

  return { detectEmotion };
}