import { useState, useCallback } from 'react';
import { executeCode } from '../services/executionService';
import { TestCase } from '../../teaching/types';

export function useCodeExecution() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runCode = useCallback(async (code: string, test: TestCase) => {
    setIsExecuting(true);
    try {
      const executionResult = await executeCode(code, test);
      setResult(executionResult);
      return executionResult;
    } catch (error) {
      console.error('Code execution failed:', error);
      throw error;
    } finally {
      setIsExecuting(false);
    }
  }, []);

  return {
    isExecuting,
    result,
    runCode
  };
}