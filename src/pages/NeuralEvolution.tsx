import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedAIEvolution } from '../components/about/EnhancedAIEvolution';

export function NeuralEvolution() {
  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border border-[#00ff41] rounded-lg bg-[#0d0208]/90"
      >
        <h2 className="text-2xl font-bold mb-4">Neural Evolution</h2>
        <p className="text-lg mb-6">
          Watch our AI system evolve in real-time, developing new neural pathways and improving its cognitive capabilities through continuous learning and adaptation.
        </p>
        <EnhancedAIEvolution />
      </motion.section>
    </div>
  );
}