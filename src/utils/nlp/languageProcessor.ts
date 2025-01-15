import { KnowledgeGraph } from './knowledgeGraph';
import { ConceptLearner } from './conceptLearner';
import { ReasoningEngine } from './reasoningEngine';

export class LanguageProcessor {
  private knowledgeGraph: KnowledgeGraph;
  private conceptLearner: ConceptLearner;
  private reasoningEngine: ReasoningEngine;

  constructor() {
    this.knowledgeGraph = new KnowledgeGraph();
    this.conceptLearner = new ConceptLearner();
    this.reasoningEngine = new ReasoningEngine();
  }

  async processInput(input: string): Promise<{
    concepts: string[];
    sentiment: number;
    topics: string[];
    technicalContent: boolean;
    codeSnippets: string[];
    suggestedResponses: string[];
  }> {
    const concepts = await this.extractConcepts(input);
    const sentiment = this.analyzeSentiment(input);
    const topics = this.identifyTopics(input);
    const technicalContent = this.containsTechnicalContent(input);
    const codeSnippets = this.extractCodeSnippets(input);
    
    const suggestedResponses = await this.generateResponses(
      input,
      concepts,
      sentiment,
      technicalContent
    );

    return {
      concepts,
      sentiment,
      topics,
      technicalContent,
      codeSnippets,
      suggestedResponses
    };
  }

  // ... rest of the methods remain the same, but remove TensorFlow usage
  private async extractConcepts(input: string): Promise<string[]> {
    return input.toLowerCase()
      .split(' ')
      .filter(word => word.length > 3);
  }

  private analyzeSentiment(input: string): number {
    const positive = /(good|great|happy|excellent|wonderful|love)/i;
    const negative = /(bad|terrible|sad|awful|hate|angry)/i;
    
    if (positive.test(input)) return 0.8;
    if (negative.test(input)) return -0.8;
    return 0;
  }
}
