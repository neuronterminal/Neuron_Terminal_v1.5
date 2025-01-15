import React from 'react';

interface NetworkControlsProps {
  showWeights: boolean;
  showActivations: boolean;
  onToggleWeights: () => void;
  onToggleActivations: () => void;
}

export function NetworkControls({
  showWeights,
  showActivations,
  onToggleWeights,
  onToggleActivations
}: NetworkControlsProps) {
  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={onToggleWeights}
        className={`matrix-button px-3 py-1 text-sm rounded ${
          showWeights ? 'bg-[#00ff41]/20' : ''
        }`}
      >
        {showWeights ? 'Hide Weights' : 'Show Weights'}
      </button>
      <button
        onClick={onToggleActivations}
        className={`matrix-button px-3 py-1 text-sm rounded ${
          showActivations ? 'bg-[#00ff41]/20' : ''
        }`}
      >
        {showActivations ? 'Hide Activations' : 'Show Activations'}
      </button>
    </div>
  );
}