import { ParsedInput } from '../types/parser';

export function parseInput(text: string): ParsedInput {
  const words = text.toLowerCase().split(' ');
  
  return {
    topics: extractTopics(words),
    verbs: extractVerbs(words),
    nouns: extractNouns(words),
    sentiment: 0,
    questions: text.endsWith('?') ? [text] : [],
    statements: text.endsWith('?') ? [] : [text],
    tense: 'present',
    isQuestion: text.endsWith('?'),
    isNegative: words.some(w => ['no', 'not', "don't", 'never'].includes(w)),
    entities: extractEntities(text)
  };
}

function extractTopics(words: string[]): string[] {
  return words.filter(w => w.length > 3);
}

function extractVerbs(words: string[]): any[] {
  return [];
}

function extractNouns(words: string[]): any[] {
  return [];
}

function extractEntities(text: string): any[] {
  return [];
}
