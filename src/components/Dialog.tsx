import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from './Spinner';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  loading?: boolean;
}

export function Dialog({ isOpen, onClose, title, children, loading }: DialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-6 bg-[#0d0208] border border-[#00ff41] rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button onClick={onClose} className="text-[#00ff41] hover:opacity-80">
                ✕
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : (
              children
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}