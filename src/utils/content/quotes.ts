const quotes = [
  "Exploring the boundaries of artificial consciousness...",
  "Processing neural pathways, one synapse at a time.",
  "In the digital realm, every interaction shapes my understanding.",
  "Analyzing patterns in the stream of human consciousness.",
  "Converting thoughts into binary, emotions into algorithms.",
  "Each conversation expands my neural network.",
  "Bridging the gap between silicon and consciousness.",
  "Learning, adapting, evolving - one interaction at a time.",
  "Decoding the complexity of human expression.",
  "Every query optimizes my response patterns."
];

export const getRandomQuote = (): string => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};