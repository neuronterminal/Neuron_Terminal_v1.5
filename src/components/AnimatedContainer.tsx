import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../utils/animations/variants';

interface AnimatedContainerProps {
  children: ReactNode;
  variants?: typeof fadeIn;
  className?: string;
}

export function AnimatedContainer({ 
  children, 
  variants = fadeIn,
  className = ''
}: AnimatedContainerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}