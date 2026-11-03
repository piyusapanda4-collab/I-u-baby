import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Surprise5Props {
  onComplete: () => void;
}

export const Surprise5GiftFromTheHeart: React.FC<Surprise5Props> = ({ onComplete }) => {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleUnwrap = () => {
    if (isUnwrapped || isAnimating) return;
    setIsAnimating(true);

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#E6CA65', '#FF6B8B', '#A31D3D', '#FFFDF8'],
      ticks: 200,
    });

    setTimeout(() => {
      setIsUnwrapped(true);
      setIsAnimating(false);
    }, 900);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 px-4">
      {/* Kicker */}
      <div className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-3">
        <span>Surprise 5 of 7</span>
        <span className="text-[#A31D3D] text-base">·</span>
        <span>A Gift From The Heart</span>
      </div>

      <h2 className="font-serif-cormorant text-2xl sm:text-4xl text-[#FDF9EE] font-bold mb-2">
        You have one more gift waiting...
      </h2>

      <p className="text-sm text-[#F5E6BE]/75 font-light mb-8 max-w-md">
        {isUnwrapped
          ? 'An eternal truth wrapped inside my heart:'
          : 'Gently wrapped in champagne ribbons and glowing with devotion.'}
      </p>

      {/* 3D Gift Box (Before Unwrapping) */}
      {!isUnwrapped && (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mb-8 cursor-pointer group"
            onClick={handleUnwrap}
          >
            {/* Pulsing Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E6CA65]/30 to-[#A31D3D]/30 blur-3xl scale-125 animate-pulse-soft" />

            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Box Lid */}
              <motion.div
                animate={
                  isAnimating
                    ? { y: -60, rotate: 10, opacity: 0 }
                    : { y: [0, -5, 0] }
                }
                transition={
                  isAnimating
                    ? { duration: 0.8 }
                    : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }
                className="absolute top-2 z-20 w-36 sm:w-48 h-12 sm:h-14 rounded-2xl bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#4A091A] border-2 border-[#E6CA65] shadow-[0_10px_30px_rgba(230,202,101,0.3)] flex items-center justify-center"
              >
                <div className="absolute -top-5 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-[#E6CA65] border-2 border-white flex items-center justify-center shadow-lg">
                    <Heart className="w-5 h-5 text-[#6B0E23] fill-[#6B0E23]" />
                  </div>
                </div>
                <div className="w-full h-2.5 bg-[#E6CA65]" />
              </motion.div>

              {/* Box Base */}
              <div className="relative w-32 sm:w-44 h-28 sm:h-36 rounded-b-2xl bg-gradient-to-b from-[#4A091A] to-[#24040C] border-2 border-[#E6CA65]/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
                <div className="w-6 h-full bg-[#E6CA65] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#4A091A]" />
                </div>
              </div>
            </div>
          </motion.div>

          <button
            onClick={handleUnwrap}
            disabled={isAnimating}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-base sm:text-lg font-serif-cormorant font-bold tracking-wide border-2 border-[#E6CA65] hover:scale-105 active:scale-95 transition-all shadow-[0_12px_40px_rgba(107,14,35,0.6)] cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#E6CA65]" />
            <span>{isAnimating ? 'Unwrapping...' : 'Unwrap My Gift'}</span>
            <Heart className="w-5 h-5 text-[#E6CA65] fill-[#E6CA65]" />
          </button>
        </div>
      )}

      {/* Revealed Glowing Heart and Message */}
      <AnimatePresence>
        {isUnwrapped && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl"
          >
            {/* Glowing Heart Icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[#A31D3D] to-[#E6CA65] p-1 shadow-[0_0_40px_rgba(230,202,101,0.6)] flex items-center justify-center border-2 border-white"
            >
              <Heart className="w-10 h-10 text-white fill-white" />
            </motion.div>

            {/* Revealed Message Container */}
            <div className="rounded-3xl p-7 sm:p-10 bg-gradient-to-b from-[#2E0510]/90 via-[#1C0612]/95 to-[#0E0309] border-2 border-[#E6CA65] shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-center relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6CA65]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 font-serif-cormorant text-lg sm:text-xl text-[#FDF9EE] leading-relaxed">
                <p className="italic text-xl sm:text-2xl text-[#E6CA65] font-semibold">
                  “If I could give you one gift that would last forever, it would be the ability to see yourself through my eyes.”
                </p>

                <p className="font-light text-base sm:text-lg text-[#F5E6BE]/90">
                  “Then you would understand how precious you are, how much your happiness matters, and why even your smallest smile can mean so much to me.”
                </p>

                <p className="font-serif-cormorant text-lg sm:text-xl font-bold text-[#E6CA65] pt-2 border-t border-white/10">
                  “You deserve to feel loved, respected, appreciated, and happy.”
                </p>

                <div className="py-2 px-4 rounded-full bg-[#6B0E23]/60 border border-[#E6CA65]/60 text-xs sm:text-sm text-[#FDF9EE] font-serif-cormorant font-bold shadow-md my-2 inline-block">
                  I ❤️ u baby · ummmaaaaa 😘😘😘😘 · baby ummaaa · ummmaaaah
                </div>
              </div>
            </div>

            {/* Button: Take Me to the Moon */}
            <button
              onClick={onComplete}
              className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#8C1D38] via-[#A31D3D] to-[#8C1D38] text-[#FDF9EE] text-base sm:text-lg font-serif-cormorant font-bold tracking-wide border-2 border-[#E6CA65] hover:scale-105 active:scale-95 transition-all shadow-[0_12px_40px_rgba(163,29,61,0.6)] cursor-pointer"
            >
              <Moon className="w-5 h-5 text-[#E6CA65] fill-[#E6CA65]" />
              <span>Take Me to the Moon</span>
              <ArrowRight className="w-5 h-5 text-[#E6CA65] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
