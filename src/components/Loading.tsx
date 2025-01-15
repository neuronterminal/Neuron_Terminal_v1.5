import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Loading() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix rain characters
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animationFrame: number;

    function draw() {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(13, 2, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      drops.forEach((drop, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drop * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      animationFrame = requestAnimationFrame(draw);
    }

    draw();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0d0208] z-50">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-[#00ff41] text-2xl font-bold mb-4"
        >
          INITIALIZING NEURAL NETWORK
        </motion.div>
        
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-3 h-3 rounded-full bg-[#00ff41]"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}