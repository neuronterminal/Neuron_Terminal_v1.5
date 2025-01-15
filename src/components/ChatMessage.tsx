import React from 'react';
import { Message } from '../types/chat';
import { formatDate } from '../utils/helpers';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAgent = message.role === 'agent';
  
  return (
    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'} mb-4`}>
      <div 
        className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 md:p-3 message-bubble ${
          isAgent ? '' : 'user'
        }`}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <span className="text-xs opacity-70 mt-1 block">
          {formatDate(message.timestamp)}
        </span>
      </div>
    </div>
  );
}