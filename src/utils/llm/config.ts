import { LLMConfig } from './types';

export const defaultConfig: LLMConfig = {
  provider: 'anthropic',
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  model: 'claude-3-opus-20240229',
  maxTokens: 1024
};