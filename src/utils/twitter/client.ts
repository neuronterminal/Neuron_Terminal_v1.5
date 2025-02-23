import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY || '',
  appSecret: process.env.TWITTER_API_SECRET || '',
  accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
  accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
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
