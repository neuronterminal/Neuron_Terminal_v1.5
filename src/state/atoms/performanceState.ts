import { atom } from 'jotai';

export interface PerformanceMetrics {
  memory: number;
  cpu: number;
  fps: number;
  timestamp: number;
}

export const performanceMetricsAtom = atom<PerformanceMetrics[]>([]);
export const isProfilingAtom = atom<boolean>(false);