"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface Node extends d3.SimulationNodeDatum {
  id: string
  group: number
}

interface Link {
  source: string
  target: string
  value: number
}

interface NetworkGraphProps {
  nodes: Node[]
  links: Link[]
  width: number
  height: number
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes, links, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3.forceLink<Node, Link>(links).id((d) => d.id),
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))

    const svg = d3.select(svgRef.current)

    // Clear previous content
    svg.selectAll("*").remove()

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)

    const node = svg.append("g").selectAll("circle").data(nodes).join("circle").attr("r", 5).attr("fill", "#69b3a2")

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x ?? 0)
        .attr("y1", (d) => (d.source as Node).y ?? 0)
        .attr("x2", (d) => (d.target as Node).x ?? 0)
        .attr("y2", (d) => (d.target as Node).y ?? 0)

      node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0)
    })

    return () => simulation.stop()
  }, [nodes, links, width, height])

  return (
    <svg ref={svgRef} width={width} height={height}>
      <defs>
        <marker id="arrow" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,-5L10,0L0,5" fill="#999" />
        </marker>
      </defs>
    </svg>
  )
}

export default NetworkGraph

