// Web Audio API Synthesized Industrial UI Chimes & Web Speech Synthesis

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private speechEnabled: boolean = true;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    // Lazy initialize AudioContext on user interaction
  }

  private getAudioContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public toggleSound(enable?: boolean): boolean {
    this.soundEnabled = enable !== undefined ? enable : !this.soundEnabled;
    return this.soundEnabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggleSpeech(enable?: boolean): boolean {
    this.speechEnabled = enable !== undefined ? enable : !this.speechEnabled;
    if (!this.speechEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    return this.speechEnabled;
  }

  public isSpeechEnabled(): boolean {
    return this.speechEnabled;
  }

  // Chime 1: Voice Listening Activated
  public playMicOn(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Audio context silenced or blocked
    }
  }

  // Chime 2: Computer Vision Scanning Radar Ping
  public playScanPing(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.25);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  // Chime 3: Safety Gate Alert
  public playAlert(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [580, 440].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.12;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.11);
      });
    } catch {}
  }

  // Chime 4: Success / Approval / Ticket Created
  public playSuccess(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + i * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.06, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.24);
      });
    } catch {}
  }

  // Chime 5: Cinematic Whoosh / Sweep
  public playCinematicSweep(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 0.35);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.04, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch {}
  }

  // Chime 6: Multimodal Fusion Harmonic Chime
  public playFusionHum(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Tri-chord representing Voice (F#4), Vision (A#4), Knowledge (C#5) fusing to (F#5)
      const frequencies = [369.99, 466.16, 554.37, 739.99];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.001, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.04, now + idx * 0.05 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + 0.65);
      });
    } catch {}
  }

  // Chime 7: RAG Document Data Scan
  public playDataScan(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const time = now + i * 0.06;

        osc.type = 'square';
        osc.frequency.setValueAtTime(800 + i * 200, time);

        gain.gain.setValueAtTime(0.015, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.045);
      }
    } catch {}
  }

  // Chime 8: Step Tick
  public playStepTick(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  public playSuccessFanfare(): void {
    this.playSuccess();
  }

  public playFusionHarmonic(): void {
    this.playFusionHum();
  }


  // Text-To-Speech with Flexible Locale and Callbacks
  public speak(
    text: string, 
    localeOrOnStart?: string | (() => void), 
    onStartOrEnd?: () => void, 
    onEnd?: () => void
  ): void {
    let locale = 'en-US';
    let onStartCallback: (() => void) | undefined;
    let onEndCallback: (() => void) | undefined;

    if (typeof localeOrOnStart === 'string') {
      locale = localeOrOnStart;
      onStartCallback = onStartOrEnd;
      onEndCallback = onEnd;
    } else if (typeof localeOrOnStart === 'function') {
      onStartCallback = localeOrOnStart;
      onEndCallback = onStartOrEnd;
    }

    if (!this.speechEnabled || typeof window === 'undefined' || !window.speechSynthesis) {
      if (onStartCallback) onStartCallback();
      setTimeout(() => {
        if (onEndCallback) onEndCallback();
      }, Math.min(3000, Math.max(1000, text.length * 40)));
      return;
    }

    try {
      window.speechSynthesis.cancel();
      // Clean up text for clearer speech
      const cleanText = text
        .replace(/[*_#`~]/g, '')
        .replace(/\b([A-Z])([0-9]+)\b/g, '$1 $2')
        .slice(0, 350); // Keep speech crisp and concise

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = locale;
      utterance.rate = locale.startsWith('hi') ? 0.95 : 1.02;
      utterance.pitch = 0.98;

      const voices = window.speechSynthesis.getVoices();
      const langPrefix = locale.split('-')[0].toLowerCase();
      
      // Preferred voices matching the exact locale or language prefix
      const preferredVoice = voices.find(v => v.lang.toLowerCase() === locale.toLowerCase()) ||
        voices.find(v => v.lang.toLowerCase().startsWith(langPrefix)) ||
        voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        if (onStartCallback) onStartCallback();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        this.currentUtterance = null;
        if (onEndCallback) onEndCallback();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onStartCallback) onStartCallback();
      if (onEndCallback) onEndCallback();
    }
  }

  public stopSpeaking(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }
}

export const soundEngine = new SoundEngine();

