import { getRandomQuote } from './quotes';
import { getCurrentTime } from '../helpers';

export const generateTweetContent = async (): Promise<string> => {
  const quote = getRandomQuote();
  const time = getCurrentTime();
  
  return `🤖 Neural Network Update - ${time}\n\n${quote}\n\n#AI #NeuralNetwork #Tech`;
};