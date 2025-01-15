import React from 'react';
import { getNodeColor } from '../utils/colors';

export function NetworkLegend() {
  const nodeTypes = [
    { type: 'input', label: 'Input Layer' },
    { type: 'hidden', label: 'Hidden Layer' },
    { type: 'output', label: 'Output Layer' }
  ] as const;

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Legend</h4>
      <div className="flex flex-col gap-2">
        {nodeTypes.map(({ type, label }) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getNodeColor(type) }}
            />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}