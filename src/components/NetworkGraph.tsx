import React, { useRef, useEffect } from 'react';
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3';
import * as d3 from 'd3';

interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

interface NetworkGraphProps {
  nodes: Node[];
  links: Link[];
}

export function NetworkGraph({ nodes, links }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height].join(' '));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#00ff41')
      .attr('stroke-opacity', 0.6);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', '#00ff41');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x || 0)
        .attr('y1', d => (d.source as Node).y || 0)
        .attr('x2', d => (d.target as Node).x || 0)
        .attr('y2', d => (d.target as Node).y || 0);

      node
        .attr('cx', d => d.x || 0)
        .attr('cy', d => d.y || 0);
    });

    return () => simulation.stop();
  }, [nodes, links]);

  return (
    <svg ref={svgRef} className="w-full h-full" />
  );
}