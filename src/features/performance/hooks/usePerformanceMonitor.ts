import { useState, useEffect } from 'react';

interface PerformanceData {
  timestamp: number;
  memory: number;
  cpu: number;
}

export function usePerformanceMonitor() {
  const [data, setData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate performance metrics
      setData(prev => [...prev, {
        timestamp: Date.now(),
        memory: Math.random() * 100,
        cpu: Math.random() * 100
      }].slice(-20)); // Keep last 20 data points
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return data;
}