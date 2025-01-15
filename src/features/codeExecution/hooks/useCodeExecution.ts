import { useState, useCallback } from 'react';
import { createSandbox } from '../utils/sandbox';

interface ExecutionResult {
  output: string;
  error: string | null;
  duration: number;
}

export function useCodeExecution() {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeCode = useCallback(async (code: string) => {
    setIsExecuting(true);
    const startTime = performance.now();

    try {
      // Create a secure sandbox for code execution
      const sandboxedCode = createSandbox(code);
      const func = new Function(sandboxedCode);
      const { output, result: execResult, error } = func();
      
      if (error) {
        throw new Error(error);
      }

      setResult({
        output: output ? `${output}\n${String(execResult)}` : String(execResult),
        error: null,
        duration: performance.now() - startTime
      });
    } catch (error) {
      setResult({
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: performance.now() - startTime
      });
    } finally {
      setIsExecuting(false);
    }
  }, []);

  return { result, isExecuting, executeCode };
}