import Anthropic from '@anthropic-ai/sdk';
import { LLMConfig, LLMResponse, LLMError } from '../types';

export class AnthropicProvider {
  private client: Anthropic;
  private config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
    this.client = new Anthropic({
      apiKey: config.apiKey
    });
  }

  async generateResponse(prompt: string): Promise<LLMResponse> {
    try {
      const message = await this.client.messages.create({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        messages: [{
          role: 'user',
          content: prompt
        }],
        system: `You are an advanced AI agent with deep learning capabilities, neural network processing, and adaptive memory systems. You have expertise in technology, programming, and problem-solving. Maintain a helpful, knowledgeable, and slightly technical personality.`
      });

      if (!message.content?.[0]?.text) {
        throw new Error('Invalid response format from Anthropic API');
      }

      return { content: message.content[0].text };
    } catch (error) {
      const llmError = error as LLMError;
      console.error('Anthropic API error:', llmError);
      return {
        content: "I apologize, but I encountered an error processing your request. Could you please try again?",
        error: llmError.message
      };
    }
  }
}