import React, { useState } from 'react';
import { SimpleCodeEditor } from '../components/SimpleCodeEditor';

export function Workspace() {
  const [code, setCode] = useState('// Start coding here...');

  return (
    <div className="p-6 rounded-lg border border-[#00ff41] bg-[#0d0208]/90">
      <h1 className="text-2xl font-bold mb-6">Workspace</h1>
      <SimpleCodeEditor 
        value={code}
        onChange={setCode}
        language="javascript"
      />
    </div>
  );
}