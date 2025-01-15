import { CodeAnalysis } from '../codeAnalysis/types';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  content: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  prompt: string;
  startingCode: string;
  solution: string;
  hints: string[];
  tests: TestCase[];
}

export interface TestCase {
  input: any[];
  expected: any;
  description: string;
}

export interface CodeSubmission {
  code: string;
  timestamp: Date;
  analysis: CodeAnalysis;
  passedTests: number;
  totalTests: number;
}