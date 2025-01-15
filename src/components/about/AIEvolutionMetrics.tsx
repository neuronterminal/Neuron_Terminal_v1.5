import React from 'react';
import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: number;
  maxValue: number;
}

interface AIEvolutionMetricsProps {
  metrics: Metric[];
}

export function AIEvolutionMetrics({ metrics }: AIEvolutionMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 border border-[#00ff41] rounded-lg bg-[#0d0208]/50"
        >
          <div className="text-sm mb-2">{metric.label}</div>
          <div className="relative h-2 bg-[#00ff41]/20 rounded">
            <motion.div
              className="absolute left-0 top-0 h-full bg-[#00ff41] rounded"
              initial={{ width: 0 }}
              animate={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="text-right text-sm mt-1">
            {Math.round(metric.value)} / {metric.maxValue}
          </div>
        </motion.div>
      ))}
    </div>
  );
}