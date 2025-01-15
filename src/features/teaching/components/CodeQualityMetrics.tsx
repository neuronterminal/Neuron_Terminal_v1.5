import React from 'react';
import { type CodeComplexity } from '../../codeAnalysis/types';

interface CodeQualityMetricsProps {
  complexity: CodeComplexity;
}

export function CodeQualityMetrics({ complexity }: CodeQualityMetricsProps) {
  return (
    <div className="p-3 rounded-lg border border-[#00ff41]/50 bg-[#00ff41]/10">
      <h4 className="font-medium mb-2">Code Quality</h4>
      <ul className="space-y-1 text-sm">
        <li>Complexity: {complexity.cyclomaticComplexity}</li>
        <li>Lines of Code: {complexity.linesOfCode}</li>
      </ul>
    </div>
  );
}