import * as tf from '@tensorflow/tfjs';
import { ModelArchitecture } from '../ai/models/types';

export class ModelManager {
  private model: tf.LayersModel | null = null;
  
  async initialize(architecture: ModelArchitecture): Promise<void> {
    try {
      // Try to load existing model first
      this.model = await this.loadModel();
    } catch (error) {
      // Create new model if none exists
      this.model = await this.createModel(architecture);
      // Save initial model
      await this.saveModel();
    }
  }

  private async createModel(architecture: ModelArchitecture): Promise<tf.LayersModel> {
    const model = tf.sequential();
    
    architecture.layers.forEach((layer, index) => {
      const config: tf.LayerArgs = {
        units: layer.units,
        activation: layer.activation,
        inputShape: index === 0 ? architecture.inputShape : undefined
      };
      
      model.add(tf.layers.dense(config));
    });

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  private async loadModel(): Promise<tf.LayersModel> {
    return await tf.loadLayersModel('localstorage://neural-chat-model');
  }

  private async saveModel(): Promise<void> {
    if (!this.model) throw new Error('No model to save');
    await this.model.save('localstorage://neural-chat-model');
  }

  getModel(): tf.LayersModel {
    if (!this.model) throw new Error('Model not initialized');
    return this.model;
  }
}