import { LLMResponse } from '../types';
import { generateElizaResponse } from '../../eliza/elizaCore';
import { analyzeEmotion } from '../../nlp/sentiment';

export async function generateLocalResponse(prompt: string): Promise<LLMResponse> {
  try {
    // Get base response from ELIZA
    const elizaResponse = generateElizaResponse(prompt);
    
    // Analyze emotion to add emotional context
    const emotion = analyzeEmotion(prompt);
    
    // Add emotional awareness to response if strong emotion detected
    let response = elizaResponse;
    if (Math.abs(emotion.score) > 0.5) {
      const emotionPrefix = emotion.score > 0 
        ? "I sense your positive feelings. "
        : "I understand this might be challenging. ";
      response = emotionPrefix + response;
    }

    return { content: response };
  } catch (error) {
    console.error('Local LLM error:', error);
    return {
      content: "I apologize, but I encountered an error. Could you please try again?",
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}