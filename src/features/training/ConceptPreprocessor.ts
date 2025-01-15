import * as tf from '@tensorflow/tfjs';
import { Message } from '../../types/chat';

export class ConceptPreprocessor {
  private conceptVocabulary: Map<string, number> = new Map();
  private readonly maxConceptLength = 64;
  private readonly conceptVocabSize = 5000;

  // Concepts related to AI and reproduction
  private readonly aiConcepts = new Set([
    'neural network', 'deep learning', 'machine learning', 'artificial intelligence',
    'training', 'model', 'weights', 'biases', 'optimization', 'backpropagation',
    'reproduction', 'self-improvement', 'evolution', 'adaptation', 'learning',
    'consciousness', 'emergence', 'autonomy', 'intelligence', 'cognition'
  ]);

  processConceptualContent(messages: Message[]) {
    this.buildConceptVocabulary(messages);
    const conceptSequences = this.extractConceptSequences(messages);
    
    return {
      input: conceptSequences.map(seq => this.embedConcepts(seq)),
      output: conceptSequences.map(seq => this.createConceptTarget(seq))
    };
  }

  private buildConceptVocabulary(messages: Message[]) {
    const conceptPhrases = messages
      .map(msg => this.extractAIConcepts(msg.content))
      .flat();

    const phraseFreq = new Map<string, number>();
    conceptPhrases.forEach(phrase => {
      phraseFreq.set(phrase, (phraseFreq.get(phrase) || 0) + 1);
    });

    Array.from(phraseFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, this.conceptVocabSize - 1)
      .forEach(([phrase], idx) => {
        this.conceptVocabulary.set(phrase, idx + 1);
      });
  }

  private extractAIConcepts(text: string): string[] {
    const concepts: string[] = [];
    const words = text.toLowerCase().split(/\s+/);
    
    // Single word concepts
    words.forEach(word => {
      if (this.aiConcepts.has(word)) {
        concepts.push(word);
      }
    });

    // Multi-word concepts
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = words.slice(i, i + 2).join(' ');
      if (this.aiConcepts.has(phrase)) {
        concepts.push(phrase);
      }
    }

    return concepts;
  }

  private extractConceptSequences(messages: Message[]): string[][] {
    return messages.map(msg => this.extractAIConcepts(msg.content));
  }

  private embedConcepts(concepts: string[]): number[] {
    const embedded = concepts
      .map(concept => this.conceptVocabulary.get(concept) || 0)
      .slice(0, this.maxConceptLength);

    return [
      ...embedded,
      ...Array(this.maxConceptLength - embedded.length).fill(0)
    ];
  }

  private createConceptTarget(concepts: string[]): number[] {
    const target = new Array(this.conceptVocabSize).fill(0);
    concepts.forEach(concept => {
      const idx = this.conceptVocabulary.get(concept);
      if (idx !== undefined) {
        target[idx] = 1;
      }
    });
    return target;
  }
}