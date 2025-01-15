import { useEffect } from 'react';
import { TweetScheduler } from '../utils/scheduler/tweetScheduler';

export const useTwitterIntegration = () => {
  useEffect(() => {
    const scheduler = new TweetScheduler();
    
    // Start scheduling tweets
    scheduler.start();

    // Cleanup on unmount
    return () => {
      scheduler.stop();
    };
  }, []);
};