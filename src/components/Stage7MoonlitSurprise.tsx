import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Moon, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage7Props {
  herName: string;
}

export const Stage7MoonlitSurprise: React.FC<Stage7Props> = ({ herName }) => {
  const [hugCount, setHugCount] = useState<number>(0);
  const [deliveredMessage, setDeliveredMessage] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleSendHugs = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHugCount((prev) => prev + 1);
    setDeliveredMessage(true);

    // Heart burst with canvas-confetti
    confetti({
      particleCount: 35,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#FF6B8B', '#E6CA65', '#A31D3D', '#FFFFFF', '#FF85A1'],
      ticks: 180,
      scalar: 1.1,
    });

    // Add floating hearts from button
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -(Math.random() * 120 + 40),
    }));
    setFloatingHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.slice(6));
    }, 1500);
  };

  return (
    <section id="stage-moonlit-surprise" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto z-10">
      {/* Central Immersive Night Sky & Moon Container */}
      <div className="relative rounded-3xl p-8 sm:p-14 md:p-16 bg-gradient-to-b from-[#1C0816]/90 via-[#100412]/95 to-[#09020A] border-2 border-[#E6CA65]/50 shadow-[0_25px_80px_rgba(0,0,0,0.85)] text-center overflow-hidden">
        {/* Soft Background Celestial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#E6CA65]/15 via-[#A31D3D]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Animated Moon Visual */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mx-auto mb-8 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center"
        >
          {/* Radial Moon Auras */}
          <div className="absolute inset-0 rounded-full bg-[#E6CA65]/20 blur-xl scale-125 animate-pulse-soft" />

          {/* Full Moon Sphere */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#E3C886] via-[#FFFDF8] to-[#FCEFC7] moon-glow flex items-center justify-center border-2 border-[#FFFDF8]/60 shadow-[0_0_50px_rgba(230,202,101,0.5)]">
            {/* Soft Moon Texture */}
            <div className="absolute inset-0 rounded-full opacity-25 mix-blend-multiply bg-[radial-gradient(circle_at_35%_35%,_#A38244_0%,_transparent_35%),radial-gradient(circle_at_65%_65%,_#916C2D_0%,_transparent_40%)]" />
            <Moon className="w-10 h-10 sm:w-14 sm:h-14 text-[#5C3A16]/75 relative z-10" />
          </div>
        </motion.div>

        {/* Stage Kicker */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-3">
          <span>Stage 7</span>
          <span className="text-[#A31D3D] text-base">·</span>
          <span>The Moonlit Surprise</span>
        </div>

        {/* Required Title */}
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl text-[#FDF9EE] font-bold tracking-tight mb-6">
          One Little Thing Before You Go…
        </h2>

        {/* Required Message Copy */}
        <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base md:text-lg text-[#F5E6BE]/90 font-light leading-relaxed mb-10">
          <p>
            When you see the moon tonight, pause for a moment and smile.
          </p>
          <p>
            I hope this little surprise reminds you that you are valued, appreciated, and loved. You deserve happiness not just on special occasions, but in all the little moments of your life.
          </p>
          <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#E6CA65] font-medium pt-2">
            And if I could send you one thing through this screen, it would be the biggest hug in the world.
          </p>
        </div>

        {/* Primary Interactive CTA: Send Me a Million Hugs */}
        <div className="relative inline-block mb-6">
          {/* Floating animated mini hearts */}
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, scale: 0.8, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.4, x: heart.x, y: heart.y }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 pointer-events-none z-30"
            >
              <Heart className="w-6 h-6 text-[#FF6B8B] fill-[#FF6B8B]" />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSendHugs}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-11 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#8C1D38] via-[#A31D3D] to-[#8C1D38] text-[#FDF9EE] text-base sm:text-lg font-serif-cormorant font-bold tracking-wide shadow-[0_12px_40px_rgba(163,29,61,0.6)] border-2 border-[#E6CA65] hover:border-[#FFFDF8] cursor-pointer transition-all"
          >
            <Sparkles className="w-5 h-5 text-[#E6CA65] animate-spin-slow" />
            <span>Send Me a Million Hugs</span>
            <Heart className="w-5 h-5 text-[#E6CA65] fill-[#E6CA65] group-hover:scale-125 transition-transform" />
          </motion.button>
        </div>

        {/* Delivery Confirmation Card (Required Copy) */}
        <AnimatePresence>
          {deliveredMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 max-w-lg mx-auto p-4 sm:p-5 rounded-2xl bg-[#6B0E23]/25 border border-[#E6CA65]/60 text-center backdrop-blur-md"
            >
              <div className="flex items-center justify-center gap-2 text-xs font-serif-cormorant uppercase tracking-widest text-[#E6CA65] mb-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Virtual Hug Sent · #{hugCount}</span>
              </div>
              <p className="font-serif-cormorant italic text-base sm:text-lg text-[#FDF9EE] font-medium">
                “Virtual hug delivered successfully. Love included. Missing you extra today.”
              </p>
              <p className="text-xs text-[#E6CA65]/70 mt-1 font-light">
                (Tap the button again anytime you want another hug, {herName || 'meri jaan'}!)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
