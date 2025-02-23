import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
  x?: number;
  y?: number;
}

interface Link {
  source: Node;
  target: Node;
  value: number;
}

const NetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Sample data
    const nodes: Node[] = [
      { id: "Node 1", group: 1 },
      { id: "Node 2", group: 1 },
      { id: "Node 3", group: 2 },
      { id: "Node 4", group: 2 }
    ];

    const links: Link[] = [
      { source: nodes[0], target: nodes[1], value: 1 },
      { source: nodes[1], target: nodes[2], value: 1 },
      { source: nodes[2], target: nodes[3], value: 1 }
    ];

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", "#69b3a2");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x || 0)
        .attr("y1", d => d.source.y || 0)
        .attr("x2", d => d.target.x || 0)
        .attr("y2", d => d.target.y || 0);

      node
        .attr("cx", d => d.x || 0)
        .attr("cy", d => d.y || 0);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <svg ref={svgRef} className="network-graph"></svg>
  );
};

export default NetworkGraph;
