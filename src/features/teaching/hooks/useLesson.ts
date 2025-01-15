import { useState, useCallback } from 'react';
import { type Lesson, type Exercise, type CodeSubmission } from '../types';
import { analyzeCode } from '../../codeAnalysis/services/analysisService';
import { useCodeExecution } from '../../editor/hooks/useCodeExecution';

export function useLesson(lesson: Lesson) {
  const [currentExercise, setCurrentExercise] = useState<Exercise>(lesson.exercises[0]);
  const [submissions, setSubmissions] = useState<CodeSubmission[]>([]);
  const { runCode } = useCodeExecution();

  const submitCode = useCallback(async (code: string) => {
    try {
      // Run tests
      const testResults = await Promise.all(
        currentExercise.tests.map(test => runCode(code, test))
      );

      // Analyze code quality
      const analysis = await analyzeCode(code);
      
      const submission: CodeSubmission = {
        code,
        timestamp: new Date(),
        analysis,
        passedTests: testResults.filter(r => r.passed).length,
        totalTests: testResults.length
      };

      setSubmissions(prev => [...prev, submission]);

      return {
        submission,
        testResults,
        passed: testResults.every(r => r.passed)
      };
    } catch (error) {
      console.error('Code submission failed:', error);
      throw error;
    }
  }, [currentExercise, runCode]);

  const getHint = useCallback(() => {
    const currentAttempts = submissions.length;
    return currentExercise.hints[Math.min(currentAttempts, currentExercise.hints.length - 1)];
  }, [currentExercise, submissions]);

  return {
    currentExercise,
    submissions,
    submitCode,
    getHint,
    setCurrentExercise
  };
}