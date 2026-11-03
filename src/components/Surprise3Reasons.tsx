import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Surprise3Props {
  onComplete: () => void;
}

const REASONS = [
  {
    id: 1,
    title: 'Reason 01',
    message: 'Your smile can make an ordinary day feel extraordinary.',
    subtext: 'Just one gentle smile from you turns everything bright.',
  },
  {
    id: 2,
    title: 'Reason 02',
    message: 'I love the little things about you that you might not even notice.',
    subtext: 'The way you laugh, the warmth in your voice, and your sweet innocence.',
  },
  {
    id: 3,
    title: 'Reason 03',
    message: 'Talking to you can become the best part of my day.',
    subtext: 'No matter how tired or busy life is, our conversations heal my soul.',
  },
  {
    id: 4,
    title: 'Reason 04',
    message: 'You make simple moments feel worth remembering.',
    subtext: 'Walking together, holding hands, or just sharing quiet silence.',
  },
  {
    id: 5,
    title: 'Reason 05',
    message: 'I love the person you are, not just the moments we share.',
    subtext: 'Your kindness, your pure heart, and the grace you carry.',
  },
  {
    id: 6,
    title: 'Reason 06',
    message: 'If I could choose one beautiful thing to keep in my world, I would choose you.',
    subtext: 'Now, tomorrow, and for all the moonlit nights to come.',
  },
];

export const Surprise3Reasons: React.FC<Surprise3Props> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    if (currentIndex < REASONS.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);

      confetti({
        particleCount: 15,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#E6CA65', '#A31D3D', '#FF85A1'],
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isFinalCard = currentIndex === REASONS.length - 1;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 px-4">
      {/* Kicker */}
      <div className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-3">
        <span>Surprise 3 of 7</span>
        <span className="text-[#A31D3D] text-base">·</span>
        <span>Reasons I Love You</span>
      </div>

      <h2 className="font-serif-cormorant text-2xl sm:text-4xl text-[#FDF9EE] font-bold mb-2">
        Little Things That Make You Special
      </h2>
      <p className="text-sm text-[#F5E6BE]/75 font-light mb-6 max-w-md">
        Tap the card or use the arrows to discover each reason my heart chose you.
      </p>

      {/* Progress Indicator: Reason X of 6 */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="font-serif-cormorant text-xs sm:text-sm tracking-widest uppercase text-[#E6CA65] font-bold">
          Reason {currentIndex + 1} of {REASONS.length}
        </span>
        <div className="flex items-center gap-1.5 ml-2">
          {REASONS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex
                  ? 'w-6 bg-[#E6CA65]'
                  : i < currentIndex
                  ? 'w-2 bg-[#E6CA65]/60'
                  : 'w-2 bg-white/20'
              }`}
              aria-label={`Go to reason ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Active Card with 3D Flip / Slide Effect */}
      <div className="relative w-full max-w-md min-h-[300px] sm:min-h-[320px] flex items-center justify-center mb-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40, rotateY: direction * 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -direction * 40, rotateY: -direction * 15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleNext}
            className="w-full rounded-3xl p-7 sm:p-9 bg-gradient-to-b from-[#2E0510] via-[#1F0814] to-[#120B1D] border-2 border-[#E6CA65] shadow-[0_20px_60px_rgba(163,29,61,0.4)] flex flex-col justify-between text-center cursor-pointer select-none group"
          >
            {/* Ambient Card Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6CA65]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top row */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-serif-cormorant text-xs uppercase tracking-widest text-[#E6CA65] font-bold">
                {REASONS[currentIndex].title}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#E6CA65]/20 flex items-center justify-center text-[#E6CA65]">
                <Heart className="w-4 h-4 fill-[#E6CA65]" />
              </div>
            </div>

            {/* Main message */}
            <div className="my-auto py-4">
              <p className="font-serif-cormorant italic text-xl sm:text-2xl text-[#FDF9EE] font-semibold leading-relaxed tracking-wide">
                “{REASONS[currentIndex].message}”
              </p>
              <p className="text-xs sm:text-sm text-[#F5E6BE]/65 font-light mt-3">
                {REASONS[currentIndex].subtext}
              </p>
            </div>

            {/* Bottom hint */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#E6CA65]/80 font-serif-cormorant">
              <span>♥ Sacred truth</span>
              <span className="group-hover:translate-x-1 transition-transform">
                {isFinalCard ? 'All 6 revealed ✦' : 'Tap for next reason →'}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full border border-white/10 flex items-center justify-center transition-all ${
            currentIndex === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white/10 text-white cursor-pointer'
          }`}
          aria-label="Previous reason"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          disabled={isFinalCard}
          className={`p-3 rounded-full border border-white/10 flex items-center justify-center transition-all ${
            isFinalCard
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white/10 text-white cursor-pointer'
          }`}
          aria-label="Next reason"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* After final card or visible when final card is reached */}
      {isFinalCard && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#E6CA65]">
            “And these are just six little reasons. My heart has many more.”
          </p>

          <div className="py-2 px-4 rounded-full bg-[#6B0E23]/60 border border-[#E6CA65]/50 inline-block text-xs sm:text-sm text-[#FDF9EE] font-serif-cormorant font-semibold shadow-[0_0_15px_rgba(230,202,101,0.3)]">
            I ❤️ u baby · ummmaaaaa 😘😘😘😘 · baby ummaaa · ummmaaaah
          </div>

          <button
            onClick={onComplete}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-base sm:text-lg font-serif-cormorant font-bold tracking-wide border-2 border-[#E6CA65] hover:scale-105 active:scale-95 transition-all shadow-[0_12px_40px_rgba(107,14,35,0.6)] cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#E6CA65]" />
            <span>Unlock the Next Gift</span>
            <ArrowRight className="w-5 h-5 text-[#E6CA65] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
