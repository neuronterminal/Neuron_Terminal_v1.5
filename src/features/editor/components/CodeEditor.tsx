import React from 'react';
import { SimpleCodeEditor } from '../../../components/SimpleCodeEditor';
import { EditorToolbar } from './EditorToolbar';
import type { Language } from '../types';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: Language;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language = 'javascript',
  readOnly = false
}: CodeEditorProps) {
  return (
    <div className="rounded-lg border border-[#00ff41] overflow-hidden">
      <EditorToolbar language={language} readOnly={readOnly} />
      <SimpleCodeEditor
        value={value}
        onChange={onChange}
        language={language}
        readOnly={readOnly}
      />
    </div>
  );
}