export function getNodeColor(type: 'input' | 'hidden' | 'output'): string {
  const colors = {
    input: '#41ffca',   // Cyan
    hidden: '#41ff8c',  // Green
    output: '#41ff41'   // Bright Green
  };
  return colors[type];
}