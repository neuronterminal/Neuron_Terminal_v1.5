import { TestCase } from '../types';

export async function runTests(code: string, tests: TestCase[]) {
  const results = [];
  
  for (const test of tests) {
    try {
      // Create a safe execution environment
      const func = new Function(`
        ${code}
        return console.log;
      `)();

      let output = '';
      const mockConsole = (...args: any[]) => {
        output = args.join(' ');
      };

      func.apply(null, [mockConsole]);

      const passed = output === test.expected;

      results.push({
        description: test.description,
        passed,
        expected: test.expected,
        received: output
      });
    } catch (error) {
      results.push({
        description: test.description,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return results;
}