import React, { useState } from 'react';
import { SimpleCodeEditor } from '../../../components/SimpleCodeEditor';

export function CodePlayground() {
  const [code, setCode] = useState('// Start coding here');

  return (
    <div className="rounded-lg border border-[#00ff41]">
      <SimpleCodeEditor
        value={code}
        onChange={setCode}
        language="javascript"
      />
    </div>
  );
}