import React from 'react';
import { motion } from 'framer-motion';
import { type CodeAnalysis } from '../../codeAnalysis/types';
import { CodeQualityMetrics } from './CodeQualityMetrics';
import { CodeSuggestions } from './CodeSuggestions';

interface CodeFeedbackProps {
  analysis: CodeAnalysis | null;
}

export function CodeFeedback({ analysis }: CodeFeedbackProps) {
  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold">Code Feedback</h3>
      
      <div className="space-y-4">
        <CodeQualityMetrics complexity={analysis.complexity} />
        <CodeSuggestions patterns={analysis.patterns} />
      </div>
    </motion.div>
  );
}