import React from 'react';
import { motion } from 'framer-motion';
import { type CodeAnalysis } from '../types';

interface AnalysisPanelProps {
  analysis: CodeAnalysis | null;
  isAnalyzing: boolean;
}

export function AnalysisPanel({ analysis, isAnalyzing }: AnalysisPanelProps) {
  if (isAnalyzing) {
    return (
      <div className="p-4 border border-[#00ff41] rounded-lg">
        <p className="text-[#00ff41]">Analyzing code...</p>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border border-[#00ff41] rounded-lg"
    >
      <h3 className="text-lg font-semibold mb-4">Code Analysis</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Complexity Metrics</h4>
          <ul className="space-y-1">
            <li>Cyclomatic Complexity: {analysis.complexity.cyclomaticComplexity}</li>
            <li>Cognitive Complexity: {analysis.complexity.cognitiveComplexity}</li>
            <li>Lines of Code: {analysis.complexity.linesOfCode}</li>
          </ul>
        </div>

        {analysis.patterns.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Detected Patterns</h4>
            <ul className="space-y-2">
              {analysis.patterns.map((pattern, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-400">⚠️</span>
                  <div>
                    <p className="font-medium">{pattern.type}</p>
                    <p className="text-sm opacity-80">
                      Line {pattern.line}: {pattern.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}