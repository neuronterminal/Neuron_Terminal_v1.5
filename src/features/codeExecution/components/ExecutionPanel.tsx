import React from 'react';
import { motion } from 'framer-motion';

interface ExecutionPanelProps {
  result: {
    output: string;
    error: string | null;
    duration: number;
  } | null;
  isExecuting: boolean;
  onExecute: () => void;
}

export function ExecutionPanel({ result, isExecuting, onExecute }: ExecutionPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border border-[#00ff41] rounded-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Execution Result</h3>
        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="matrix-button px-4 py-2 rounded-lg"
        >
          {isExecuting ? 'Executing...' : 'Run Code'}
        </button>
      </div>

      {result && (
        <div className="space-y-2">
          {result.error ? (
            <div className="text-red-400">
              <p className="font-medium">Error:</p>
              <pre className="text-sm">{result.error}</pre>
            </div>
          ) : (
            <div>
              <p className="font-medium">Output:</p>
              <pre className="text-sm text-[#00ff41]">{result.output}</pre>
            </div>
          )}
          <p className="text-sm opacity-70">
            Execution time: {result.duration.toFixed(2)}ms
          </p>
        </div>
      )}
    </motion.div>
  );
}