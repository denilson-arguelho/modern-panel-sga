export type VoiceGender = 'female' | 'male';

interface SpeechOptions {
  voice?: VoiceGender;
  rate?: number;
  pitch?: number;
  volume?: number;
}

class SpeechService {
  private synth = window.speechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  async speak(text: string, lang: string = 'pt-BR', options: SpeechOptions = {}) {
    return new Promise<void>((resolve, reject) => {
      // Cancel any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      // Select voice based on gender preference
      const voices = this.synth.getVoices();
      const selectedVoice = this.selectVoice(voices, lang, options.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        this.currentUtterance = null;
        reject(new Error(`Speech error: ${event.error}`));
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    });
  }

  async speakSequence(texts: string[], lang: string = 'pt-BR', options: SpeechOptions = {}) {
    for (const text of texts) {
      await this.speak(text, lang, options);
      // Add small delay between phrases
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  async announceTicket(
    ticketNumber: string,
    location: string,
    locationNumber: string,
    lang: string = 'pt-BR',
    voice: VoiceGender = 'female'
  ) {
    const texts = [
      'Senha',
      ...ticketNumber.split(''),
      location,
      locationNumber,
    ];

    await this.speakSequence(texts, lang, { voice });
  }

  private selectVoice(voices: SpeechSynthesisVoice[], lang: string, genderPreference?: VoiceGender) {
    // Filter voices by language
    let langVoices = voices.filter((voice) => voice.lang.startsWith(lang.split('-')[0]));

    if (langVoices.length === 0) {
      // Fallback to any available voice
      langVoices = voices;
    }

    if (!genderPreference) {
      return langVoices[0] || null;
    }

    // Try to find voice matching gender preference
    const genderVoice = langVoices.find((voice) => {
      const name = voice.name.toLowerCase();
      if (genderPreference === 'female') {
        return name.includes('female') || name.includes('woman') || name.includes('mulher');
      } else {
        return name.includes('male') || name.includes('man') || name.includes('homem');
      }
    });

    return genderVoice || langVoices[0] || null;
  }

  stop() {
    this.synth.cancel();
    this.currentUtterance = null;
  }

  getAvailableVoices() {
    return this.synth.getVoices();
  }

  isSpeaking() {
    return this.synth.speaking;
  }
}

export const speechService = new SpeechService();
