import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  appKey: import.meta.env.VITE_TWITTER_API_KEY,
  appSecret: import.meta.env.VITE_TWITTER_API_SECRET,
  accessToken: import.meta.env.VITE_TWITTER_ACCESS_TOKEN,
  accessSecret: import.meta.env.VITE_TWITTER_ACCESS_SECRET,
});

export const sendTweet = async (content: string): Promise<boolean> => {
  try {
    await twitterClient.v2.tweet(content);
    return true;
  } catch (error) {
    console.error('Error sending tweet:', error);
    return false;
  }
};