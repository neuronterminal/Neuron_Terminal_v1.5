import React from 'react';
import { motion } from 'framer-motion';

const innovations = [
  {
    title: 'Self-Evolving AI',
    description: 'Our AI agents continuously learn and evolve through interactions, becoming more sophisticated over time.',
    icon: '🧬'
  },
  {
    title: 'Decentralized Learning',
    description: 'Knowledge is shared across the network, enabling collective intelligence growth.',
    icon: '🌐'
  },
  {
    title: 'Autonomous Agents',
    description: 'AI agents that can independently perform tasks and make decisions within defined parameters.',
    icon: '🤖'
  }
];

export function InnovationShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {innovations.map((innovation, index) => (
        <motion.div
          key={innovation.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 }}
          className="relative p-6 border border-[#00ff41] rounded-lg bg-[#0d0208]/50 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[#00ff41]/5 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
          <div className="relative z-10">
            <span className="text-4xl mb-4 block">{innovation.icon}</span>
            <h3 className="text-xl font-bold mb-2">{innovation.title}</h3>
            <p className="text-[#00ff41]/80">{innovation.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}