import { useEffect, useRef, useCallback } from 'react';

interface WorkerMessage {
  type: string;
  data?: any;
  error?: string;
}

interface UseWorkerOptions {
  onMessage?: (message: WorkerMessage) => void;
  onError?: (error: ErrorEvent) => void;
}

export function useWorker(
  workerPath: string,
  options: UseWorkerOptions = {}
) {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(workerPath, { type: 'module' });

    workerRef.current.onmessage = (e: MessageEvent<WorkerMessage>) => {
      options.onMessage?.(e.data);
    };

    workerRef.current.onerror = (e: ErrorEvent) => {
      options.onError?.(e);
    };

    return () => workerRef.current?.terminate();
  }, [workerPath]);

  const postMessage = useCallback((message: any) => {
    workerRef.current?.postMessage(message);
  }, []);

  return { postMessage };
}