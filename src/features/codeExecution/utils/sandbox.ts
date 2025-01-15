export function createSandbox(code: string): string {
  return `
    try {
      const console = {
        log: function(...args) {
          window.__sandboxLog.push(args.map(String).join(' '));
        },
        error: function(...args) {
          window.__sandboxLog.push('Error: ' + args.map(String).join(' '));
        }
      };
      
      window.__sandboxLog = [];
      
      const result = (function() {
        ${code}
      })();
      
      return {
        output: window.__sandboxLog.join('\\n'),
        result: result
      };
    } catch (error) {
      return {
        error: error.message
      };
    }
  `;
}