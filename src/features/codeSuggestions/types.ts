import { type Message } from '../../types/chat';

export interface Suggestion {
  id: string;
  content: string;
  type: 'completion' | 'refactor' | 'optimization';
  timestamp: Date;
}

export interface SuggestionContext {
  code: string;
  cursorPosition: number;
  language: string;
}