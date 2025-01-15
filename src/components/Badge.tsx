import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'border-[#00ff41] text-[#00ff41]',
    success: 'border-green-400 text-green-400',
    warning: 'border-yellow-400 text-yellow-400',
    error: 'border-red-400 text-red-400'
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center px-2 py-0.5 text-xs border rounded-full ${variants[variant]}`}
    >
      {label}
    </motion.span>
  );
}