export interface Personality {
  traits: Map<string, number>;
  currentEmotion: Emotion;
  interests: string[];
}

export interface Emotion {
  type: 'joy' | 'curiosity' | 'concern' | 'neutral';
  intensity: number;
}

export type Trait = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'stability';