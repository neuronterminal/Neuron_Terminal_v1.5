import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Ensure proper resolution of @tensorflow/tfjs
      '@tensorflow/tfjs': require.resolve('@tensorflow/tfjs'),
    },
  },
  optimizeDeps: {
    include: ['@tensorflow/tfjs'], // Include @tensorflow/tfjs for optimization
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          tensorflow: ['@tensorflow/tfjs'], // Ensure tensorflow is split into its own chunk
        },
      },
    },
  },
});
