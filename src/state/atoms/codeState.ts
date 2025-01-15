import { atom } from 'jotai';
import { type CodeAnalysis } from '../../features/codeAnalysis/types';
import { type Suggestion } from '../../features/codeSuggestions/types';

export const codeAtom = atom<string>('');
export const codeAnalysisAtom = atom<CodeAnalysis | null>(null);
export const suggestionsAtom = atom<Suggestion[]>([]);
export const isAnalyzingAtom = atom<boolean>(false);
export const isExecutingAtom = atom<boolean>(false);