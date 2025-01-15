import { useAtom } from 'jotai';
import { codeAnalysisAtom, isAnalyzingAtom } from '../state/atoms/codeState';
import { useWorker } from './useWorker';

export function useCodeAnalysisWorker() {
  const [, setAnalysis] = useAtom(codeAnalysisAtom);
  const [, setIsAnalyzing] = useAtom(isAnalyzingAtom);

  const { postMessage } = useWorker('/src/workers/codeAnalysis.worker.ts', {
    onMessage: (message) => {
      if (message.type === 'analysis_complete') {
        setAnalysis(message.data);
        setIsAnalyzing(false);
      }
    },
    onError: (error) => {
      console.error('Code analysis worker error:', error);
      setIsAnalyzing(false);
    }
  });

  const analyzeCode = (code: string) => {
    setIsAnalyzing(true);
    postMessage({ code });
  };

  return { analyzeCode };
}