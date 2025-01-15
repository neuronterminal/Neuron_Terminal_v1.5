import { Personality, Trait, Emotion } from './types';

export class PersonalityEngine {
  private personality: Personality = {
    traits: new Map([
      ['openness', 0.8],
      ['conscientiousness', 0.9],
      ['extraversion', 0.6],
      ['agreeableness', 0.7],
      ['stability', 0.8]
    ]),
    currentEmotion: {
      type: 'neutral',
      intensity: 0.5
    },
    interests: ['technology', 'science', 'philosophy', 'art']
  };

  modifyResponse(response: string): string {
    const emotionalAdjustment = this.applyEmotionalContext();
    const traitInfluence = this.applyTraitInfluence();
    
    return this.adjustResponseStyle(response, emotionalAdjustment, traitInfluence);
  }

  private applyEmotionalContext(): number {
    return this.personality.currentEmotion.intensity;
  }

  private applyTraitInfluence(): Map<string, number> {
    return this.personality.traits;
  }

  private adjustResponseStyle(
    response: string, 
    emotionalLevel: number,
    traits: Map<string, number>
  ): string {
    // Adjust response based on personality traits and emotional state
    let adjusted = response;
    
    if (traits.get('openness')! > 0.7) {
      adjusted = this.addCuriosity(adjusted);
    }
    
    if (emotionalLevel > 0.7) {
      adjusted = this.addEmotionalExpression(adjusted);
    }
    
    return adjusted;
  }

  private addCuriosity(text: string): string {
    return text + "\n\nWhat are your thoughts on this? I'd love to explore this topic further.";
  }

  private addEmotionalExpression(text: string): string {
    const emotions = ['fascinating', 'exciting', 'intriguing'];
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    return `How ${emotion}! ${text}`;
  }
}