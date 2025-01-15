import { useState, useCallback } from 'react';
import { Message } from '../types/chat';
import { IntensiveTrainingOrchestrator } from '../features/training/IntensiveTrainingOrchestrator';

export function useIntensiveTraining() {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [orchestrator] = useState(() => new IntensiveTrainingOrchestrator());

  const startIntensiveTraining = useCallback(async (messages: Message[], iterations: number = 10) => {
    setIsTraining(true);
    try {
      await orchestrator.intensiveTraining(messages, iterations);
    } finally {
      setIsTraining(false);
    }
  }, [orchestrator]);

  const generateNewAgent = useCallback(async (baseKnowledge: Message[]) => {
    setIsTraining(true);
    try {
      return await orchestrator.generateNewAgent(baseKnowledge);
    } finally {
      setIsTraining(false);
    }
  }, [orchestrator]);

  return {
    isTraining,
    progress,
    startIntensiveTraining,
    generateNewAgent
  };
}