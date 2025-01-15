import { analyzeCodeComplexity } from '../features/codeAnalysis/utils/complexity';
import { detectPatterns } from '../features/codeAnalysis/utils/patterns';

self.onmessage = async (e: MessageEvent) => {
  const { code } = e.data;
  
  try {
    const complexity = await analyzeCodeComplexity(code);
    const patterns = await detectPatterns(code);
    
    self.postMessage({
      type: 'analysis_complete',
      data: { complexity, patterns }
    });
  } catch (error) {
    self.postMessage({
      type: 'analysis_error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};