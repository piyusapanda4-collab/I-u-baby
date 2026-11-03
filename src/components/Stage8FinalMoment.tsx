import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, RotateCcw, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage8Props {
  herName: string;
  yourName: string;
  onReadLetterAgain: () => void;
}

export const Stage8FinalMoment: React.FC<Stage8Props> = ({
  herName,
  yourName,
  onReadLetterAgain,
}) => {
  const handleReadAgain = () => {
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E6CA65', '#A31D3D'],
    });
    onReadLetterAgain();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="stage-final" className="relative py-24 sm:py-32 px-4 sm:px-6 text-center z-10 border-t border-[#E6CA65]/20 bg-gradient-to-b from-transparent via-[#180512]/60 to-[#0A0207]">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Sacred Diya / Moon Embellishment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative mb-6"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E6CA65]/30 to-[#A31D3D]/30 blur-lg absolute inset-0 animate-pulse-soft" />
          <div className="relative w-14 h-14 rounded-full border border-[#E6CA65]/60 bg-[#2E0B19] flex items-center justify-center text-2xl shadow-[0_0_25px_rgba(230,202,101,0.4)]">
            🪔
          </div>
        </motion.div>

        {/* Stage Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#E6CA65] font-serif-cormorant font-bold mb-4"
        >
          Karva Chauth 2026 · Forever & Always
        </motion.div>

        {/* Required Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl text-[#FDF9EE] font-extrabold tracking-tight mb-6"
        >
          Happy Karva Chauth, <br />
          <span className="font-script-romantic text-[#E6CA65] font-normal text-5xl sm:text-6xl md:text-7xl block mt-2">
            Meri Jaan.
          </span>
        </motion.h2>

        {/* Required Emotional Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 max-w-xl text-base sm:text-lg md:text-xl text-[#F5E6BE]/90 font-serif-cormorant leading-relaxed italic mb-10"
        >
          <p>
            “You are my favorite thought, my sweetest smile, and someone I am grateful to have in my world.”
          </p>
          <p>
            “May your days be gentle, your dreams be beautiful, and your heart always remember how precious you are.”
          </p>
          <p className="font-sans text-sm sm:text-base not-italic text-[#E6CA65] font-light pt-2">
            This little universe was made for you, with love.
          </p>
        </motion.div>

        {/* Romantic Sign-off Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 px-8 py-4 rounded-2xl bg-[#6B0E23]/20 border border-[#E6CA65]/30 backdrop-blur-sm"
        >
          <span className="font-script-romantic text-2xl text-[#E6CA65] block">
            With eternal love & affection,
          </span>
          <span className="font-serif-cormorant text-2xl font-bold text-[#FDF9EE] tracking-wide mt-1 block">
            {yourName || 'Piyusa'} ❤️ {herName || 'Madhusmita'}
          </span>
        </motion.div>

        {/* CTA Controls: Read My Letter Again */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleReadAgain}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-base font-serif-cormorant font-semibold tracking-wide border border-[#E6CA65]/60 hover:border-[#E6CA65] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(107,14,35,0.5)] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#E6CA65] group-hover:-rotate-90 transition-transform duration-300" />
            <span>Read My Letter Again</span>
            <Heart className="w-4 h-4 text-[#E6CA65] fill-[#E6CA65]" />
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#F5E6BE]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-[#E6CA65]" />
            <span>Top</span>
          </button>
        </motion.div>

        {/* Small subtle footer credit */}
        <div className="mt-16 text-xs text-[#E6CA65]/40 font-serif-cormorant tracking-widest">
          ✦ CREATED WITH ALL MY HEART FOR KARVA CHAUTH 2026 ✦
        </div>
      </div>
    </footer>
  );
};
