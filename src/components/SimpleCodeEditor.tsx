import React from 'react';

interface SimpleCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
}

export function SimpleCodeEditor({ 
  value, 
  onChange, 
  readOnly = false 
}: SimpleCodeEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={readOnly}
      className="w-full h-[400px] bg-[#0d0208] text-[#00ff41] p-4 font-mono text-sm resize-none focus:outline-none border-none"
      spellCheck={false}
    />
  );
}