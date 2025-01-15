import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface TransitionLayoutProps {
  children: ReactNode;
}

export function TransitionLayout({ children }: TransitionLayoutProps) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}