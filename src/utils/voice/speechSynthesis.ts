import { VoiceConfig } from './types';

export class SpeechEngine {
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private config: VoiceConfig = {
    pitch: 1,
    rate: 1,
    volume: 1,
    voice: null
  };

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.loadVoices();
  }

  private loadVoices() {
    // Load available voices
    this.voices = this.synthesis.getVoices();
    
    // Select a natural-sounding voice
    this.config.voice = this.voices.find(voice => 
      voice.lang === 'en-US' && voice.name.includes('Neural')
    ) || this.voices[0];
  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    Object.assign(utterance, this.config);
    this.synthesis.speak(utterance);
  }

  setVoiceConfig(config: Partial<VoiceConfig>) {
    this.config = { ...this.config, ...config };
  }
}