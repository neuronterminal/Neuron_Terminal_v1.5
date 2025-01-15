import React from 'react';
import { useVoiceInterface } from '../hooks/useVoiceInterface';

interface VoiceButtonProps {
  onMessageInput?: (text: string) => void;
}

export function VoiceButton({ onMessageInput }: VoiceButtonProps) {
  const { startVoiceInput } = useVoiceInterface(onMessageInput);

  return (
    <button
      onClick={startVoiceInput}
      className="matrix-button p-2 rounded-full hover:bg-[#00ff41]/10"
      title="Voice Input"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    </button>
  );
}