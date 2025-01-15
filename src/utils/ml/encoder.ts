import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

let model: use.UniversalSentenceEncoder | null = null;

// Skip TensorFlow in production
const isProd = import.meta.env.PROD;

export async function loadModel(): Promise<use.UniversalSentenceEncoder | null> {
  if (isProd) return null;
  if (!model) {
    model = await use.load();
  }
  return model;
}

export async function embedText(text: string): Promise<number[] | tf.Tensor> {
  if (isProd) {
    // Return mock embedding in production
    return new Array(512).fill(0).map(() => Math.random());
  }
  const model = await loadModel();
  if (!model) return [];
  const embeddings = await model.embed([text]);
  return tf.tensor(await embeddings.array());
}

export async function getSimilarity(text1: string, text2: string): Promise<number> {
  if (isProd) {
    // Return mock similarity in production
    return Math.random();
  }
  
  const [embedding1, embedding2] = await Promise.all([
    embedText(text1),
    embedText(text2)
  ]);
  
  if (!tf.isTensor(embedding1) || !tf.isTensor(embedding2)) {
    return 0;
  }

  const similarity = tf.tidy(() => {
    const distance = tf.losses.cosineDistance(embedding1 as tf.Tensor, embedding2 as tf.Tensor, 0);
    return distance.dataSync()[0];
  });
  
  // Clean up tensors
  (embedding1 as tf.Tensor).dispose();
  (embedding2 as tf.Tensor).dispose();
  
  return 1 - similarity;
}
