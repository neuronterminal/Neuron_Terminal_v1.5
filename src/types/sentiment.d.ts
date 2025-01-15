declare module 'sentiment' {
  interface Analysis {
    score: number;
    comparative: number;
    tokens: string[];
    words: string[];
    positive: string[];
    negative: string[];
  }

  class Sentiment {
    analyze(text: string): Analysis;
  }

  export = Sentiment;
}