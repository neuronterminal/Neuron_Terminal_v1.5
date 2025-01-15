import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function UnlockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const bootSequence = [
    { text: '> Initializing Neural Interface...', delay: 400 },
    { text: '> Loading core modules...', delay: 600 },
    { text: '> Establishing neural pathways...', delay: 800 },
    { text: '> Neural network initialized. Launching...', delay: 1000 },
  ];

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;

    const typeCharacter = () => {
      if (currentIndex >= bootSequence.length) {
        setTimeout(() => {
          onUnlock();
          navigate('/');
        }, 500);
        return;
      }

      const currentCommand = bootSequence[currentIndex];
      const text = currentCommand.text;

      if (charIndex < text.length) {
        setCurrentLine(prev => prev + text[charIndex]);
        charIndex++;
        setTimeout(typeCharacter, 20);
      } else {
        setLines(prev => [...prev, text]);
        setCurrentLine('');
        charIndex = 0;
        currentIndex++;
        setTimeout(typeCharacter, currentCommand.delay);
      }
    };

    setTimeout(typeCharacter, 300);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  return (
    <div className="fixed inset-0 bg-[#0d0208] flex items-center justify-center p-4 z-50">
      <div 
        ref={containerRef}
        className="w-full max-w-2xl h-[60vh] bg-[#0d0208] border border-[#00ff41] p-4 rounded-lg overflow-y-auto font-mono text-sm md:text-base"
      >
        <div className="text-[#00ff41] whitespace-pre-wrap">
          {lines.map((line, i) => (
            <div key={i} className="mb-2">{line}</div>
          ))}
          <div className="flex">
            <span>{currentLine}</span>
            {showCursor && <span className="ml-1 animate-pulse">█</span>}
          </div>
        </div>
      </div>
    </div>
  );
}