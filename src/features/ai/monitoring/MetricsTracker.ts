import { ModelMetrics } from '../training/types';

export class MetricsTracker {
  private metrics: ModelMetrics[] = [];

  addMetrics(metric: ModelMetrics) {
    this.metrics.push(metric);
  }

  getProgress(): number {
    if (this.metrics.length < 2) return 0;
    const recent = this.metrics.slice(-5);
    const avgImprovement = recent.reduce((acc, curr, idx, arr) => {
      if (idx === 0) return acc;
      return acc + (curr.accuracy - arr[idx - 1].accuracy);
    }, 0) / (recent.length - 1);
    
    return avgImprovement;
  }

  shouldStopTraining(): boolean {
    return this.getProgress() < 0.0001;
  }
}