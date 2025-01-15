import * as tf from '@tensorflow/tfjs';
import { ModelArchitecture } from '../ai/models/types';
import { createModel } from '../ai/models/modelFactory';

export class TrainingManager {
  private model: tf.LayersModel | null = null;
  private isTraining: boolean = false;

  async initializeModel(architecture: ModelArchitecture) {
    this.model = await createModel(architecture);
  }

  async train(data: { input: number[][], output: number[][] }) {
    if (!this.model) throw new Error('Model not initialized');
    
    this.isTraining = true;
    try {
      const history = await this.model.fit(
        tf.tensor2d(data.input),
        tf.tensor2d(data.output),
        {
          epochs: 50,
          batchSize: 32,
          validationSplit: 0.2,
          callbacks: {
            onEpochEnd: (epoch, logs) => {
              console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
            }
          }
        }
      );
      return history;
    } finally {
      this.isTraining = false;
    }
  }

  async predict(input: number[]): Promise<number[]> {
    if (!this.model) throw new Error('Model not initialized');
    
    const prediction = await this.model.predict(tf.tensor2d([input])) as tf.Tensor;
    return Array.from(prediction.dataSync());
  }

  async saveModel() {
    if (!this.model) throw new Error('Model not initialized');
    await this.model.save('localstorage://neural-chat-model');
  }

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('localstorage://neural-chat-model');
    } catch (error) {
      console.error('No saved model found');
      return false;
    }
    return true;
  }
}