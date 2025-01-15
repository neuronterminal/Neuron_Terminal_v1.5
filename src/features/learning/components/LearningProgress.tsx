import React from 'react';
import { AnimatedContainer } from '../../../components/AnimatedContainer';
import { LineChart } from '../../visualization/components/LineChart';

interface LearningMetrics {
  accuracy: number[];
  comprehension: number[];
  timestamps: string[];
}

interface LearningProgressProps {
  metrics: LearningMetrics;
}

export function LearningProgress({ metrics }: LearningProgressProps) {
  const chartData = {
    labels: metrics.timestamps,
    datasets: [
      {
        label: 'Accuracy',
        data: metrics.accuracy,
        borderColor: '#00ff41',
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Comprehension',
        data: metrics.comprehension,
        borderColor: '#41ff00',
        backgroundColor: 'rgba(65, 255, 0, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <AnimatedContainer className="p-4 border border-matrix-green rounded-lg bg-matrix-dark/90">
      <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
      <div className="h-[200px]">
        <LineChart data={chartData} />
      </div>
    </AnimatedContainer>
  );
}