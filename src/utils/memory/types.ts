export type MemoryType = 'conversation' | 'fact' | 'skill' | 'experience';

export interface Memory {
  id: string;
  content: string;
  type: MemoryType;
  embedding: number[];
  timestamp: Date;
  accessCount: number;
  lastAccessed: Date | null;
}