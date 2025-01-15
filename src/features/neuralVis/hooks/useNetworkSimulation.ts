import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NetworkData, NeuralNode, NeuralLink } from '../types';

export function useNetworkSimulation(
  data: NetworkData,
  width: number,
  height: number
) {
  const simulationRef = useRef<d3.Simulation<NeuralNode, NeuralLink> | null>(null);

  useEffect(() => {
    simulationRef.current = d3.forceSimulation<NeuralNode>(data.nodes)
      .force('link', d3.forceLink<NeuralNode, NeuralLink>(data.links)
        .id(d => d.id)
        .distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    return () => {
      simulationRef.current?.stop();
    };
  }, [data, width, height]);

  return simulationRef.current;
}