export function getCustomStyle(theme: 'light' | 'dark') {
  return {
    margin: 0,
    padding: '1rem',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    background: theme === 'dark' ? '#0d0208' : '#f8f9fa'
  };
}