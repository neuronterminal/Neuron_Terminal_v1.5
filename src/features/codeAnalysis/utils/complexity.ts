export async function analyzeCodeComplexity(code: string) {
  const lines = code.split('\n');
  
  return {
    cyclomaticComplexity: calculateCyclomaticComplexity(code),
    cognitiveComplexity: calculateCognitiveComplexity(code),
    linesOfCode: lines.length
  };
}

function calculateCyclomaticComplexity(code: string): number {
  const controlFlowKeywords = [
    'if', 'else', 'while', 'for', 'case', '&&', '||', '?', 'catch'
  ];
  
  return controlFlowKeywords.reduce((complexity, keyword) => {
    const matches = code.match(new RegExp(`\\b${keyword}\\b`, 'g'));
    return complexity + (matches?.length || 0);
  }, 1);
}

function calculateCognitiveComplexity(code: string): number {
  // Basic implementation - can be enhanced
  const nestedStructures = code.match(/{[^{}]*{/g)?.length || 0;
  const controlFlow = calculateCyclomaticComplexity(code);
  
  return nestedStructures + controlFlow;
}