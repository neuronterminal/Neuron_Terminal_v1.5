import { TestCase } from '../../teaching/types';

export async function executeCode(code: string, test: TestCase) {
  try {
    // Create a sandboxed environment
    const sandbox = `
      let output = '';
      const console = {
        log: (...args) => {
          output = args.join(' ');
        }
      };
      
      try {
        ${code}
      } catch (e) {
        return { error: e.message };
      }
      
      return { output };
    `;

    const result = new Function(sandbox)();
    
    if (result.error) {
      return {
        passed: false,
        error: result.error,
        output: null
      };
    }

    return {
      passed: result.output === test.expected,
      output: result.output,
      error: null
    };
  } catch (error) {
    return {
      passed: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      output: null
    };
  }
}