import { ChartOptions } from 'chart.js';

declare module 'chart.js' {
  interface ChartOptions {
    animation?: {
      duration?: number;
      easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInOutQuart';
    };
  }
}