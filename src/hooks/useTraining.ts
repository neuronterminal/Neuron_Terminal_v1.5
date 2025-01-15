import { useState, useCallback } from 'react';
import { TrainingManager } from '../features/training/TrainingManager';
import { ModelArchitecture } from '../features/ai/models/types';

const defaultArchitecture: ModelArchitecture = {
  inputShape: [128],
  outputShape: [64],
  layers: [
    { type: 'dense', units: 256, activation: 'relu' },
    { type: 'dense', units: 128, activation: 'relu' },
    { type: 'dense', units: 64, activation: 'softmax' }
  ]
};

export function useTraining() {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingManager] = useState(() => new TrainingManager());

  const startTraining = useCallback(async (data: { input: number[][], output: number[][] }) => {
    setIsTraining(true);
    try {
      await trainingManager.initializeModel(defaultArchitecture);
      const history = await trainingManager.train(data);
      await trainingManager.saveModel();
      return history;
    } finally {
      setIsTraining(false);
    }
  }, [trainingManager]);

  const predict = useCallback(async (input: number[]) => {
    return trainingManager.predict(input);
  }, [trainingManager]);

  return {
    isTraining,
    startTraining,
    predict
  };
}