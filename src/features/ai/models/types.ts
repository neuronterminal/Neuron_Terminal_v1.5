export interface LayerConfig {
  type: 'dense' | 'lstm' | 'attention';
  units: number;
  activation?: string;
}

export interface ModelArchitecture {
  layers: LayerConfig[];
  inputShape: number[];
  outputShape: number[];
}