import React from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import type { Monaco } from '@monaco-editor/react'; // Import Monaco type for better typing

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
}

export function CodeEditor({ value, onChange, language = 'typescript' }: CodeEditorProps) {
  const handleEditorWillMount = (monaco: Monaco) => {
    // Define custom Matrix-style theme
    monaco.editor.defineTheme('matrix-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '4C9855' }, // Greenish comments
        { token: 'string', foreground: '24FF00' }, // Bright green strings
      ],
      colors: {
        'editor.background': '#0D0208', // Dark background
        'editor.foreground': '#00FF41', // Neon green text
      },
    });
    monaco.editor.setTheme('matrix-dark');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-[400px] rounded-lg overflow-hidden border border-[#00ff41]"
    >
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={onChange}
        theme="matrix-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        beforeMount={handleEditorWillMount} // Moved logic to a named function for clarity
      />
    </motion.div>
  );
}
