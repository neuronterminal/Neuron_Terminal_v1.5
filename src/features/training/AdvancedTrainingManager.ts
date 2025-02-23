import * as tf from '@tensorflow/tfjs';

export interface TrainingData {
  inputs: number[][] | tf.Tensor2D; // Use tf.Tensor2D instead of tf.Tensor
  outputs: number[][] | tf.Tensor2D;
}

export class AdvancedTrainingManager {
  private model: tf.Sequential | null = null;
  private conceptModel: tf.Sequential | null = null;

  constructor() {}

  async initializeModels() {
    const mainArchitecture = {
      inputShape: [128],
      outputShape: [64],
      layers: [
        { type: 'dense', units: 256, activation: 'relu' },
        { type: 'dense', units: 128, activation: 'relu' },
        { type: 'dense', units: 64, activation: 'softmax' },
      ],
    };

    const conceptArchitecture = {
      inputShape: [256],
      outputShape: [128],
      layers: [
        { type: 'dense', units: 512, activation: 'relu' },
        { type: 'dense', units: 256, activation: 'relu' },
        { type: 'dense', units: 128, activation: 'sigmoid' },
      ],
    };

    this.model = await this.createModel(mainArchitecture);
    this.conceptModel = await this.createModel(conceptArchitecture);
  }

  private async createModel(architecture: any): Promise<tf.Sequential> {
    const model = tf.sequential();
    architecture.layers.forEach((layer: any, index: number) => {
      const layerConfig: tf.layers.DenseLayerArgs = {
        units: layer.units,
        activation: layer.activation,
        ...(index === 0 && { inputShape: architecture.inputShape }),
      };
      model.add(tf.layers.dense(layerConfig));
    });
    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
    return model;
  }

  async trainOnDialogue(data: TrainingData) {
    if (!this.model) return;
    const xs = tf.tensor2d(data.inputs as number[][]);
    const ys = tf.tensor2d(data.outputs as number[][]);
    await this.model.fit(xs, ys, { epochs: 10, batchSize: 32 });
    xs.dispose();
    ys.dispose();
  }

  async trainOnConcepts(data: TrainingData) {
    if (!this.conceptModel) return;
    const xs = tf.tensor2d(data.inputs as number[][]);
    const ys = tf.tensor2d(data.outputs as number[][]);
    await this.conceptModel.fit(xs, ys, { epochs: 10, batchSize: 32 });
    xs.dispose();
    ys.dispose();
  }

  async saveModels() {
    if (this.model) await this.model.save('localstorage://main-model');
    if (this.conceptModel) await this.conceptModel.save('localstorage://concept-model');
  }

  async loadModels() {
    this.model = await tf.loadLayersModel('localstorage://main-model') as tf.Sequential;
    this.conceptModel = await tf.loadLayersModel('localstorage://concept-model') as tf.Sequential;
  }

  getModelWeights(): tf.Tensor[] | null {
    return this.model ? this.model.getWeights() : null;
  }

  setModelWeights(weights: tf.Tensor[]) {
    if (this.model) this.model.setWeights(weights);
  }
}
