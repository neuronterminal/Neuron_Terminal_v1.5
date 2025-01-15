import { LLMConfig, LLMResponse } from '../types';

export class AnthropicProvider {
  constructor(config: LLMConfig) {}

  async generateResponse(prompt: string): Promise<LLMResponse> {
    return {
      content: "I apologize, but I encountered an error processing your request. Could you please try again?",
      error: "Anthropic API not available"
    };
  }
}
