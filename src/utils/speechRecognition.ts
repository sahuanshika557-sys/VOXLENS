// Web Speech API Voice Recognition Wrapper with Fallbacks

export interface SpeechRecognitionHandlers {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd: () => void;
  onStart: () => void;
}

export class SpeechRecognitionService {
  private recognition: any = null;
  private isListeningState: boolean = false;
  private isSupportedState: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionClass = 
        (window as any).SpeechRecognition || 
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognitionClass) {
        this.isSupportedState = true;
        try {
          this.recognition = new SpeechRecognitionClass();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;
          this.recognition.lang = 'en-US';
        } catch {
          this.isSupportedState = false;
        }
      }
    }
  }

  public isSupported(): boolean {
    return this.isSupportedState;
  }

  public isListening(): boolean {
    return this.isListeningState;
  }

  public start(handlers: SpeechRecognitionHandlers): boolean {
    if (!this.recognition || !this.isSupportedState) {
      handlers.onError('Web Speech API is not supported in this browser. You can still use preset voice commands or keyboard input.');
      return false;
    }

    try {
      this.recognition.onstart = () => {
        this.isListeningState = true;
        handlers.onStart();
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const text = finalTranscript || interimTranscript;
        handlers.onResult(text, !!finalTranscript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListeningState = false;
        handlers.onError(event.error || 'Microphone capture error');
      };

      this.recognition.onend = () => {
        this.isListeningState = false;
        handlers.onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err: any) {
      this.isListeningState = false;
      handlers.onError(err.message || 'Could not start voice recognition');
      return false;
    }
  }

  public stop(): void {
    if (this.recognition && this.isListeningState) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListeningState = false;
    }
  }
}

export const speechService = new SpeechRecognitionService();
