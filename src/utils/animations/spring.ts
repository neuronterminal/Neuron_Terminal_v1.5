// Define reusable spring configurations for consistent animations
export const springs = {
  gentle: {
    type: 'spring',
    stiffness: 170,
    damping: 22,
    mass: 1
  },
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
    mass: 1
  },
  snappy: {
    type: 'spring',
    stiffness: 400,
    damping: 30
  },
  smooth: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 0.5
  }
} as const;

export const easings = {
  smooth: [0.4, 0.0, 0.2, 1],
  smoothOut: [0.0, 0.0, 0.2, 1],
  smoothIn: [0.4, 0.0, 1, 1]
} as const;