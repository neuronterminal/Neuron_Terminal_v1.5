import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const distributionData = {
  labels: ['Community Rewards', 'Development Fund', 'Team Allocation', 'Marketing', 'Liquidity Pool'],
  datasets: [
    {
      data: [40, 20, 5, 10, 10],
      backgroundColor: [
        'rgba(0, 255, 65, 0.8)',  // Matrix green
        'rgba(0, 255, 65, 0.6)',
        'rgba(0, 255, 65, 0.4)',
        'rgba(0, 255, 65, 0.3)',
        'rgba(0, 255, 65, 0.2)',
      ],
      borderColor: [
        'rgba(0, 255, 65, 1)',
        'rgba(0, 255, 65, 1)',
        'rgba(0, 255, 65, 1)',
        'rgba(0, 255, 65, 1)',
        'rgba(0, 255, 65, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#00ff41',
        font: {
          family: "'Courier New', monospace",
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `${context.label}: ${context.raw}%`;
        }
      }
    }
  },
};

export function TokenDistributionChart() {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <Pie data={distributionData} options={options} />
    </div>
  );
}