import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateAnthropicResponse } from '../../../utils/anthropic/client';
import { type Suggestion, type SuggestionContext } from '../types';

export function useCodeSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const requestSuggestions = useCallback(async (context: SuggestionContext) => {
    setIsLoading(true);
    try {
      const prompt = `Given this ${context.language} code:
      
${context.code}

Provide:
1. Code completion suggestions
2. Potential optimizations
3. Best practices recommendations

Keep suggestions concise and focused on improving code quality.`;

      const response = await generateAnthropicResponse(prompt);
      
      const newSuggestion: Suggestion = {
        id: uuidv4(),
        content: response,
        type: 'completion',
        timestamp: new Date()
      };

      setSuggestions(prev => [...prev, newSuggestion]);
    } catch (error) {
      console.error('Failed to get code suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    suggestions,
    isLoading,
    requestSuggestions
  };
}