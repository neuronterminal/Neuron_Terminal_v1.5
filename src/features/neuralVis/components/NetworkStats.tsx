import React from 'react';
import { NetworkStats as Stats } from '../types';

interface NetworkStatsProps {
  stats: Stats;
}

export function NetworkStats({ stats }: NetworkStatsProps) {
  return (
    <div className="space-y-2">
      <h4 className="font-medium">Network Statistics</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="opacity-70">Total Nodes</p>
          <p className="font-medium">{stats.totalNodes}</p>
        </div>
        <div>
          <p className="opacity-70">Total Connections</p>
          <p className="font-medium">{stats.totalConnections}</p>
        </div>
        <div>
          <p className="opacity-70">Avg. Activation</p>
          <p className="font-medium">{stats.averageActivation.toFixed(3)}</p>
        </div>
        <div>
          <p className="opacity-70">Avg. Weight</p>
          <p className="font-medium">{stats.averageWeight.toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
}