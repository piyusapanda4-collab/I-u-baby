import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Volume2, Check, Copy, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Stage2And3Props {
  herName: string;
  yourName: string;
  isEnvelopeOpen: boolean;
  setIsEnvelopeOpen: (open: boolean) => void;
}

export const Stage2And3LetterExperience: React.FC<Stage2And3Props> = ({
  herName,
  yourName,
  isEnvelopeOpen,
  setIsEnvelopeOpen,
}) => {
  const [copied, setCopied] = useState(false);
  const [isReadingVoice, setIsReadingVoice] = useState(false);
  const letterRef = useRef<HTMLDivElement | null>(null);

  const letterText = `My Baby,

Happy Karva Chauth, meri jaan.

I wanted to make something for you today that feels a little different from an ordinary gift. Something you could open whenever you want a smile, a little warmth, or a reminder of just how special you are to me.

If I could give you one thing today, I would give you the ability to see yourself through my eyes, even for a moment. Maybe then you would understand why your smile matters so much to me, why little conversations with you can make my day, and why even the simplest moments feel different when you are part of them.

I hope your life is filled with happiness that stays, dreams that come true, people who value your heart, and moments that make you stop and think, ‘Life is beautiful.’

And whenever you look at the moon tonight, remember this: the most beautiful light in my world is not in the sky. It is the happiness you bring into my life.

Aaj chaand bhi khoobsurat hai, par meri duniya ki sabse pyaari roshni tum ho.

Thank you for being you. Thank you for the little moments, the smiles, the conversations, and all the beautiful feelings that words sometimes cannot explain.

This website is a small gift, but the love behind it is real.

Happy Karva Chauth, my baby.
May your heart always have reasons to smile.

With all my love,
${yourName || 'Piyusa'} ❤️`;

  const handleOpenEnvelope = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);

      // Heart and petal burst celebration
      confetti({
        particleCount: 50,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#A31D3D', '#E6CA65', '#FAF4E4', '#D4AF37'],
        ticks: 200,
        shapes: ['circle'],
        scalar: 1.2,
      });

      setTimeout(() => {
        if (letterRef.current) {
          letterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 400);
    }
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleVoiceNarration = () => {
    if (!('speechSynthesis' in window)) return;

    if (isReadingVoice) {
      window.speechSynthesis.cancel();
      setIsReadingVoice(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(letterText.replace(/❤️/g, ''));
    utterance.rate = 0.88;
    utterance.pitch = 1.05;

    // Pick a gentle female or male voice if available
    const voices = window.speechSynthesis.getVoices();
    const sweetVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Samantha') ||
          v.name.includes('Natural') ||
          v.name.includes('Victoria') ||
          v.name.includes('Google') ||
          v.name.includes('English'))
    );
    if (sweetVoice) {
      utterance.voice = sweetVoice;
    }

    utterance.onend = () => setIsReadingVoice(false);
    utterance.onerror = () => setIsReadingVoice(false);

    setIsReadingVoice(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="stage-envelope" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto z-10">
      {/* Stage Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.2em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-2">
          <Flame className="w-3.5 h-3.5 text-[#E6CA65]" />
          <span>Stage 2 & 3 · A Gift Unveiled</span>
          <Flame className="w-3.5 h-3.5 text-[#E6CA65]" />
        </div>
        <h2 className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl text-[#FDF9EE] font-bold">
          {isEnvelopeOpen ? 'A Little Letter From My Heart' : 'A Sealed Secret Waiting For You'}
        </h2>
        <p className="text-sm text-[#F5E6BE]/70 max-w-md mx-auto mt-2 font-light">
          {isEnvelopeOpen
            ? 'Written with all my heart for this moonlit night.'
            : 'Tap the gold wax seal below to break the seal and read your Karva Chauth letter.'}
        </p>
      </div>

      {/* ENVELOPE (Stage 2) */}
      <div className="flex justify-center mb-12">
        <motion.div
          whileHover={{ scale: isEnvelopeOpen ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenEnvelope}
          className={`relative w-full max-w-md cursor-pointer transition-all duration-500 ${
            isEnvelopeOpen ? 'opacity-95' : 'hover:shadow-[0_0_50px_rgba(230,202,101,0.25)]'
          }`}
        >
          {/* Envelope Exterior */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[#4A091A] to-[#2E0510] border-2 border-[#E6CA65]/60 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden p-6 sm:p-8">
            {/* Elegant corner flourishes */}
            <div className="absolute top-2 left-2 text-[#E6CA65]/40 text-xs font-serif-cormorant">✦</div>
            <div className="absolute top-2 right-2 text-[#E6CA65]/40 text-xs font-serif-cormorant">✦</div>
            <div className="absolute bottom-2 left-2 text-[#E6CA65]/40 text-xs font-serif-cormorant">✦</div>
            <div className="absolute bottom-2 right-2 text-[#E6CA65]/40 text-xs font-serif-cormorant">✦</div>

            {/* Subtle Diagonal Envelope Fold Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
                <path d="M0 0 L200 130 L400 0" stroke="#E6CA65" strokeWidth="1.5" />
                <path d="M0 240 L160 110" stroke="#E6CA65" strokeWidth="1" />
                <path d="M400 240 L240 110" stroke="#E6CA65" strokeWidth="1" />
              </svg>
            </div>

            {/* Envelope Center Content */}
            <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center">
              <div className="text-[#E6CA65] font-serif-cormorant tracking-widest text-xs uppercase mb-3 opacity-90">
                Personal & Confidential
              </div>
              <div className="font-script-romantic text-2xl sm:text-3xl text-[#FDF9EE] mb-1">
                To My Dearest {herName || 'Madhusmita'}
              </div>
              <div className="text-xs text-[#E6CA65]/70 tracking-wider font-light mb-6">
                From {yourName || 'Piyusa'} · Karva Chauth 2026
              </div>

              {/* Gold Wax Seal */}
              <motion.button
                type="button"
                animate={isEnvelopeOpen ? { rotate: 0, scale: 0.95 } : { scale: [1, 1.05, 1] }}
                transition={{ repeat: isEnvelopeOpen ? 0 : Infinity, duration: 2.5 }}
                className="relative group w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#F5E6BE] via-[#D4AF37] to-[#8C6D1F] p-1 shadow-[0_0_25px_rgba(212,175,55,0.6)] border-2 border-[#FFFDF8] flex items-center justify-center cursor-pointer transition-transform"
                aria-label={isEnvelopeOpen ? 'Envelope Opened' : 'Tap to break wax seal and read letter'}
              >
                {/* Inner Seal Groove */}
                <div className="w-full h-full rounded-full border border-[#8C6D1F]/50 flex flex-col items-center justify-center bg-gradient-to-tr from-[#C5A030] to-[#E6CA65]">
                  <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#4A091A] fill-[#4A091A] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-serif-cormorant font-bold text-[#4A091A] tracking-tighter uppercase mt-0.5">
                    {isEnvelopeOpen ? 'OPENED' : 'TAP SEAL'}
                  </span>
                </div>
              </motion.button>

              <div className="mt-4 text-xs font-serif-cormorant tracking-wide text-[#E6CA65]">
                {isEnvelopeOpen ? '✨ Letter Revealed Below ✨' : 'Click wax seal to open'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* LOVE LETTER (Stage 3) */}
      <AnimatePresence>
        {isEnvelopeOpen && (
          <motion.div
            ref={letterRef}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Parchment Container */}
            <div className="parchment-gold rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-[#2E1809] border-2 border-[#D4AF37]/60 shadow-[0_25px_70px_rgba(0,0,0,0.7)] relative overflow-hidden">
              {/* Delicate Watermark Diya and Moon */}
              <div className="absolute right-4 bottom-4 text-8xl opacity-5 pointer-events-none select-none font-serif-cormorant">
                🌙
              </div>
              <div className="absolute top-6 right-8 text-5xl opacity-5 pointer-events-none select-none">
                🪔
              </div>

              {/* Gold Filigree Header Border */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌙</span>
                  <span className="font-serif-cormorant text-xs sm:text-sm tracking-[0.2em] uppercase text-[#6B0E23] font-bold">
                    Karva Chauth · 29 October 2026
                  </span>
                </div>

                {/* Interactive Letter Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleVoiceNarration}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A091A]/10 hover:bg-[#3A091A]/15 text-[#3A091A] text-xs font-medium transition-colors cursor-pointer"
                    title="Read letter aloud"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {isReadingVoice ? 'Stop Reading' : 'Listen'}
                    </span>
                  </button>

                  <button
                    onClick={handleCopyLetter}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A091A]/10 hover:bg-[#3A091A]/15 text-[#3A091A] text-xs font-medium transition-colors cursor-pointer"
                    title="Copy letter text to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-700 hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <span className="font-script-romantic text-3xl sm:text-4xl text-[#6B0E23] block">
                  A Little Letter From My Heart
                </span>
                <span className="block w-24 h-0.5 bg-[#D4AF37] mx-auto mt-2 rounded-full" />
              </div>

              {/* Letter Prose (Formatted exactly as requested) */}
              <div className="space-y-5 text-sm sm:text-base leading-relaxed font-sans text-[#2A1508]/90 font-normal">
                <p className="font-script-romantic text-2xl sm:text-3xl text-[#4A091A] font-semibold">
                  My Baby,
                </p>

                <p className="italic font-serif-cormorant text-lg sm:text-xl text-[#6B0E23] font-semibold">
                  Happy Karva Chauth, meri jaan.
                </p>

                <p>
                  I wanted to make something for you today that feels a little different from an ordinary gift. Something you could open whenever you want a smile, a little warmth, or a reminder of just how special you are to me.
                </p>

                <p>
                  If I could give you one thing today, I would give you the ability to see yourself through my eyes, even for a moment. Maybe then you would understand why your smile matters so much to me, why little conversations with you can make my day, and why even the simplest moments feel different when you are part of them.
                </p>

                <p>
                  I hope your life is filled with happiness that stays, dreams that come true, people who value your heart, and moments that make you stop and think, ‘Life is beautiful.’
                </p>

                <p>
                  And whenever you look at the moon tonight, remember this: the most beautiful light in my world is not in the sky. It is the happiness you bring into my life.
                </p>

                {/* Highlighted Hindi/Romantic Line */}
                <div className="my-6 py-4 px-5 rounded-xl bg-[#6B0E23]/10 border-l-4 border-[#6B0E23] text-center sm:text-left">
                  <p className="font-serif-cormorant italic text-lg sm:text-xl md:text-2xl text-[#6B0E23] font-bold">
                    “Aaj chaand bhi khoobsurat hai, par meri duniya ki sabse pyaari roshni tum ho.”
                  </p>
                </div>

                <p>
                  Thank you for being you. Thank you for the little moments, the smiles, the conversations, and all the beautiful feelings that words sometimes cannot explain.
                </p>

                <p>
                  This website is a small gift, but the love behind it is real.
                </p>

                <p className="font-serif-cormorant text-lg font-semibold text-[#4A091A]">
                  Happy Karva Chauth, my baby. <br />
                  May your heart always have reasons to smile.
                </p>

                {/* Sign-off */}
                <div className="pt-6 border-t border-[#D4AF37]/30 flex flex-col items-end">
                  <span className="font-script-romantic text-xl sm:text-2xl text-[#6B0E23]">
                    With all my love,
                  </span>
                  <span className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#4A091A] tracking-wide mt-1">
                    {yourName || 'Piyusa'} ❤️
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
