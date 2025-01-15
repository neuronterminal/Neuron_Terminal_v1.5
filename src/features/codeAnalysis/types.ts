export interface CodeComplexity {
  cyclomaticComplexity: number;
  cognitiveComplexity: number;
  linesOfCode: number;
}

export interface PatternMatch {
  type: string;
  line: number;
  description: string;
}

export interface CodeAnalysis {
  complexity: CodeComplexity;
  patterns: PatternMatch[];
  timestamp: Date;
}