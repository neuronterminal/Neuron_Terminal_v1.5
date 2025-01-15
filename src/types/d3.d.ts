import { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

declare module 'd3' {
  export * from 'd3-selection';
  export * from 'd3-force';
  export * from 'd3-scale';
  export * from 'd3-shape';
  export * from 'd3-array';

  export interface Node extends SimulationNodeDatum {
    id: string;
    x?: number;
    y?: number;
  }

  export interface Link extends SimulationLinkDatum<Node> {
    source: string | Node;
    target: string | Node;
  }
}