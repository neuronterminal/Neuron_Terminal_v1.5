import { AnthropicProvider } from './providers/anthropic';
import { defaultConfig } from './config';
import type { LLMResponse, LLMConfig } from './types';

export class LLMClient {
  private provider: AnthropicProvider;

  constructor(config: Partial<LLMConfig> = {}) {
    const finalConfig = { ...defaultConfig, ...config };
    this.provider = new AnthropicProvider(finalConfig);
  }

  async generateResponse(prompt: string): Promise<LLMResponse> {
    return this.provider.generateResponse(prompt);
  }
}

// Export a singleton instance
export const llmClient = new LLMClient();