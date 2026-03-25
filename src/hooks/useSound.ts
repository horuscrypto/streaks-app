import { useCallback } from 'react';

export type AudioProfileName = 'mute' | 'soft-ding' | 'wood-tap' | 'subtle-chime';

export function useSound() {
  const playStrikeSound = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const profile = (localStorage.getItem('strike_audio_profile') as AudioProfileName) || 'mute';
      if (profile === 'mute') return;
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const t = ctx.currentTime;

      if (profile === 'soft-ding') {
        osc1.type = 'sine'; osc2.type = 'sine';
        osc1.frequency.setValueAtTime(880, t);
        osc2.frequency.setValueAtTime(880, t);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, t);
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.3, t + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
        osc1.start(); osc2.start();
        osc1.stop(t + 0.4); osc2.stop(t + 0.4);
      } else if (profile === 'wood-tap') {
        osc1.type = 'square'; osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(400, t);
        osc2.frequency.setValueAtTime(600, t);
        filter.type = 'bandpass';
        filter.Q.value = 5;
        filter.frequency.setValueAtTime(800, t);
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.8, t + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
        osc1.start(); osc2.start();
        osc1.stop(t + 0.2); osc2.stop(t + 0.2);
      } else if (profile === 'subtle-chime') {
        osc1.type = 'sine'; osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(1046.5, t);
        osc2.frequency.setValueAtTime(2093, t);
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, t);
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.3, t + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, t + 1.5);
        osc1.start(); osc2.start();
        osc1.stop(t + 1.5); osc2.stop(t + 1.5);
      }

      if (navigator.vibrate) navigator.vibrate([20]);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  }, []);

  return { playStrikeSound };
}
