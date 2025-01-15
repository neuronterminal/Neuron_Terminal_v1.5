import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  {
    category: 'AI & Machine Learning',
    items: ['TensorFlow.js', 'Neural Networks', 'Natural Language Processing', 'Pattern Recognition']
  },
  {
    category: 'Blockchain',
    items: ['Smart Contracts', 'Decentralized Storage', 'Token Economics', 'Cross-chain Integration']
  },
  {
    category: 'Security',
    items: ['Encryption', 'Secure Key Management', 'Access Control', 'Audit Trails']
  }
];

export function TechnologyStack() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="p-4 border border-[#00ff41] rounded-lg bg-[#0d0208]/50"
        >
          <h3 className="text-lg font-bold mb-3">{tech.category}</h3>
          <ul className="space-y-2">
            {tech.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-[#00ff41]">▹</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}