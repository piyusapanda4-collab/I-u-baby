/**
 * Romantic ambient sound synthesizer using Web Audio API
 * Generates an ethereal, warm music-box / piano melody with soft reverb and chord progressions
 * (C - Am - F - G with 7th and 9th extensions for deeply emotional warmth)
 */

class RomanticSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private step = 0;
  private masterGain: GainNode | null = null;

  // Kesariya iconic melody notes (D, E, F#, G, A, B, C5, D5)
  // "Kesariya tera ishq hai piya... Rang jaaun jo main haath lagaun"
  private kesariyaMelody = [
    { freq: 392.00, dur: 0.5, name: 'Ke' },     // G4
    { freq: 440.00, dur: 0.45, name: 'sa' },    // A4
    { freq: 392.00, dur: 0.55, name: 'ri' },    // G4
    { freq: 329.63, dur: 0.7, name: 'ya' },     // E4
    { freq: 293.66, dur: 0.4, name: 'te' },     // D4
    { freq: 329.63, dur: 0.6, name: 'ra' },     // E4
    { freq: 440.00, dur: 0.5, name: 'ishq' },   // A4
    { freq: 392.00, dur: 0.4, name: 'hai' },    // G4
    { freq: 329.63, dur: 0.8, name: 'piya' },   // E4
    // "Rang jaaun jo main"
    { freq: 392.00, dur: 0.45, name: 'Rang' },
    { freq: 440.00, dur: 0.45, name: 'jaa' },
    { freq: 392.00, dur: 0.45, name: 'un' },
    { freq: 329.63, dur: 0.5, name: 'jo' },
    { freq: 293.66, dur: 0.5, name: 'main' },
    // "haath lagaun"
    { freq: 329.63, dur: 0.45, name: 'haath' },
    { freq: 392.00, dur: 0.5, name: 'la' },
    { freq: 329.63, dur: 0.4, name: 'ga' },
    { freq: 261.63, dur: 0.9, name: 'un' },     // C4
    // "Din beete saara"
    { freq: 261.63, dur: 0.4, name: 'Din' },
    { freq: 293.66, dur: 0.4, name: 'bee' },
    { freq: 329.63, dur: 0.45, name: 'te' },
    { freq: 392.00, dur: 0.5, name: 'saa' },
    { freq: 440.00, dur: 0.55, name: 'ra' },
    // "teri fikr mein"
    { freq: 392.00, dur: 0.45, name: 'te' },
    { freq: 329.63, dur: 0.45, name: 'ri' },
    { freq: 293.66, dur: 0.5, name: 'fi' },
    { freq: 261.63, dur: 0.8, name: 'kr' },
    // "Rain saari teri khair manaun"
    { freq: 261.63, dur: 0.4, name: 'Rain' },
    { freq: 293.66, dur: 0.4, name: 'saa' },
    { freq: 329.63, dur: 0.45, name: 'ri' },
    { freq: 392.00, dur: 0.55, name: 'te' },
    { freq: 440.00, dur: 0.6, name: 'ri' },
    { freq: 392.00, dur: 0.45, name: 'khair' },
    { freq: 329.63, dur: 0.55, name: 'ma' },
    { freq: 293.66, dur: 0.5, name: 'na' },
    { freq: 261.63, dur: 1.1, name: 'un' },
  ];

  // Warm acoustic backing chords (C, G, Am, F)
  private chordBases = [130.81, 98.00, 110.00, 87.31]; // C3, G2, A2, F2


  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (this.isPlaying || !this.ctx || !this.masterGain) return;
    this.isPlaying = true;

    let melodyIndex = 0;
    let chordIndex = 0;

    const playTone = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      const currentNote = this.kesariyaMelody[melodyIndex];
      const freq = currentNote.freq;
      const now = this.ctx.currentTime;
      const duration = currentNote.dur * 1.8;

      // Play warm bass root every 4 melody notes
      if (melodyIndex % 4 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        const bassFreq = this.chordBases[chordIndex % this.chordBases.length];
        chordIndex++;
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        bassGain.gain.setValueAtTime(0, now);
        bassGain.gain.linearRampToValueAtTime(0.08, now + 0.1);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);
        bassOsc.start(now);
        bassOsc.stop(now + 2.6);
      }

      // Main bell/celeste oscillator for Kesariya melody
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Warm subtle overtone for music box / flute richness
      const overtoneOsc = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();
      overtoneOsc.type = 'triangle';
      overtoneOsc.frequency.setValueAtTime(freq * 2, now);

      // Soft attack, long celestial decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      overtoneGain.gain.setValueAtTime(0, now);
      overtoneGain.gain.linearRampToValueAtTime(0.05, now + 0.05);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0005, now + duration * 0.75);

      osc.connect(gain);
      overtoneOsc.connect(overtoneGain);
      gain.connect(this.masterGain);
      overtoneGain.connect(this.masterGain);

      osc.start(now);
      overtoneOsc.start(now);
      osc.stop(now + duration);
      overtoneOsc.stop(now + duration);

      melodyIndex = (melodyIndex + 1) % this.kesariyaMelody.length;

      // Schedule next note based on current note's rhythm duration
      if (this.isPlaying) {
        const nextDelay = currentNote.dur * 1000;
        this.intervalId = window.setTimeout(playTone, nextDelay);
      }
    };

    // Play immediate first note
    playTone();
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudioSynth = new RomanticSynthesizer();
