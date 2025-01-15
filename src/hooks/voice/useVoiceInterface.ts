import { useNavigate } from 'react-router-dom';
import { useSpeech } from './useSpeech';
import { VOICE_COMMANDS } from './constants';

export function useVoiceInterface(onMessageInput?: (text: string) => void) {
  const navigate = useNavigate();
  const { startListening, speak } = useSpeech();

  const handleVoiceInput = (text: string) => {
    const command = text.toLowerCase();
    
    // Check for navigation commands
    for (const [phrase, route] of Object.entries(VOICE_COMMANDS)) {
      if (command.includes(phrase)) {
        speak(`Navigating to ${phrase.replace('go to ', '')}`);
        navigate(route);
        return;
      }
    }
    
    // If no navigation command found and message handler provided, treat as message
    if (onMessageInput) {
      onMessageInput(text);
    } else {
      speak("Sorry, I didn't recognize that command");
    }
  };

  const startVoiceInput = () => {
    const recognition = startListening();
    if (!recognition) return;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      handleVoiceInput(text);
    };

    recognition.start();
  };

  return { startVoiceInput };
}