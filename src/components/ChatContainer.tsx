import React, { ReactNode } from 'react';

interface ChatContainerProps {
  children: ReactNode;
}

export function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="w-full max-w-2xl rounded-lg p-4 md:p-6 bg-[#0d0208]/90 border border-[#00ff41] flex flex-col min-h-[600px] relative z-10">
      {children}
    </div>
  );
}