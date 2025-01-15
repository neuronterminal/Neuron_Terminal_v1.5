import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
              >
                <Command className="bg-[#0d0208] border border-[#00ff41] rounded-lg shadow-lg overflow-hidden">
                  <Command.Input 
                    placeholder="Type a command or search..."
                    className="w-full p-4 bg-transparent text-[#00ff41] border-b border-[#00ff41]/20 focus:outline-none"
                  />
                  <Command.List className="max-h-[300px] overflow-y-auto p-2">
                    <Command.Empty className="p-2 text-[#00ff41]/50">
                      No results found.
                    </Command.Empty>
                    {/* Add command groups and items here */}
                  </Command.List>
                </Command>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}