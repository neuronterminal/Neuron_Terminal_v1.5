import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { defaultChartOptions } from '../config/chartOptions';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension?: number;
      fill?: boolean;
    }>;
  };
  options?: typeof defaultChartOptions;
}

export function LineChart({ data, options = defaultChartOptions }: LineChartProps) {
  return (
    <div className="h-full w-full">
      <Line data={data} options={options} />
    </div>
  );
}