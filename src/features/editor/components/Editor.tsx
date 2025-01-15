import React from 'react';
import { SimpleCodeEditor } from '../../../components/SimpleCodeEditor';
import { EditorToolbar } from './EditorToolbar';
import type { Language } from '../types';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: Language;
  readOnly?: boolean;
}

export function Editor({
  value,
  onChange,
  language = 'javascript',
  readOnly = false
}: EditorProps) {
  return (
    <div className="rounded-lg border border-matrix-green overflow-hidden">
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