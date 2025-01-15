import React from 'react';
import { SimpleCodeEditor } from '../../../components/SimpleCodeEditor';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ 
  code, 
  language = 'javascript',
  className = ''
}: CodeBlockProps) {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <SimpleCodeEditor
        value={code}
        onChange={() => {}}
        language={language}
        readOnly={true}
      />
    </div>
  );
}