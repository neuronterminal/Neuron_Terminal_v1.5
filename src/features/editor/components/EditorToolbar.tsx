import React from 'react';
import type { Language } from '../types';

interface EditorToolbarProps {
  language: Language;
  readOnly?: boolean;
}

export function EditorToolbar({ language, readOnly }: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-matrix-dark/50 border-b border-matrix-green/20">
      <div className="flex items-center gap-2">
        <span className="text-sm opacity-70">Language:</span>
        <span className="text-sm font-medium">{language}</span>
      </div>
      {readOnly && (
        <span className="text-sm text-yellow-400">Read Only</span>
      )}
    </div>
  );
}