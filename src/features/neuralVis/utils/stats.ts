import { NetworkData, NetworkStats } from '../types';

export function calculateNetworkStats(data: NetworkData): NetworkStats {
  const totalNodes = data.nodes.length;
  const totalConnections = data.links.length;
  
  const averageActivation = data.nodes.reduce(
    (sum, node) => sum + node.activation, 
    0
  ) / totalNodes;
  
  const averageWeight = data.links.reduce(
    (sum, link) => sum + Math.abs(link.weight), 
    0
  ) / totalConnections;

  return {
    totalNodes,
    totalConnections,
    averageActivation,
    averageWeight
  };
}