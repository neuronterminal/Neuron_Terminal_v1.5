import * as tf from '@tensorflow/tfjs';
import { Intent } from '../../types/agent';
import { embedText } from '../ml/encoder';

export async function analyzeIntent(text: string): Promise<Intent> {
  const embedding = await embedText(text);
  
  // Analyze intent using TensorFlow.js
  const intentScores = tf.tidy(() => {
    const normalized = tf.norm(embedding).arraySync();
    return {
      question: text.endsWith('?') ? 0.8 : 0.2,
      statement: !text.endsWith('?') ? 0.7 : 0.3,
      command: /^(please |could you |would you |can you )/i.test(text) ? 0.9 : 0.1,
      emotion: /(feel|feeling|felt|happy|sad|angry|excited)/i.test(text) ? 0.8 : 0.2
    };
  });

  const highestIntent = Object.entries(intentScores)
    .reduce((a, b) => a[1] > b[1] ? a : b);

  return {
    type: highestIntent[0] as Intent['type'],
    confidence: highestIntent[1],
    original: text
  };
}