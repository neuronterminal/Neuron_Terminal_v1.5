import { sendTweet } from '../twitter/client';
import { generateTweetContent } from '../content/tweetGenerator';

export class TweetScheduler {
  private interval: number = 3600000; // 1 hour in milliseconds
  private timer: NodeJS.Timeout | null = null;

  start() {
    if (this.timer) return;
    
    this.scheduleTweet();
    this.timer = setInterval(() => this.scheduleTweet(), this.interval);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async scheduleTweet() {
    const content = await generateTweetContent();
    await sendTweet(content);
  }
}