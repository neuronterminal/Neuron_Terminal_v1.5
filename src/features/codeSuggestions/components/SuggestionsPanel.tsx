import React from 'react';
import { motion } from 'framer-motion';
import { type Suggestion } from '../types';
import { AnimatedContainer } from '../../../components/AnimatedContainer';
import { SimpleCodeEditor } from '../../../components/SimpleCodeEditor';

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  onApplySuggestion: (suggestion: Suggestion) => void;
}

export function SuggestionsPanel({ 
  suggestions, 
  isLoading,
  onApplySuggestion 
}: SuggestionsPanelProps) {
  if (isLoading) {
    return (
      <div className="p-4 border border-matrix-green rounded-lg">
        <p className="text-matrix-green">Generating suggestions...</p>
      </div>
    );
  }

  return (
    <AnimatedContainer className="p-4 border border-matrix-green rounded-lg">
      <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
      
      <div className="space-y-4">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-sm opacity-70">
                {suggestion.type} - {suggestion.timestamp.toLocaleTimeString()}
              </span>
              <button
                onClick={() => onApplySuggestion(suggestion)}
                className="matrix-button px-2 py-1 text-sm rounded"
              >
                Apply
              </button>
            </div>
            <SimpleCodeEditor
              value={suggestion.content}
              onChange={() => {}}
              language="javascript"
              readOnly={true}
            />
          </div>
        ))}
      </div>
    </AnimatedContainer>
  );
}