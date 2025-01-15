export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 750,
    easing: 'easeInOutQuart'
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 255, 65, 0.1)'
      },
      ticks: {
        color: '#00ff41'
      }
    },
    x: {
      grid: {
        color: 'rgba(0, 255, 65, 0.1)'
      },
      ticks: {
        color: '#00ff41',
        maxRotation: 0
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#00ff41',
        font: {
          family: "'Courier New', monospace"
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(13, 2, 8, 0.9)',
      borderColor: '#00ff41',
      borderWidth: 1,
      titleColor: '#00ff41',
      bodyColor: '#00ff41',
      titleFont: {
        family: "'Courier New', monospace"
      },
      bodyFont: {
        family: "'Courier New', monospace"
      }
    }
  }
};