import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { defaultChartOptions } from '../utils/chartConfig';

interface PerformanceData {
  timestamp: number;
  memory: number;
  cpu: number;
}

interface PerformanceMonitorProps {
  data: PerformanceData[];
}

export function PerformanceMonitor({ data }: PerformanceMonitorProps) {
  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: data.map(d => d.memory),
        borderColor: '#00ff41',
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'CPU Usage (%)',
        data: data.map(d => d.cpu),
        borderColor: '#41ff00',
        backgroundColor: 'rgba(65, 255, 0, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 border border-[#00ff41] rounded-lg bg-[#0d0208]/90"
    >
      <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
      <div className="h-[200px]">
        <Line data={chartData} options={defaultChartOptions} />
      </div>
    </motion.div>
  );
}