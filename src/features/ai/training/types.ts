export interface TrainingConfig {
  learningRate: number;
  batchSize: number;
  epochs: number;
  validationSplit: number;
}

export interface ModelMetrics {
  accuracy: number;
  loss: number;
  epoch: number;
}

export interface TrainingData {
  input: number[][];
  output: number[][];
  validation?: {
    input: number[][];
    output: number[][];
  };
}