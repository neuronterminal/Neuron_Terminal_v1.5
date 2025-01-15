import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AIEvolutionMetrics } from './AIEvolutionMetrics';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  synapses: number;
  type: 'input' | 'hidden' | 'output';
  activity: number;
}

export function EnhancedAIEvolution() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState([
    { label: 'Neural Connections', value: 0, maxValue: 1000 },
    { label: 'Learning Rate', value: 0, maxValue: 100 },
    { label: 'Pattern Recognition', value: 0, maxValue: 100 },
    { label: 'Response Accuracy', value: 0, maxValue: 100 }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: Node[] = [];
    const numNodes = 30;

    // Create nodes with different types
    for (let i = 0; i < numNodes; i++) {
      const type = i < 8 ? 'input' : i >= numNodes - 4 ? 'output' : 'hidden';
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: type === 'hidden' ? 3 : 4,
        synapses: 0,
        type,
        activity: 0
      });
    }

    let frame = 0;
    let evolutionProgress = 0;

    function updateMetrics() {
      evolutionProgress += 0.1;
      const progress = Math.min(evolutionProgress, 100);
      
      setMetrics([
        { 
          label: 'Neural Connections', 
          value: Math.min(100 + progress * 9, 1000), 
          maxValue: 1000 
        },
        { 
          label: 'Learning Rate', 
          value: 50 + Math.sin(evolutionProgress / 10) * 20 + progress / 2,
          maxValue: 100 
        },
        { 
          label: 'Pattern Recognition', 
          value: Math.min(40 + progress * 0.6, 100),
          maxValue: 100 
        },
        { 
          label: 'Response Accuracy', 
          value: Math.min(30 + progress * 0.7, 100),
          maxValue: 100 
        }
      ]);
    }

    function animate() {
      ctx.fillStyle = 'rgba(13, 2, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Update activity
        node.activity = Math.sin(frame * 0.05 + i * 0.5) * 0.5 + 0.5;

        // Draw connections
        nodes.forEach((other, j) => {
          if (i === j) return;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const strength = (1 - distance / 100) * node.activity * other.activity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 65, ${strength * 0.5})`;
            ctx.lineWidth = strength * 2;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.fillStyle = node.type === 'input' 
          ? '#41ffca' 
          : node.type === 'output' 
            ? '#41ff41' 
            : '#41ff8c';
        ctx.arc(node.x, node.y, node.radius + node.activity * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      if (frame % 60 === 0) updateMetrics();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div>
      <AIEvolutionMetrics metrics={metrics} />
      <canvas 
        ref={canvasRef} 
        className="w-full h-[400px] rounded-lg border border-[#00ff41]"
      />
      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
        <div className="flex items-center gap-2 justify-center">
          <span className="w-3 h-3 rounded-full bg-[#41ffca]" />
          Input Nodes
        </div>
        <div className="flex items-center gap-2 justify-center">
          <span className="w-3 h-3 rounded-full bg-[#41ff8c]" />
          Hidden Nodes
        </div>
        <div className="flex items-center gap-2 justify-center">
          <span className="w-3 h-3 rounded-full bg-[#41ff41]" />
          Output Nodes
        </div>
      </div>
    </div>
  );
}