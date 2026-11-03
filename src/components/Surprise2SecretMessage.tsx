import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Volume2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Surprise2Props {
  herName: string;
  yourName: string;
  onComplete: () => void;
}

export const Surprise2SecretMessage: React.FC<Surprise2Props> = ({
  herName,
  yourName,
  onComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const letterText = `My Baby, My Woman,

If you are reading this, it means you have opened your first little surprise.

I wish I could see your smile right now.

I wanted to make something different for you today, something that would remind you how special you are to me.

So I made this little world, where every click hides another piece of my heart.

And trust me, we are only getting started.

I ❤️ u baby... ummmaaaaa 😘😘😘😘 baby ummaaa and ummmaaaah!

Ready for your next surprise, my love?`;

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    confetti({
      particleCount: 35,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#A31D3D', '#E6CA65', '#FFFDF8', '#FF85A1'],
      ticks: 160,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVoiceNarration = () => {
    if (!('speechSynthesis' in window)) return;
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(letterText);
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 px-4">
      {/* Kicker */}
      <div className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-3">
        <span>Surprise 2 of 7</span>
        <span className="text-[#A31D3D] text-base">·</span>
        <span>A Secret Message</span>
      </div>

      <h2 className="font-serif-cormorant text-2xl sm:text-4xl text-[#FDF9EE] font-bold mb-2">
        Someone has a little something to tell you...
      </h2>
      <p className="text-sm text-[#F5E6BE]/75 font-light mb-8 max-w-md">
        {isOpen ? 'Here is the secret from my heart to yours:' : 'A handwritten letter sealed with golden wax and love.'}
      </p>

      {/* The Sealed Envelope */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-md mb-8 group cursor-pointer"
          onClick={handleOpenEnvelope}
        >
          <div className="relative rounded-2xl bg-gradient-to-b from-[#4A091A] to-[#24040C] border-2 border-[#E6CA65] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Subtle Diagonal Envelope Fold Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
                <path d="M0 0 L200 130 L400 0" stroke="#E6CA65" strokeWidth="1.5" />
                <path d="M0 240 L160 110" stroke="#E6CA65" strokeWidth="1" />
                <path d="M400 240 L240 110" stroke="#E6CA65" strokeWidth="1" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="text-xs uppercase font-serif-cormorant text-[#E6CA65] tracking-widest mb-2 opacity-90">
                Personal & Sacred
              </div>
              <div className="font-script-romantic text-2xl sm:text-3xl text-[#FDF9EE] mb-6">
                To My Cutie Pie 💋
              </div>

              {/* Heart Wax Seal */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F5E6BE] via-[#D4AF37] to-[#8C6D1F] p-1 border-2 border-white shadow-[0_0_25px_rgba(212,175,55,0.7)] flex items-center justify-center cursor-pointer"
              >
                <div className="w-full h-full rounded-full border border-[#8C6D1F]/50 flex flex-col items-center justify-center bg-gradient-to-tr from-[#C5A030] to-[#E6CA65]">
                  <Heart className="w-8 h-8 text-[#4A091A] fill-[#4A091A]" />
                  <span className="text-[9px] font-serif-cormorant font-bold text-[#4A091A] tracking-wider uppercase">
                    OPEN
                  </span>
                </div>
              </motion.button>

              <span className="text-xs font-serif-cormorant text-[#E6CA65] mt-4 tracking-wider">
                Tap wax seal to open
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleOpenEnvelope}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-base font-serif-cormorant font-semibold tracking-wide border border-[#E6CA65] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(107,14,35,0.5)] cursor-pointer"
            >
              Open My Secret Letter
            </button>
          </div>
        </motion.div>
      )}

      {/* The Revealed Letter */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl text-left"
          >
            <div className="parchment-gold rounded-3xl p-6 sm:p-10 text-[#2E1809] border-2 border-[#D4AF37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
              {/* Header Controls */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-3 mb-6">
                <span className="font-serif-cormorant text-xs uppercase tracking-widest text-[#6B0E23] font-bold">
                  Secret Letter · Karva Chauth 2026
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleVoiceNarration}
                    className="p-1.5 rounded-full bg-[#3A091A]/10 hover:bg-[#3A091A]/15 text-[#3A091A] transition-colors cursor-pointer"
                    title={isReading ? 'Stop listening' : 'Listen to letter'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-full bg-[#3A091A]/10 hover:bg-[#3A091A]/15 text-[#3A091A] transition-colors cursor-pointer"
                    title="Copy letter"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Exact Letter Content */}
              <div className="space-y-4 font-serif-cormorant text-base sm:text-lg text-[#2A1508] leading-relaxed">
                <p className="font-script-romantic text-3xl sm:text-4xl text-[#6B0E23] font-bold">
                  My Baby, My Woman,
                </p>

                <p>
                  If you are reading this, it means you have opened your first little surprise.
                </p>

                <p className="italic text-[#6B0E23] font-semibold text-lg sm:text-xl">
                  I wish I could see your smile right now.
                </p>

                <p>
                  I wanted to make something different for you today, something that would remind you how special you are to me.
                </p>

                <p>
                  So I made this little world, where every click hides another piece of my heart.
                </p>

                <p className="font-medium text-[#4A091A]">
                  And trust me, we are only getting started.
                </p>

                {/* Romantic Kisses Banner */}
                <div className="p-3 rounded-2xl bg-[#6B0E23]/10 border border-[#D4AF37]/50 text-center">
                  <p className="font-serif-cormorant text-base sm:text-lg font-bold text-[#6B0E23]">
                    I ❤️ u baby · ummmaaaaa 😘😘😘😘 · baby ummaaa · ummmaaaah!
                  </p>
                </div>

                <p className="font-script-romantic text-2xl sm:text-3xl text-[#6B0E23] pt-2">
                  Ready for your next surprise, my love?
                </p>
              </div>

              {/* Signature */}
              <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 text-right">
                <span className="font-serif-cormorant text-xl font-bold text-[#4A091A]">
                  From Your Man, {yourName || 'Piyusa'} · Forever For My Cutie Pie ❤️
                </span>
              </div>
            </div>

            {/* Next Stage Button */}
            <div className="mt-8 text-center">
              <button
                onClick={onComplete}
                className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-base sm:text-lg font-serif-cormorant font-bold tracking-wide border-2 border-[#E6CA65] hover:scale-105 active:scale-95 transition-all shadow-[0_12px_40px_rgba(107,14,35,0.6)] cursor-pointer"
              >
                <span>Yes, Show Me More</span>
                <ArrowRight className="w-5 h-5 text-[#E6CA65] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
