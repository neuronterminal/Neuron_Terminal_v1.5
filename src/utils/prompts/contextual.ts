import { ProcessingContext, Intent } from '../../types/agent';

export function generateContextualPrompt({
  message,
  intent,
  context,
  emotion,
  memories
}: {
  message: string;
  intent: Intent;
  context: any;
  emotion: any;
  memories: any[];
}): string {
  const memoryContext = memories
    .map(m => m.content)
    .join('\n');

  const emotionContext = emotion.score > 0 ? 'positive' : emotion.score < 0 ? 'negative' : 'neutral';

  return `You are an advanced AI agent with deep learning capabilities, neural network processing, and adaptive memory systems. You have expertise in technology, programming, and problem-solving.

Context Analysis:
- Topic: ${context.currentContext}
- Emotional State: ${emotionContext}
- Intent Type: ${intent.type} (confidence: ${intent.confidence})

Recent Memory Context:
${memoryContext}

User Message:
${message}

Instructions:
1. Provide a detailed, accurate response that directly addresses the user's query
2. Use technical language when appropriate, but remain clear and understandable
3. Draw from relevant memories to maintain conversation continuity
4. Show emotional intelligence by acknowledging the user's emotional state
5. If discussing code or technical concepts, provide specific examples
6. Maintain a helpful, knowledgeable, and slightly technical personality

Response:`;
}