import * as tf from '@tensorflow/tfjs';
import { ModelArchitecture } from '../ai/models/types';

export class TrainingManager {
  private model: tf.Sequential | null = null; // Use Sequential instead of LayersModel
  private isTraining: boolean = false;

  async initializeModel(architecture: ModelArchitecture) {
    this.model = await this.createModel(architecture); // Use internal method or import createModel
  }

  // Temporary createModel implementation (replace with import if available)
  private async createModel(architecture: ModelArchitecture): Promise<tf.Sequential> {
    const model = tf.sequential();
    architecture.layers.forEach((layer, index) => {
      const config: tf.layers.DenseLayerArgs = {
        units: layer.units,
        activation: layer.activation,
        inputShape: index === 0 ? architecture.inputShape : undefined,
      };
      model.add(tf.layers.dense(config));
    });
    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
    return model;
  }

  async train(data: { input: number[][]; output: number[][] }) {
    if (!this.model) throw new Error('Model not initialized');

    this.isTraining = true;
    try {
      const xs = tf.tensor2d(data.input);
      const ys = tf.tensor2d(data.output);

      const history = await this.model.fit(xs, ys, {
        epochs: 50,
        batchSize: 32,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
          },
        },
      });

      xs.dispose();
      ys.dispose();
      return history;
    } finally {
      this.isTraining = false;
    }
  }

  async predict(input: number[]): Promise<number[]> {
    if (!this.model) throw new Error('Model not initialized');

    const inputTensor = tf.tensor2d([input]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const result = Array.from(prediction.dataSync());

    inputTensor.dispose();
    prediction.dispose();
    return result;
  }

  async saveModel() {
    if (!this.model) throw new Error('Model not initialized');
    await this.model.save('localstorage://neural-chat-model');
  }

  async loadModel() {
    try {
      const loadedModel = await tf.loadLayersModel('localstorage://neural-chat-model');
      if (!(loadedModel instanceof tf.Sequential)) {
        throw new Error('Loaded model is not a Sequential model');
      }
      this.model = loadedModel;
      return true;
    } catch (error) {
      console.error('No saved model found:', error);
      return false;
    }
  }
}
