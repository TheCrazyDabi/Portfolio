/**
 * Ambient Sound Service: Procedural Soothing Cherry Blossom & Spider Lily Zen Ambience
 * 
 * Uses Web Audio API to procedurally generate a calming, organic Japanese garden soundscape:
 * 1. Warm spring breeze (filtered pink noise with gentle LFO drift)
 * 2. Traditional Japanese Insen / Sakura pentatonic koto and singing chime tones
 * 3. Occasional delicate crystalline glass wind chimes (Furin)
 * 
 * 100% offline, zero external audio asset dependencies, zero bandwidth, zero CORS issues.
 */

class AmbientSoundService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private breezeGain: GainNode | null = null;
  private chimeTimer: ReturnType<typeof setTimeout> | null = null;
  private furinTimer: ReturnType<typeof setTimeout> | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private lfo: OscillatorNode | null = null;

  private playing: boolean = false;
  private volume: number = 0.4; // 0.0 to 1.0 (default 40% soothing level)
  private listeners: Array<(isPlaying: boolean, volume: number) => void> = [];

  // Japanese Insen & Sakura Pentatonic Scale Frequencies (Hz)
  // Serene, reflective, traditional Zen garden tonality
  private readonly notes = [
    220.00, // A3
    233.08, // Bb3
    293.66, // D4
    329.63, // E4
    349.23, // F4
    440.00, // A4
    466.16, // Bb4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    698.46, // F5
    880.00, // A5
  ];

  constructor() {
    const savedVol = localStorage.getItem('portfolio_ambient_volume');
    if (savedVol !== null) {
      this.volume = parseFloat(savedVol) || 0.4;
    }
  }

  private initAudio() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  // Generate 6-second seamless loop of warm pink noise (cherry blossom wind)
  private createBreezeBuffer(): AudioBuffer {
    if (!this.ctx) throw new Error('AudioContext not initialized');
    const bufferSize = this.ctx.sampleRate * 6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  private startBreeze() {
    if (!this.ctx || !this.masterGain) return;

    try {
      const buffer = this.createBreezeBuffer();
      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = buffer;
      this.noiseSource.loop = true;

      // Lowpass filter for warm, rustling wind breeze
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      filter.Q.setValueAtTime(0.7, this.ctx.currentTime);

      // LFO modulation to simulate wind breeze gusts
      this.lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // slow breath (12.5s cycle)
      lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
      this.lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      this.lfo.start();

      this.breezeGain = this.ctx.createGain();
      this.breezeGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      this.noiseSource.connect(filter);
      filter.connect(this.breezeGain);
      this.breezeGain.connect(this.masterGain);
      this.noiseSource.start();
    } catch (e) {
      console.warn('Error starting ambient breeze:', e);
    }
  }

  // Play a single serene Japanese koto / singing bell chime tone
  private triggerZenChime() {
    if (!this.playing || !this.ctx || !this.masterGain) return;

    const freq = this.notes[Math.floor(Math.random() * this.notes.length)];
    const now = this.ctx.currentTime;

    try {
      // Primary sine oscillator
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Subtle warm overtone harmonic (octave + 5th or 2nd harmonic)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.01, now);

      // Stereo panner for spatial drift
      const panner = this.ctx.createStereoPanner();
      const panVal = (Math.random() * 1.2 - 0.6); // -0.6 to +0.6
      panner.pan.setValueAtTime(panVal, now);

      // Note envelope
      const noteGain = this.ctx.createGain();
      const osc2Gain = this.ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.18, now);

      const baseVolume = 0.22;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(baseVolume, now + 0.04); // quick gentle strike
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2); // long serene decay

      osc1.connect(noteGain);
      osc2.connect(osc2Gain);
      osc2Gain.connect(noteGain);
      noteGain.connect(panner);
      panner.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 4.5);
      osc2.stop(now + 4.5);
    } catch (e) {
      console.warn('Error triggering chime:', e);
    }

    // Schedule next chime with natural human tempo fluctuation (between 2.8s and 5.2s)
    const nextInterval = 2800 + Math.random() * 2400;
    this.chimeTimer = setTimeout(() => this.triggerZenChime(), nextInterval);
  }

  // Occasional delicate high glass wind chime (Furin)
  private triggerFurinChime() {
    if (!this.playing || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const furinFreq = 1600 + Math.random() * 800; // 1.6kHz to 2.4kHz

    try {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(furinFreq, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      const panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime(Math.random() * 1.4 - 0.7, now);

      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.6);
    } catch (e) {
      console.warn('Error triggering furin:', e);
    }

    // Schedule next furin chime every 9 to 16 seconds
    const nextInterval = 9000 + Math.random() * 7000;
    this.furinTimer = setTimeout(() => this.triggerFurinChime(), nextInterval);
  }

  public async play(): Promise<void> {
    if (this.playing) return;
    this.initAudio();

    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (!this.masterGain || !this.ctx) return;

    this.playing = true;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    // Smooth 0.8s fade-in
    this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.8);

    this.startBreeze();
    this.triggerZenChime();
    this.triggerFurinChime();

    this.notify();
  }

  public pause(): void {
    if (!this.playing) return;
    this.playing = false;

    if (this.chimeTimer) clearTimeout(this.chimeTimer);
    if (this.furinTimer) clearTimeout(this.furinTimer);

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      // Smooth 0.6s fade-out
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);

      setTimeout(() => {
        try {
          if (this.noiseSource) {
            this.noiseSource.stop();
            this.noiseSource.disconnect();
            this.noiseSource = null;
          }
          if (this.lfo) {
            this.lfo.stop();
            this.lfo.disconnect();
            this.lfo = null;
          }
        } catch {
          // ignore cleanup
        }
      }, 700);
    }

    this.notify();
  }

  public toggle(): Promise<void> | void {
    if (this.playing) {
      this.pause();
    } else {
      return this.play();
    }
  }

  public setVolume(val: number): void {
    const clamped = Math.max(0, Math.min(1, val));
    this.volume = clamped;
    localStorage.setItem('portfolio_ambient_volume', clamped.toString());

    if (this.playing && this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(clamped, now + 0.1);
    }

    this.notify();
  }

  public getVolume(): number {
    return this.volume;
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  public subscribe(cb: (isPlaying: boolean, volume: number) => void): () => void {
    this.listeners.push(cb);
    cb(this.playing, this.volume);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.playing, this.volume));
  }
}

export const ambientSound = new AmbientSoundService();
