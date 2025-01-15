const METRICS_INTERVAL = 1000; // 1 second

let isRunning = false;

function getPerformanceMetrics() {
  return {
    memory: performance.memory?.usedJSHeapSize || 0,
    cpu: Math.random() * 100, // Simulated CPU usage
    fps: calculateFPS(),
    timestamp: Date.now()
  };
}

function calculateFPS() {
  // Simplified FPS calculation
  return Math.floor(60 - Math.random() * 10);
}

function startMonitoring() {
  isRunning = true;
  
  const interval = setInterval(() => {
    if (!isRunning) {
      clearInterval(interval);
      return;
    }
    
    const metrics = getPerformanceMetrics();
    self.postMessage({ type: 'metrics', data: metrics });
  }, METRICS_INTERVAL);
}

self.onmessage = (e: MessageEvent) => {
  const { type } = e.data;
  
  switch (type) {
    case 'start':
      startMonitoring();
      break;
    case 'stop':
      isRunning = false;
      break;
  }
};