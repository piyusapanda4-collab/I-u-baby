import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { romanticAudioSynth } from '../utils/romanticSynth.ts';

interface AudioPlayerProps {
  musicUrl?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserStarted, setHasUserStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (musicUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicUrl);
        audioRef.current.loop = true;
      } else {
        audioRef.current.src = musicUrl;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      romanticAudioSynth.stop();
    };
  }, [musicUrl]);

  const togglePlayback = () => {
    setHasUserStarted(true);

    if (musicUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fallback to built-in romantic synth if external URL fails
          romanticAudioSynth.play();
          setIsPlaying(true);
        });
      }
    } else {
      // Use built-in ambient romantic synthesizer
      const active = romanticAudioSynth.toggle();
      setIsPlaying(active);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePlayback}
        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 text-xs font-medium cursor-pointer ${
          isPlaying
            ? 'bg-[#3A0E1A]/90 border-[#E6CA65] text-[#F5E6BE] shadow-[0_0_15px_rgba(230,202,101,0.25)]'
            : 'bg-[#0B132B]/70 border-[#E6CA65]/30 text-[#F3E5AB]/80 hover:border-[#E6CA65]/70 hover:text-[#F3E5AB]'
        }`}
        aria-label={isPlaying ? 'Pause romantic melody' : 'Play romantic melody'}
        title={isPlaying ? 'Pause music' : 'Play romantic music'}
      >
        <span className="relative flex items-center justify-center">
          {isPlaying ? (
            <Disc className="w-3.5 h-3.5 text-[#E6CA65] animate-spin [animation-duration:4s]" />
          ) : (
            <Music className="w-3.5 h-3.5 text-[#E6CA65]/80 group-hover:scale-110 transition-transform" />
          )}
        </span>

        <span className="whitespace-nowrap tracking-wide">
          {isPlaying ? 'Kesariya Playing 🎵' : 'Play Kesariya 🎶'}
        </span>

        {/* Ambient soundwave equalizer when playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 px-0.5">
            <span className="w-0.5 bg-[#E6CA65] h-full animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-0.5 bg-[#E6CA65] h-2/3 animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 bg-[#E6CA65] h-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
            <span className="w-0.5 bg-[#E6CA65] h-1/2 animate-[pulse_1.1s_ease-in-out_infinite_0.1s]" />
          </div>
        )}
      </button>
    </div>
  );
};
