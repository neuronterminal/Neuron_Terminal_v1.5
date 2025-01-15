import { useState, useCallback } from 'react';
import { ProcessingContext } from '../types/agent';
import { analyzeIntent } from '../utils/nlp/intentAnalysis';
import { generateContextualPrompt } from '../utils/prompts/contextual';
import { useLLM } from './useLLM';

export function useAgent() {
  const [isThinking, setIsThinking] = useState(false);
  const { generateResponse, currentProvider } = useLLM();

  const processInput = useCallback(async (context: ProcessingContext): Promise<string> => {
    if (!context.message) {
      throw new Error('Empty message received');
    }

    setIsThinking(true);
    try {
      const intent = await analyzeIntent(context.message);
      const prompt = generateContextualPrompt({
        message: context.message,
        intent,
        context: context.context,
        emotion: context.emotion,
        memories: context.memories
      });

      const response = await generateResponse(prompt);
      if (!response?.content) {
        throw new Error('Invalid response from LLM');
      }

      return response.content;
    } catch (error) {
      console.error('Error in agent processing:', error);
      throw error; // Re-throw to be handled by the chat hook
    } finally {
      setIsThinking(false);
    }
  }, [generateResponse]);

  return {
    processInput,
    isThinking,
    currentProvider
  };
}