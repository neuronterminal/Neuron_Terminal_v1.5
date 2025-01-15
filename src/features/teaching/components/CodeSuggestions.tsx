import React from 'react';
import { type PatternMatch } from '../../codeAnalysis/types';

interface CodeSuggestionsProps {
  patterns: PatternMatch[];
}

export function CodeSuggestions({ patterns }: CodeSuggestionsProps) {
  if (patterns.length === 0) return null;

  return (
    <div className="p-3 rounded-lg border border-[#00ff41]/50 bg-[#00ff41]/10">
      <h4 className="font-medium mb-2">Suggestions</h4>
      <ul className="space-y-2 text-sm">
        {patterns.map((pattern, index) => (
          <li key={index} className="flex items-start gap-2">
            <span>•</span>
            <span>{pattern.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}