import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage1HeroProps {
  herName: string;
  onOpenSurprise: () => void;
}

export const Stage1Hero: React.FC<Stage1HeroProps> = ({ herName, onOpenSurprise }) => {
  const handlePrimaryClick = () => {
    // Launch a gentle soft burst of rose-gold heart confetti
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E6CA65', '#A31D3D', '#F5E6BE', '#FF85A1'],
      ticks: 160,
    });
    onOpenSurprise();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 py-12 sm:py-16 text-center z-10">
      {/* Top spacer to balance layout */}
      <div className="h-8 sm:h-12" />

      {/* Main Hero Content */}
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Date kicker (unboxed, clean typographic separator) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-2.5 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-6"
        >
          <span>29 October 2026</span>
          <span className="text-[#A31D3D] text-base" aria-hidden="true">·</span>
          <span>Karva Chauth</span>
        </motion.div>

        {/* Central Moon Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 group"
        >
          {/* Subtle celestial aura rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E6CA65]/20 via-[#A31D3D]/15 to-transparent blur-2xl scale-150 animate-pulse-soft" />

          {/* Full Moon */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-[#FFFDF8] via-[#FCEFC7] to-[#E3C886] moon-glow flex items-center justify-center p-2 border border-[#FFFDF8]/40 overflow-hidden shadow-[0_0_80px_rgba(230,202,101,0.35)]">
            {/* Crater Topography & Texture */}
            <div className="absolute inset-0 opacity-25 mix-blend-multiply bg-[radial-gradient(circle_at_30%_35%,_rgba(163,130,68,0.7)_0%,_transparent_28%),radial-gradient(circle_at_70%_60%,_rgba(145,108,45,0.6)_0%,_transparent_32%),radial-gradient(circle_at_45%_80%,_rgba(145,108,45,0.5)_0%,_transparent_25%)]" />

            {/* Traditional Karva Chauth subtle silhouette glow */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl opacity-80 filter drop-shadow">🌙</span>
              <span className="font-script-romantic text-xs sm:text-sm text-[#5C3A16] font-bold tracking-wider mt-1 opacity-75">
                My Moon
              </span>
            </div>
          </div>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FDF9EE] font-semibold tracking-tight leading-[1.15] mb-5 text-balance max-w-2xl"
        >
          For My Baby, My Moon, <br className="hidden sm:inline" />
          <span className="font-script-romantic text-[#E6CA65] font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl block sm:inline mt-1 sm:mt-0">
            My Everything.
          </span>
        </motion.h1>

        {/* Romantic Lead Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base sm:text-lg text-[#F5E6BE]/90 font-light max-w-xl leading-relaxed mb-8 text-balance px-4"
        >
          I made a little something for you, my love{herName ? `, ${herName}` : ''}. Take a breath, smile, and open the surprise waiting inside.
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button
            onClick={handlePrimaryClick}
            className="group relative inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-sm sm:text-base font-medium tracking-wide shadow-[0_10px_35px_rgba(107,14,35,0.55)] border border-[#E6CA65]/50 hover:border-[#E6CA65] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#E6CA65] group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-serif-cormorant font-semibold text-base sm:text-lg">
              Open Your Surprise, My Love
            </span>
            <Heart className="w-4 h-4 text-[#E6CA65] fill-[#E6CA65] group-hover:scale-125 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Downward indicator */}
      <motion.button
        onClick={onOpenSurprise}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex flex-col items-center gap-1.5 text-xs tracking-widest text-[#E6CA65]/80 uppercase hover:text-[#E6CA65] transition-colors cursor-pointer pt-6"
        aria-label="Scroll down to letter envelope"
      >
        <span className="font-serif-cormorant">Scroll to discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#E6CA65]" />
      </motion.button>
    </section>
  );
};
