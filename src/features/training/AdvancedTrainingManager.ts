import * as tf from '@tensorflow/tfjs';
import { ModelArchitecture } from '../ai/models/types';

export interface TrainingData {
  inputs: number[][] | tf.Tensor;
  outputs: number[][] | tf.Tensor;
}

export class AdvancedTrainingManager {
  private model: tf.Sequential | null = null; // Use Sequential instead of LayersModel
  private conceptModel: tf.Sequential | null = null;
  private isTraining: boolean = false;

  constructor() {
    // Initialize models in constructor or leave to initializeModels
  }

  async initializeModels() {
    // Main language model architecture
    const mainArchitecture: ModelArchitecture = {
      inputShape: [128],
      outputShape: [64],
      layers: [
        { type: 'dense', units: 256, activation: 'relu' },
        { type: 'dense', units: 128, activation: 'relu' },
        { type: 'dense', units: 64, activation: 'softmax' },
      ],
    };

    // Concept understanding model architecture
    const conceptArchitecture: ModelArchitecture = {
      inputShape: [256],
      outputShape: [128],
      layers: [
        { type: 'dense', units: 512, activation: 'relu' },
        { type: 'dense', units: 256, activation: 'relu' },
        { type: 'dense', units: 128, activation: 'sigmoid' },
      ],
    };

    // Assuming createModel returns a tf.Sequential model
    this.model = await this.createModel(mainArchitecture);
    this.conceptModel = await this.createModel(conceptArchitecture);
  }

  // Helper method to create models (temporary, replace with actual createModel import if needed)
  private async createModel(architecture: ModelArchitecture): Promise<tf.Sequential> {
    const model = tf.sequential();
    architecture.layers.forEach((layer, index) => {
      const layerConfig: tf.layers.LayerConfig = {
        units: layer.units,
        activation: layer.activation,
        ...(index === 0 && { inputShape: architecture.inputShape }), // Add inputShape to first layer
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

  // Implement missing methods referenced in errors
  async trainOnDialogue(data: TrainingData) {
    if (!this.model || this.isTraining) return;
    this.isTraining = true;

    const xs = tf.tensor2d(data.inputs as number[][]);
    const ys = tf.tensor2d(data.outputs as number[][]);

    await this.model.fit(xs, ys, {
      epochs: 10,
      batchSize: 32,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
        },
      },
    });

    xs.dispose();
    ys.dispose();
    this.isTraining = false;
  }

  async trainOnConcepts(data: TrainingData) {
    if (!this.conceptModel || this.isTraining) return;
    this.isTraining = true;

    const xs = tf.tensor2d(data.inputs as number[][]);
    const ys = tf.tensor2d(data.outputs as number[][]);

    await this.conceptModel.fit(xs, ys, {
      epochs: 10,
      batchSize: 32,
    });

    xs.dispose();
    ys.dispose();
    this.isTraining = false;
  }

  async saveModels() {
    if (!this.model || !this.conceptModel) return;
    await this.model.save('localstorage://main-model');
    await this.conceptModel.save('localstorage://concept-model');
  }

  async loadModels() {
    this.model = (await tf.loadLayersModel('localstorage://main-model')) as tf.Sequential;
    this.conceptModel = (await tf.loadLayersModel('localstorage://concept-model')) as tf.Sequential;
  }

  getModelWeights(): tf.Tensor[] | null {
    return this.model ? this.model.getWeights() : null;
  }

  setModelWeights(weights: tf.Tensor[]) {
    if (this.model) {
      this.model.setWeights(weights);
    }
  }
}

// Example usage outside class (remove if not needed)
const exampleModel = tf.sequential();
exampleModel.add(tf.layers.dense({ units: 10, inputShape: [10] }));
