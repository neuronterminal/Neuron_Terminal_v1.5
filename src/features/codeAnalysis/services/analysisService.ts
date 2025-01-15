import { CodeAnalysis } from '../types';

export async function analyzeCode(code: string): Promise<CodeAnalysis> {
  try {
    const lines = code.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim().length > 0);

    return {
      complexity: {
        cyclomaticComplexity: 1,
        cognitiveComplexity: 1,
        linesOfCode: nonEmptyLines.length
      },
      patterns: [],
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Code analysis failed:', error);
    throw error;
  }
}