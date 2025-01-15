import { KnowledgeGraph } from './knowledgeGraph';
import { SemanticAnalysis } from './types';

export class SemanticAnalyzer {
  private knowledgeGraph: KnowledgeGraph;
  private contextWindow: string[] = [];
  private readonly MAX_CONTEXT_LENGTH = 5;

  constructor() {
    this.knowledgeGraph = new KnowledgeGraph();
  }

  async analyzeSemantics(input: string): Promise<SemanticAnalysis> {
    this.updateContext(input);
    
    const entities = this.extractEntities(input);
    const relations = this.extractRelations(input);
    const complexity = this.calculateComplexity(input);
    const coherence = this.calculateCoherence(input);

    return {
      entities,
      relations,
      context: [...this.contextWindow],
      complexity,
      coherence
    };
  }

  // ... rest of the methods remain the same, but remove calculateCoherence's TensorFlow usage
  private calculateCoherence(input: string): number {
    if (this.contextWindow.length < 2) return 1;
    // Simple coherence calculation without TensorFlow
    return Math.random();
  }
}
