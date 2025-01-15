import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NetworkGraph } from './NetworkGraph';
import { NetworkControls } from './NetworkControls';
import { NetworkStats } from './NetworkStats';
import { NetworkLegend } from './NetworkLegend';
import { NetworkData } from '../types';
import { calculateNetworkStats } from '../utils/stats';
import { Badge } from '../../../components/Badge';

interface NetworkVisProps {
  data: NetworkData;
}

export function NetworkVis({ data }: NetworkVisProps) {
  const [showWeights, setShowWeights] = useState(true);
  const [showActivations, setShowActivations] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  const stats = calculateNetworkStats(data);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 border border-[#00ff41] rounded-lg bg-[#0d0208]/90"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#00ff41]">Neural Network Visualization</h3>
        <Badge label="Live" variant="success" />
      </div>

      <NetworkControls
        showWeights={showWeights}
        showActivations={showActivations}
        onToggleWeights={() => setShowWeights(!showWeights)}
        onToggleActivations={() => setShowActivations(!showActivations)}
      />

      <div className="relative h-[400px] mb-4 border border-[#00ff41]/20 rounded-lg overflow-hidden">
        <NetworkGraph
          data={data}
          showWeights={showWeights}
          showActivations={showActivations}
          selectedNode={selectedNode}
          onNodeSelect={setSelectedNode}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#00ff41]">
        <NetworkStats stats={stats} />
        <NetworkLegend />
      </div>
    </motion.div>
  );
}