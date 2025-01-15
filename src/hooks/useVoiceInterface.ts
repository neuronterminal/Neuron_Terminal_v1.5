import { useNavigate } from 'react-router-dom';
import { useSpeech } from './useSpeech';

export function useVoiceInterface(onMessageInput?: (text: string) => void) {
  const navigate = useNavigate();
  const { startListening, speak } = useSpeech();

  const handleVoiceInput = (text: string) => {
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