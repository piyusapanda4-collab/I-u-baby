import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Heart, Sparkles, ArrowRight, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Surprise6Props {
  herName: string;
  onComplete: () => void;
}

export const Surprise6MoonMoment: React.FC<Surprise6Props> = ({ herName, onComplete }) => {
  const [hugCount, setHugCount] = useState(0);

  const handleSendHug = () => {
    setHugCount((prev) => prev + 1);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF6B8B', '#E6CA65', '#A31D3D', '#FFFFFF'],
      ticks: 150,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 px-4">
      {/* Kicker with Diya */}
      <div className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-3">
        <Flame className="w-3.5 h-3.5 text-[#E6CA65]" />
        <span>Surprise 6 of 7 · The Karva Chauth Moon</span>
        <Flame className="w-3.5 h-3.5 text-[#E6CA65]" />
      </div>

      {/* Date Kicker */}
      <div className="text-xs sm:text-sm text-[#F5E6BE]/80 font-serif-cormorant tracking-widest uppercase mb-4">
        29 October 2026 · Happy Karva Chauth
      </div>

      {/* Central Full Moon Visual */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative my-4 w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E6CA65]/30 to-[#FFFDF8]/20 blur-2xl scale-125 animate-pulse-soft" />

        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#FFFDF8] via-[#FCEFC7] to-[#E3C886] moon-glow flex items-center justify-center border-2 border-white/70 shadow-[0_0_60px_rgba(230,202,101,0.5)] overflow-hidden">
          {/* Subtle Crater Texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[radial-gradient(circle_at_30%_35%,_#A38244_0%,_transparent_30%),radial-gradient(circle_at_70%_65%,_#916C2D_0%,_transparent_35%)]" />
          <Moon className="w-12 h-12 sm:w-16 sm:h-16 text-[#5C3A16]/70 relative z-10" />
        </div>
      </motion.div>

      {/* Title */}
      <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#FDF9EE] font-bold tracking-tight mb-6">
        Under the Same Moon
      </h2>

      {/* Moonlit Message Card */}
      <div className="w-full max-w-2xl rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#2E0514]/90 via-[#190410]/95 to-[#0B0208] border-2 border-[#E6CA65]/60 shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-center relative overflow-hidden mb-8">
        <div className="space-y-4 font-serif-cormorant text-base sm:text-lg text-[#FDF9EE] leading-relaxed">
          <p className="font-script-romantic text-3xl sm:text-4xl text-[#E6CA65] font-bold">
            My Baby, My Woman,
          </p>

          <div className="py-2 px-4 rounded-full bg-[#6B0E23]/60 border border-[#E6CA65]/60 text-xs sm:text-sm text-[#FDF9EE] font-serif-cormorant font-bold shadow-md my-2 inline-block">
            I ❤️ u baby · ummmaaaaa 😘😘😘😘 · baby ummaaa · ummmaaaah
          </div>

          <p>
            Tonight, when you look at the moon, I hope you remember how special you are.
          </p>

          <p>
            The moon may light up the sky, but your happiness brings its own light into my world.
          </p>

          <p>
            I hope this Karva Chauth brings you beautiful moments, a peaceful heart, and a thousand reasons to smile.
          </p>

          <p>
            And if I could send you anything through this screen, it would be the biggest hug, the sweetest kisses, and a little reminder that you are deeply cherished.
          </p>

          {/* Hindi Highlighted Line */}
          <div className="my-5 py-3.5 px-4 rounded-xl bg-[#6B0E23]/30 border-l-4 border-[#E6CA65]">
            <p className="italic text-lg sm:text-2xl text-[#E6CA65] font-semibold">
              “Chaand aasman ki khoobsurti hai, aur tum meri duniya ki sabse pyaari roshni ho.”
            </p>
          </div>

          <p className="font-script-romantic text-2xl sm:text-3xl text-[#FDF9EE] pt-2">
            Happy Karva Chauth, meri jaan. Forever for Madhusmita ❤️ Piyusa.
          </p>
        </div>

        {/* Small Virtual Hug & Kiss Action */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-3">
          <button
            onClick={handleSendHug}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#6B0E23]/80 hover:bg-[#8C1D38] border border-[#E6CA65]/60 text-xs sm:text-sm text-[#FDF9EE] font-serif-cormorant font-bold cursor-pointer transition-all shadow-md"
          >
            <Heart className="w-4 h-4 fill-[#FF6B8B] text-[#FF6B8B]" />
            <span>Send Kisses & Hugs 😘 {hugCount > 0 && `(${hugCount} ummmaaaaa!)`}</span>
          </button>
        </div>
      </div>

      {/* Button: One Last Surprise */}
      <button
        onClick={onComplete}
        className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-base sm:text-lg font-serif-cormorant font-bold tracking-wide border-2 border-[#E6CA65] hover:scale-105 active:scale-95 transition-all shadow-[0_12px_40px_rgba(107,14,35,0.6)] cursor-pointer"
      >
        <Sparkles className="w-5 h-5 text-[#E6CA65]" />
        <span>One Last Surprise</span>
        <ArrowRight className="w-5 h-5 text-[#E6CA65] group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
