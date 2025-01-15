import { useState, useEffect } from 'react';

export function useLearningMetrics() {
  const [metrics, setMetrics] = useState({
    accuracy: [] as number[],
    comprehension: [] as number[],
    timestamps: [] as string[]
  });

  useEffect(() => {
    // Simulate learning metrics data
    const interval = setInterval(() => {
      setMetrics(prev => {
        const now = new Date().toLocaleTimeString();
        return {
          accuracy: [...prev.accuracy, 75 + Math.random() * 20].slice(-10),
          comprehension: [...prev.comprehension, 80 + Math.random() * 15].slice(-10),
          timestamps: [...prev.timestamps, now].slice(-10)
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}