import React from 'react';
import { LessonView } from '../features/teaching/components/LessonView';

const BEGINNER_LESSONS = [
  {
    id: 'intro-to-programming',
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with JavaScript',
    difficulty: 'beginner',
    language: 'javascript',
    content: 'Start your programming journey with the fundamentals',
    exercises: [
      {
        id: 'hello-world',
        prompt: 'Create your first program that prints "Hello, World!"',
        startingCode: '// Type your code here\n',
        solution: 'console.log("Hello, World!");',
        hints: [
          'Use console.log() to print text',
          'Text needs to be wrapped in quotes',
          'Don\'t forget the semicolon at the end'
        ],
        tests: [
          {
            input: ['console.log("Hello, World!")'],
            expected: 'Hello, World!',
            description: 'Should print Hello, World!'
          }
        ]
      }
    ]
  }
];

export function Learn() {
  return (
    <div className="p-6 rounded-lg border border-[#00ff41] bg-[#0d0208]/90">
      <h1 className="text-2xl font-bold mb-6">Learn to Code</h1>
      <div className="space-y-6">
        <LessonView lesson={BEGINNER_LESSONS[0]} />
      </div>
    </div>
  );
}