import React from 'react';
import { NeuralNode } from '../types';
import { getNodeColor } from '../utils/colors';

interface NetworkNodesProps {
  nodes: NeuralNode[];
  selectedNode: string | null;
  showActivations: boolean;
  onNodeSelect: (nodeId: string | null) => void;
}

export function NetworkNodes({ 
  nodes, 
  selectedNode, 
  showActivations,
  onNodeSelect 
}: NetworkNodesProps) {
  return (
    <g>
      {nodes.map(node => (
        <g key={node.id}>
          <circle
            r={12}
            cx={node.x}
            cy={node.y}
            fill={getNodeColor(node.type)}
            stroke="#00ff41"
            strokeWidth={node.id === selectedNode ? 3 : 1}
            style={{ filter: 'url(#glow)' }}
            onClick={(e) => {
              onNodeSelect(node.id === selectedNode ? null : node.id);
              e.stopPropagation();
            }}
          />
          {showActivations && (
            <title>{node.label}\nActivation: {node.activation.toFixed(3)}</title>
          )}
          <text
            x={node.x! + 15}
            y={node.y! + 5}
            fill="#00ff41"
            fontSize="12px"
            fontFamily="monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
    </g>
  );
}