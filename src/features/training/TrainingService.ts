import { Message } from '../../types/chat';
import { DataPreprocessor } from './DataPreprocessor';
import { ModelManager } from './ModelManager';

const DEFAULT_ARCHITECTURE = {
  inputShape: [128],
  outputShape: [64],
  layers: [
    { type: 'dense', units: 256, activation: 'relu' },
    { type: 'dense', units: 128, activation: 'relu' },
    { type: 'dense', units: 64, activation: 'softmax' }
  ]
};

export class TrainingService {
  private preprocessor: DataPreprocessor;
  private modelManager: ModelManager;
  private initialized: boolean = false;

  constructor() {
    this.preprocessor = new DataPreprocessor();
    this.modelManager = new ModelManager();
    this.initialize();
  }

  private async initialize() {
    try {
      await this.modelManager.initialize(DEFAULT_ARCHITECTURE);
      this.initialized = true;
      console.log('Training service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize training service:', error);
    }
  }

  async trainOnMessages(messages: Message[]) {
    if (!this.initialized || messages.length < 2) return;

    try {
      const trainingData = this.preprocessor.processMessages(messages);
      const model = this.modelManager.getModel();
      
      await model.fit(
        tf.tensor2d(trainingData.input),
        tf.tensor2d(trainingData.output),
        {
          epochs: 50,
          batchSize: 32,
          validationSplit: 0.2
        }
      );
    } catch (error) {
      console.error('Error training on messages:', error);
    }
  }

  async generateResponse(context: string): Promise<string | null> {
    if (!this.initialized) {
      console.warn('Training service not initialized');
      return null;
    }

    try {
      const tokens = this.preprocessor.processMessages([{ 
        id: '0',
        role: 'user',
        content: context,
        timestamp: new Date()
      }]);

      const model = this.modelManager.getModel();
      const prediction = await model.predict(tf.tensor2d([tokens.input[0]])) as tf.Tensor;
      
      // For now, return null to fall back to rule-based responses
      // until the model is better trained
      return null;
    } catch (error) {
      console.error('Error generating response:', error);
      return null;
    }
  }
}