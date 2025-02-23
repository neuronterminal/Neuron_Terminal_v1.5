import * as tf from '@tensorflow/tfjs';

export class ModelManager {
  private model: tf.Sequential | null = null;

  async initializeModel() {
    try {
      this.model = tf.sequential();
      
      if (!this.model) throw new Error('Failed to create sequential model');
      
      this.model.add(tf.layers.dense({
        units: 64,
        activation: 'relu',
        inputShape: [10]
      }));
      
      this.model.add(tf.layers.dense({
        units: 32,
        activation: 'relu'
      }));
      
      this.model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
      }));

      this.model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
      });
    } catch (error) {
      console.error('Error initializing model:', error);
      throw error;
    }
  }

  async loadModel(path: string) {
    try {
      const loadedModel = await tf.loadLayersModel(path);
      if (loadedModel instanceof tf.Sequential) {
        this.model = loadedModel;
        return true;
      }
      throw new Error('Loaded model is not a Sequential model');
    } catch (error) {
      console.error('Error loading model:', error);
      return false;
    }
  }

  async saveModel(path: string) {
    if (!this.model) throw new Error('Model not initialized');
    await this.model.save(path);
  }

  async predict(input: number[][]) {
    if (!this.model) throw new Error('Model not initialized');
    const tensorInput = tf.tensor2d(input);
    const prediction = this.model.predict(tensorInput) as tf.Tensor;
    const result = await prediction.array();
    tensorInput.dispose();
    prediction.dispose();
    return result;
  }
}

export default new ModelManager();
