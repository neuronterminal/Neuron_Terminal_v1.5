export interface LLMResponse {
  content: string;
  error?: string;
}

export interface LLMConfig {
  provider: string;
  apiKey: string;
  model: string;
  maxTokens: number;
}

export interface LLMProvider {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  isAvailable: boolean;
}

export interface LLMError extends Error {
  status?: number;
  type?: string;
}