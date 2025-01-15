import { useState, useCallback } from 'react';
import { Message } from '../types/chat';

interface Memory {
  content: string;
  timestamp: Date;
  relevance: number;
}

export function useMemory() {
  const [memories, setMemories] = useState<Memory[]>([]);

  const addToMemory = useCallback((message: Message) => {
    setMemories(prev => [...prev, {
      content: message.content,
      timestamp: message.timestamp,
      relevance: 1
    }]);
  }, []);

  const getRelevantMemories = useCallback((query: string) => {
    return memories
      .filter(memory => memory.content.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3);
  }, [memories]);

  return {
    addToMemory,
    getRelevantMemories
  };
}