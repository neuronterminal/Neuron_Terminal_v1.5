import * as tf from '@tensorflow/tfjs';
import { ModelArchitecture } from '../ai/models/types';

export class ModelManager {
  private model: tf.Sequential | null = null; // Use Sequential instead of LayersModel

  async initialize(architecture: ModelArchitecture): Promise<void> {
    try {
      // Try to load existing model first
      this.model = await this.loadModel();
    } catch (error) {
      console.log('No existing model found, creating new one:', error);
      // Create new model if none exists
      this.model = await this.createModel(architecture);
      // Save initial model
      await this.saveModel();
    }
  }

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
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    return model;
  }

  private async loadModel(): Promise<tf.Sequential> {
    const loadedModel = await tf.loadLayersModel('localstorage://neural-chat-model');
    if (!(loadedModel instanceof tf.Sequential)) {
      throw new Error('Loaded model is not a Sequential model');
    }
    return loadedModel;
  }

  private async saveModel(): Promise<void> {
    if (!this.model) throw new Error('No model to save');
    await this.model.save('localstorage://neural-chat-model');
  }

  getModel(): tf.Sequential {
    if (!this.model) throw new Error('Model not initialized');
    return this.model;
  }
}
