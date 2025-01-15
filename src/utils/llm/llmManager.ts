import { LLMConfig, LLMProvider, LLMResponse } from './types';
import { generateLocalResponse } from './providers/local';
import { generateTransformersResponse } from './providers/transformers';

const providers: LLMProvider[] = [
  {
    id: 'local',
    name: 'Local Model',
    description: 'Basic pattern-based responses using ELIZA-style processing',
    maxTokens: 100,
    isAvailable: true
  },
  {
    id: 'transformers',
    name: 'TensorFlow.js',
    description: 'Neural network-based responses using TensorFlow.js',
    maxTokens: 200,
    isAvailable: true
  }
];

export class LLMManager {
  private config: LLMConfig;

  constructor(config: LLMConfig = { provider: 'local' }) {
    this.config = config;
  }

  async generateResponse(prompt: string): Promise<LLMResponse> {
    try {
      switch (this.config.provider) {
        case 'transformers':
          return await generateTransformersResponse(prompt);
        case 'local':
        default:
          return await generateLocalResponse(prompt);
      }
    } catch (error) {
      return {
        content: "I apologize, but I encountered an error. Could you please try again?",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  getAvailableProviders(): LLMProvider[] {
    return providers;
  }

  setProvider(providerId: string) {
    if (providers.some(p => p.id === providerId)) {
      this.config.provider = providerId;
    }
  }
}