const CODE_PATTERNS = {
  MEMORY_LEAK: /setInterval|setTimeout(?!\s*\([^)]*clearTimeout)/,
  NESTED_CALLBACKS: /callback.*callback|promise.*then.*then/,
  LARGE_FUNCTION: /function.*?\{[\s\S]{500,}\}/,
  MAGIC_NUMBERS: /(?<![\w\d.])[0-9]+(?![\w\d.])/g
};

export async function detectPatterns(code: string): Promise<PatternMatch[]> {
  const patterns: PatternMatch[] = [];
  const lines = code.split('\n');

  Object.entries(CODE_PATTERNS).forEach(([type, pattern]) => {
    lines.forEach((line, index) => {
      if (pattern.test(line)) {
        patterns.push({
          type,
          line: index + 1,
          description: getPatternDescription(type)
        });
      }
    });
  });

  return patterns;
}

function getPatternDescription(type: string): string {
  const descriptions: Record<string, string> = {
    MEMORY_LEAK: 'Potential memory leak detected',
    NESTED_CALLBACKS: 'Nested callbacks may lead to callback hell',
    LARGE_FUNCTION: 'Function is too large, consider breaking it down',
    MAGIC_NUMBERS: 'Magic number detected, consider using named constants'
  };

  return descriptions[type] || 'Pattern detected';
}