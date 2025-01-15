import * as tf from '@tensorflow/tfjs';
import { TrainingConfig, ModelMetrics, TrainingData } from './types';
import { ModelArchitecture } from '../models/types';
import { createModel } from '../models/modelFactory';

export class TrainingEngine {
  private model: tf.LayersModel | null = null;
  
  async initializeModel(architecture: ModelArchitecture) {
    this.model = await createModel(architecture);
  }

  async train(data: TrainingData, config: TrainingConfig): Promise<ModelMetrics[]> {
    if (!this.model) throw new Error('Model not initialized');

    const metrics: ModelMetrics[] = [];
    
    await this.model.fit(
      tf.tensor2d(data.input),
      tf.tensor2d(data.output),
      {
        epochs: config.epochs,
        batchSize: config.batchSize,
        validationSplit: config.validationSplit,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            metrics.push({
              epoch,
              accuracy: logs?.acc || 0,
              loss: logs?.loss || 0
            });
          }
        }
      }
    );

    return metrics;
  }

  async evaluate(testData: TrainingData): Promise<ModelMetrics> {
    if (!this.model) throw new Error('Model not initialized');
    
    const evaluation = await this.model.evaluate(
      tf.tensor2d(testData.input),
      tf.tensor2d(testData.output)
    ) as tf.Scalar[];

    return {
      epoch: -1,
      loss: evaluation[0].dataSync()[0],
      accuracy: evaluation[1].dataSync()[0]
    };
  }
}