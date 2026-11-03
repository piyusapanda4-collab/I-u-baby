import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Surprise1Props {
  herName: string;
  onComplete: () => void;
}

export const Surprise1Beginning: React.FC<Surprise1Props> = ({ herName, onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenBox = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Launch celebratory rose-gold confetti & floating hearts
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E6CA65', '#A31D3D', '#F5E6BE', '#FF85A1'],
      ticks: 180,
    });

    // Allow box opening animation to play, then transition
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 px-4">
      {/* Date & Occasion Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-6"
      >
        <span>29 October 2026</span>
        <span className="text-[#A31D3D] text-base" aria-hidden="true">·</span>
        <span>Karva Chauth Surprise</span>
      </motion.div>

      {/* 3D-Style Animated Gift Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8 cursor-pointer select-none group"
        onClick={handleOpenBox}
      >
        {/* Ambient Radiant Glow Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E6CA65]/25 via-[#A31D3D]/30 to-[#E6CA65]/10 blur-3xl scale-150 animate-pulse-soft" />

        {/* Gift Box Container */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Animated Lid */}
          <motion.div
            animate={
              isOpening
                ? { y: -70, rotate: -12, opacity: 0 }
                : { y: [0, -6, 0] }
            }
            transition={
              isOpening
                ? { duration: 0.9, ease: 'easeOut' }
                : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }
            className="absolute top-2 z-20 w-40 sm:w-52 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#4A091A] border-2 border-[#E6CA65] shadow-[0_10px_30px_rgba(230,202,101,0.4)] flex items-center justify-center"
          >
            {/* Golden Ribbon Ribbon Bow on top */}
            <div className="absolute -top-6 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C5A030] to-[#FFFDF8] border border-[#FFFDF8] shadow-[0_0_20px_rgba(230,202,101,0.8)] flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#6B0E23] fill-[#6B0E23]" />
              </div>
            </div>

            {/* Horizontal Ribbon on Lid */}
            <div className="w-full h-3 bg-gradient-to-r from-[#D4AF37] via-[#FFF8D6] to-[#D4AF37] shadow-inner" />
          </motion.div>

          {/* Box Body */}
          <motion.div
            animate={isOpening ? { scale: [1, 1.05, 0.95] } : {}}
            transition={{ duration: 0.8 }}
            className="relative w-36 sm:w-48 h-32 sm:h-40 rounded-b-2xl bg-gradient-to-b from-[#4A091A] to-[#24040C] border-2 border-[#E6CA65]/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden"
          >
            {/* Vertical Golden Ribbon on Box Body */}
            <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-[#C5A030] via-[#FFFDF8] to-[#C5A030] shadow-md flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#6B0E23] animate-pulse" />
            </div>

            {/* Glowing Golden Light Seeping from Inside */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 2 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-[#E6CA65] to-[#FFFDF8] blur-xl z-10"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Kiss Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6B0E23]/70 border border-[#E6CA65]/60 text-xs sm:text-sm text-[#FDF9EE] font-serif-cormorant font-semibold mb-4 shadow-[0_0_20px_rgba(230,202,101,0.3)]"
      >
        <span>I ❤️ u baby · ummmaaaaa 😘😘😘😘 · baby ummaaa · ummmaaaah</span>
      </motion.div>

      {/* Screen Text */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="font-script-romantic text-4xl sm:text-5xl md:text-6xl text-[#E6CA65] mb-4"
      >
        Hey, My Baby, My Woman...
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="font-serif-cormorant text-lg sm:text-2xl text-[#FDF9EE] font-medium max-w-xl mx-auto leading-relaxed mb-8 px-4"
      >
        “I made something special for you. But you have to discover it one surprise at a time.”
      </motion.p>

      {/* Button: Open Your First Surprise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <button
          onClick={handleOpenBox}
          disabled={isOpening}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-base sm:text-lg font-serif-cormorant font-bold tracking-wide shadow-[0_12px_40px_rgba(107,14,35,0.6)] border-2 border-[#E6CA65] hover:border-[#FFFDF8] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-[#E6CA65] group-hover:rotate-12 transition-transform" />
          <span>{isOpening ? 'Unwrapping Magic...' : 'Open Your First Surprise'}</span>
          <Heart className="w-5 h-5 text-[#E6CA65] fill-[#E6CA65] group-hover:scale-125 transition-transform" />
        </button>
      </motion.div>

      <p className="text-xs text-[#E6CA65]/60 font-serif-cormorant tracking-widest uppercase mt-6">
        ✦ Tap the gift box or button to begin ✦
      </p>
    </div>
  );
};
