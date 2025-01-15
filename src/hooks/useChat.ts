import { useState, useCallback } from "react";
import { generateId } from "../utils/id/generateId";
import { Message } from "../types/chat";
import { generateGeminiResponse } from "../utils/gemini/client";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([{
    id: generateId(),
    role: 'agent',
    content: "Neural network initialized. How may I assist you today?",
    timestamp: new Date()
  }]);
  const [isThinking, setIsThinking] = useState(false);
  const [isReady] = useState(true);

  const processMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsThinking(true);

    try {
      // Handle common greetings and queries
      let response: string;
      const lowerContent = content.toLowerCase();

      if (lowerContent === 'hey' || lowerContent === 'hello' || lowerContent === 'hi') {
        response = "Hello! I'm your AI assistant. How can I help you today?";
      } else if (lowerContent === 'how are you') {
        response = "I'm functioning optimally, thank you for asking! How are you doing?";
      } else if (lowerContent === 'whats the time' || lowerContent === "what's the time") {
        response = `The current time is ${new Date().toLocaleTimeString()}.`;
      } else {
        // For other queries, use Gemini
        const prompt = `You are an advanced AI assistant with neural network capabilities. 
                       Previous conversation context: ${messages.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n')}
                       
                       User message: ${content}
                       
                       Provide a helpful and natural response while maintaining a slightly technical personality.`;
        
        response = await generateGeminiResponse(prompt);
      }

      const agentMessage: Message = {
        id: generateId(),
        role: 'agent',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: generateId(),
        role: 'agent',
        content: "I apologize, but I encountered an error. Could you please try again?",
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  }, [messages]);

  return {
    messages,
    processMessage,
    isReady,
    isThinking
  };
}