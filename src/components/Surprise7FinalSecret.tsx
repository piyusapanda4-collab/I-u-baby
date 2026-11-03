import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw, BookOpen, Lock, Unlock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Surprise7Props {
  herName: string;
  yourName: string;
  onRestartJourney: () => void;
  onReadLetterAgain: () => void;
}

export const Surprise7FinalSecret: React.FC<Surprise7Props> = ({
  herName,
  yourName,
  onRestartJourney,
  onReadLetterAgain,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlockHeart = () => {
    if (isUnlocked) return;
    setIsUnlocked(true);

    // Multi-stage golden hearts and rose petal confetti shower
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#E6CA65', '#A31D3D', '#FF6B8B', '#FFFDF8'],
      ticks: 240,
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E6CA65', '#FF6B8B'],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#A31D3D', '#E6CA65'],
      });
    }, 400);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 px-4">
      {/* Kicker */}
      <div className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-3">
        <span>Surprise 7 of 7 · The Grand Finale</span>
      </div>

      <h2 className="font-serif-cormorant text-2xl sm:text-4xl text-[#FDF9EE] font-bold mb-2">
        You have reached the final surprise...
      </h2>

      <p className="text-sm text-[#F5E6BE]/75 font-light mb-8 max-w-md">
        {isUnlocked
          ? 'The deepest corner of my heart, unveiled forever for you.'
          : 'A sacred golden heart lock holding the final secret of this journey.'}
      </p>

      {/* Sealed Heart Lock (Before Reveal) */}
      {!isUnlocked && (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mb-8 cursor-pointer group"
            onClick={handleUnlockHeart}
          >
            {/* Ambient Halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E6CA65]/35 via-[#A31D3D]/35 to-transparent blur-3xl scale-150 animate-pulse-soft" />

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-[#8C1D38] via-[#A31D3D] to-[#4A091A] p-2 border-2 border-[#E6CA65] shadow-[0_0_50px_rgba(230,202,101,0.5)] flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full border border-[#E6CA65]/40 flex flex-col items-center justify-center bg-gradient-to-tr from-[#6B0E23] to-[#8C1D38]">
                <Lock className="w-10 h-10 text-[#E6CA65] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-serif-cormorant uppercase tracking-widest text-[#E6CA65] font-bold">
                  Tap To Unlock
                </span>
              </div>
            </motion.div>
          </motion.div>

          <button
            onClick={handleUnlockHeart}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-base sm:text-lg font-serif-cormorant font-bold tracking-wide border-2 border-[#E6CA65] hover:scale-105 active:scale-95 transition-all shadow-[0_12px_40px_rgba(107,14,35,0.6)] cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#E6CA65]" />
            <span>Reveal What's in My Heart</span>
            <Heart className="w-5 h-5 text-[#E6CA65] fill-[#E6CA65]" />
          </button>
        </div>
      )}

      {/* Unlocked Final Message */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl"
          >
            {/* Glowing Unlocked Heart Emblem */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[#E6CA65] to-[#FFFDF8] p-1 shadow-[0_0_35px_rgba(230,202,101,0.7)] flex items-center justify-center"
            >
              <Unlock className="w-8 h-8 text-[#6B0E23]" />
            </motion.div>

            {/* Final Message Box */}
            <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#2E0514]/90 via-[#1A0411]/95 to-[#0B0208] border-2 border-[#E6CA65] shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-center relative overflow-hidden mb-8">
              <div className="space-y-4 font-serif-cormorant text-base sm:text-lg text-[#FDF9EE] leading-relaxed">
                <h3 className="font-script-romantic text-3xl sm:text-5xl text-[#E6CA65] font-bold mb-3">
                  Happy Karva Chauth, My Baby, My Woman.
                </h3>

                <div className="py-2 px-5 rounded-full bg-[#6B0E23]/60 border border-[#E6CA65]/60 text-xs sm:text-sm text-[#FDF9EE] font-serif-cormorant font-bold shadow-md my-2 inline-block">
                  I ❤️ u baby · ummmaaaaa 😘😘😘😘 · baby ummaaa · ummmaaaah
                </div>

                <p>
                  Out of all the little things this world has to offer, I am grateful for the moments that bring me closer to you.
                </p>

                <p>
                  I hope this little journey made you smile, gave you a few butterflies, and reminded you that someone wanted to make your day a little more beautiful.
                </p>

                <p className="font-medium text-[#E6CA65] text-lg sm:text-xl">
                  You are not just a part of this little website. <br />
                  <span className="font-bold underline decoration-[#A31D3D] decoration-2">
                    You are the reason I wanted to create it.
                  </span>
                </p>

                <p>
                  If I could make one wish tonight, it would be for you to always have reasons to smile, people who value your heart, and a life full of beautiful moments.
                </p>

                <p className="italic text-[#F5E6BE]/90 text-sm sm:text-base pt-2">
                  This website will end here, but the little moments worth creating together are still waiting for us.
                </p>

                <p className="font-serif-cormorant font-bold text-xl sm:text-2xl text-[#E6CA65] pt-2">
                  Happy Karva Chauth, meri jaan.
                </p>

                {/* Sender Signature */}
                <div className="pt-6 border-t border-[#E6CA65]/30 text-center">
                  <span className="font-script-romantic text-2xl text-[#E6CA65] block">
                    With all my love & kisses,
                  </span>
                  <span className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#FDF9EE] tracking-wide mt-1 block">
                    From Your Man Piyusa · To My Woman Madhusmita ❤️ Piyusa Forever
                  </span>
                  <span className="font-serif-cormorant text-sm text-[#E6CA65] block mt-1 font-semibold">
                    I ❤️ u baby · ummmaaaaa 😘😘😘😘 · baby ummaaa · ummmaaaah!
                  </span>
                </div>
              </div>
            </div>

            {/* The Two Working Final Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onRestartJourney}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#E6CA65]/60 text-sm sm:text-base font-serif-cormorant text-[#E6CA65] hover:text-white transition-all cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" />
                <span>Start Our Surprise Journey Again</span>
              </button>

              <button
                onClick={onReadLetterAgain}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#6B0E23] to-[#8C1D38] border border-[#E6CA65] text-sm sm:text-base font-serif-cormorant font-bold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_10px_30px_rgba(107,14,35,0.5)]"
              >
                <BookOpen className="w-4 h-4 text-[#E6CA65]" />
                <span>Read My Love Letter Again</span>
                <Heart className="w-4 h-4 text-[#E6CA65] fill-[#E6CA65]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
