import { useState, useCallback } from 'react';
import { LLMManager } from '../utils/llm/llmManager';
import { LLMProvider } from '../utils/llm/types';

export function useLLM() {
  const [llmManager] = useState(() => new LLMManager());
  const [currentProvider, setCurrentProvider] = useState<string>('local');
  const [isProcessing, setIsProcessing] = useState(false);

  const generateResponse = useCallback(async (prompt: string) => {
    setIsProcessing(true);
    try {
      const response = await llmManager.generateResponse(prompt);
      return response;
    } finally {
      setIsProcessing(false);
    }
  }, [llmManager]);

  const changeProvider = useCallback((providerId: string) => {
    llmManager.setProvider(providerId);
    setCurrentProvider(providerId);
  }, [llmManager]);

  const getProviders = useCallback((): LLMProvider[] => {
    return llmManager.getAvailableProviders();
  }, [llmManager]);

  return {
    generateResponse,
    changeProvider,
    getProviders,
    currentProvider,
    isProcessing
  };
}