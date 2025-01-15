import { useAtom } from 'jotai';
import { performanceMetricsAtom, isProfilingAtom } from '../state/atoms/performanceState';
import { useWorker } from './useWorker';

export function usePerformanceWorker() {
  const [, setMetrics] = useAtom(performanceMetricsAtom);
  const [isProfiling, setIsProfiling] = useAtom(isProfilingAtom);

  const { postMessage } = useWorker('/src/workers/performance.worker.ts', {
    onMessage: (message) => {
      if (message.type === 'metrics') {
        setMetrics((prev) => [...prev.slice(-19), message.data]);
      }
    }
  });

  const startProfiling = () => {
    setIsProfiling(true);
    postMessage({ type: 'start' });
  };

  const stopProfiling = () => {
    setIsProfiling(false);
    postMessage({ type: 'stop' });
  };

  return {
    isProfiling,
    startProfiling,
    stopProfiling
  };
}