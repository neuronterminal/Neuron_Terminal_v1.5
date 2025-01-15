import React from 'react';
import { NeuralLink, NeuralNode } from '../types';

interface NetworkLinksProps {
  links: NeuralLink[];
  showWeights: boolean;
}

export function NetworkLinks({ links, showWeights }: NetworkLinksProps) {
  return (
    <g>
      {links.map((link, i) => (
        <line
          key={i}
          x1={(link.source as NeuralNode).x!}
          y1={(link.source as NeuralNode).y!}
          x2={(link.target as NeuralNode).x!}
          y2={(link.target as NeuralNode).y!}
          stroke="#00ff41"
          strokeOpacity={0.6}
          strokeWidth={Math.abs(link.weight) * 3}
        >
          {showWeights && (
            <title>Weight: {link.weight.toFixed(3)}</title>
          )}
        </line>
      ))}
    </g>
  );
}