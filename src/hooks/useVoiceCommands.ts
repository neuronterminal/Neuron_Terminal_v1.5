import { useNavigate } from 'react-router-dom';
import { useSpeech } from './useSpeech';

const COMMANDS = {
  'go to team': '/team',
  'show team': '/team',
  'go to tokenomics': '/tokenomics',
  'show tokenomics': '/tokenomics',
  'go to roadmap': '/roadmap',
  'show roadmap': '/roadmap',
  'go home': '/',
  'go to chat': '/',
};

export function useVoiceCommands() {
  const navigate = useNavigate();
  const { startListening, speak } = useSpeech();

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    for (const [phrase, route] of Object.entries(COMMANDS)) {
      if (command.includes(phrase)) {
        speak(`Navigating to ${phrase.replace('go to ', '')}`);
        navigate(route);
        return;
      }
    }
    
    speak("Sorry, I didn't recognize that command");
  };

  const listenForCommand = () => {
    const recognition = startListening();
    if (!recognition) return;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      handleVoiceCommand(text);
    };

    recognition.start();
  };

  return { listenForCommand };
}