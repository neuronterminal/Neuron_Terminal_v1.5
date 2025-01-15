export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  error?: boolean;
}

export interface Intent {
  type: 'question' | 'statement' | 'command' | 'emotion';
  confidence: number;
  original: string;
}

export interface ProcessingContext {
  message: string;
  context: any;
  emotion: any;
  memories: any[];
}