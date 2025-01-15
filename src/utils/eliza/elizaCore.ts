import { patterns } from './patterns';
import { REFLECTION_PRONOUNS } from './constants';

export function generateElizaResponse(input: string): string {
  const processedInput = preprocess(input);
  const [pattern, match] = findMatch(processedInput);
  const response = pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
  return transformResponse(response, match);
}

function preprocess(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s']/g, '')
    .trim();
}

function findMatch(input: string): [typeof patterns[0], RegExpMatchArray | null] {
  let bestMatch: [typeof patterns[0], RegExpMatchArray | null] | null = null;
  let highestPriority = -1;

  for (const pattern of patterns) {
    const match = input.match(pattern.pattern);
    if (match && (!bestMatch || (pattern.priority || 0) > highestPriority)) {
      bestMatch = [pattern, match];
      highestPriority = pattern.priority || 0;
    }
  }

  return bestMatch || [patterns[patterns.length - 1], null];
}

function transformResponse(response: string, match: RegExpMatchArray | null): string {
  if (!match) return response;

  let transformed = response;
  for (let i = 1; i < match.length; i++) {
    if (match[i]) {
      const replacement = match[i].trim();
      const reflected = reflectPronouns(replacement);
      transformed = transformed.replace(`%${i}`, reflected);
    }
  }
  
  return transformed;
}

function reflectPronouns(text: string): string {
  let reflected = text.toLowerCase();
  
  // Sort by length to handle longer phrases first
  const phrases = Object.keys(REFLECTION_PRONOUNS).sort((a, b) => b.length - a.length);
  
  for (const phrase of phrases) {
    const replacement = REFLECTION_PRONOUNS[phrase as keyof typeof REFLECTION_PRONOUNS];
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    reflected = reflected.replace(regex, replacement);
  }
  
  return reflected;
}