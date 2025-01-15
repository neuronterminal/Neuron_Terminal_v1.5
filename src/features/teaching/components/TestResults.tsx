import React from 'react';
import { motion } from 'framer-motion';

interface TestResult {
  description: string;
  passed: boolean;
  expected?: any;
  received?: any;
  error?: string;
}

interface TestResultsProps {
  results: TestResult[];
}

export function TestResults({ results }: TestResultsProps) {
  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Test Results</h3>
        <span className={`text-sm ${passedTests === totalTests ? 'text-green-400' : 'text-yellow-400'}`}>
          {passedTests}/{totalTests} passed
        </span>
      </div>

      <div className="space-y-2">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${
              result.passed ? 'border-green-400/50 bg-green-400/10' : 'border-yellow-400/50 bg-yellow-400/10'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-sm">{result.description}</span>
              <span className={result.passed ? 'text-green-400' : 'text-yellow-400'}>
                {result.passed ? '✓' : '×'}
              </span>
            </div>
            
            {!result.passed && !result.error && (
              <div className="mt-2 text-sm opacity-80">
                <p>Expected: {JSON.stringify(result.expected)}</p>
                <p>Received: {JSON.stringify(result.received)}</p>
              </div>
            )}
            
            {result.error && (
              <p className="mt-2 text-sm text-red-400">{result.error}</p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}