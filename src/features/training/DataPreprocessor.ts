import * as tf from '@tensorflow/tfjs';
import { Message } from '../../types/chat';

export class DataPreprocessor {
  private vocabulary: Map<string, number> = new Map();
  private readonly maxSequenceLength = 128;
  private readonly vocabSize = 10000;

  processMessages(messages: Message[]): { input: number[][], output: number[][] } {
    this.buildVocabulary(messages);
    
    const sequences = messages.map(msg => this.tokenize(msg.content));
    const paddedSequences = this.padSequences(sequences);
    
    // Create input/output pairs for training
    const input = paddedSequences.slice(0, -1);
    const output = paddedSequences.slice(1);
    
    return {
      input,
      output: output.map(seq => this.oneHotEncode(seq[0]))
    };
  }

  private buildVocabulary(messages: Message[]) {
    const words = messages
      .map(msg => msg.content.toLowerCase().split(/\s+/))
      .flat();

    const wordFreq = new Map<string, number>();
    words.forEach(word => {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    });

    // Sort by frequency and take top N words
    const sortedWords = Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, this.vocabSize - 1); // Reserve 0 for padding

    sortedWords.forEach(([word], idx) => {
      this.vocabulary.set(word, idx + 1);
    });
  }

  private tokenize(text: string): number[] {
    return text
      .toLowerCase()
      .split(/\s+/)
      .map(word => this.vocabulary.get(word) || 0);
  }

  private padSequences(sequences: number[][]): number[][] {
    return sequences.map(seq => {
      if (seq.length >= this.maxSequenceLength) {
        return seq.slice(0, this.maxSequenceLength);
      }
      return [
        ...seq,
        ...Array(this.maxSequenceLength - seq.length).fill(0)
      ];
    });
  }

  private oneHotEncode(value: number): number[] {
    const encoded = new Array(this.vocabSize).fill(0);
    encoded[value] = 1;
    return encoded;
  }
}