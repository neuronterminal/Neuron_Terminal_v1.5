import { KnowledgeGraph } from './knowledgeGraph';

interface Language {
  name: string;
  paradigms: string[];
  features: string[];
  useCases: string[];
  frameworks: string[];
  bestPractices: string[];
}

export class ProgrammingKnowledge {
  private knowledgeGraph: KnowledgeGraph;
  private languages: Map<string, Language> = new Map();

  constructor() {
    this.knowledgeGraph = new KnowledgeGraph();
    this.initializeKnowledge();
  }

  private initializeKnowledge() {
    // Initialize programming languages knowledge
    const languages: Record<string, Language> = {
      javascript: {
        name: 'JavaScript',
        paradigms: ['object-oriented', 'functional', 'event-driven'],
        features: ['first-class functions', 'prototypal inheritance', 'event loop'],
        useCases: ['web development', 'server-side (Node.js)', 'mobile apps'],
        frameworks: ['React', 'Vue', 'Angular', 'Express', 'Next.js'],
        bestPractices: [
          'Use modern ES6+ features',
          'Implement proper error handling',
          'Follow functional programming principles',
          'Use TypeScript for type safety'
        ]
      }
      // ... other languages remain the same
    };

    // Add languages to knowledge graph
    Object.entries(languages).forEach(([key, lang]) => {
      this.languages.set(key, lang);
      
      // Create language node
      const langId = this.knowledgeGraph.addNode(crypto.randomUUID(), {
        type: 'language',
        concept: lang.name,
        data: lang
      });

      // Add features
      lang.features.forEach(feature => {
        const featureId = this.knowledgeGraph.addNode(crypto.randomUUID(), {
          type: 'feature',
          concept: feature
        });
        this.knowledgeGraph.addRelationship(langId, featureId, 'has_feature');
      });

      // Add frameworks
      lang.frameworks.forEach(framework => {
        const frameworkId = this.knowledgeGraph.addNode(crypto.randomUUID(), {
          type: 'framework',
          concept: framework
        });
        this.knowledgeGraph.addRelationship(langId, frameworkId, 'has_framework');
      });
    });
  }

  // ... rest of the class remains the same
}