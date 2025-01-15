import * as tf from '@tensorflow/tfjs';
import { ModelArchitecture, LayerConfig } from './types';

export async function createModel(architecture: ModelArchitecture): Promise<tf.LayersModel> {
  const model = tf.sequential();
  
  architecture.layers.forEach((layer, index) => {
    const config: tf.LayerArgs = {
      units: layer.units,
      activation: layer.activation || 'relu'
    };

    if (index === 0) {
      // Reshape input for LSTM layers
      if (layer.type === 'lstm') {
        config.inputShape = [1, ...architecture.inputShape];
        config.returnSequences = true;
      } else {
        config.inputShape = architecture.inputShape;
      }
    }

    switch (layer.type) {
      case 'dense':
        model.add(tf.layers.dense(config));
        break;
      case 'lstm':
        // Add reshape layer before LSTM if needed
        if (index > 0) {
          model.add(tf.layers.reshape({ targetShape: [1, layer.units] }));
        }
        model.add(tf.layers.lstm(config));
        break;
      case 'attention':
        model.add(createAttentionLayer(config));
        break;
    }
  });

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'meanSquaredError',
    metrics: ['accuracy']
  });

  return model;
}

function createAttentionLayer(config: tf.LayerArgs): tf.layers.Layer {
  return tf.layers.dense({
    ...config,
    activation: 'softmax'
  });
}