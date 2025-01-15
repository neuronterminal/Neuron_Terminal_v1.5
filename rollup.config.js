// rollup.config.js

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js', // Your entry file, adjust based on your project structure
  output: {
    file: 'dist/bundle.js', // Output file where your bundle will be saved
    format: 'iife', // You can use 'esm' for ES modules or 'cjs' for CommonJS
    name: 'MyProject', // Global variable name for the bundle in a browser environment
  },
  plugins: [
    resolve(), // Resolves node_modules
    commonjs(), // Converts CommonJS to ES6
    terser() // Minifies for production
  ],
  watch: {
    include: 'src/**', // Files to watch for changes
  },
};
