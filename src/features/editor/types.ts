export type Language = 
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'html'
  | 'css';

export interface EditorConfig {
  fontSize: number;
  fontFamily: string;
  lineNumbers: boolean;
  wordWrap: boolean;
  theme: 'light' | 'dark';
}