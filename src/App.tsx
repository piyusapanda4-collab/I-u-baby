import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { StarrySkyCanvas } from './components/StarrySkyCanvas.tsx';
import { RosePetalsOverlay } from './components/RosePetalsOverlay.tsx';
import { SurpriseProgressNav } from './components/SurpriseProgressNav.tsx';
import { Surprise1Beginning } from './components/Surprise1Beginning.tsx';
import { Surprise2SecretMessage } from './components/Surprise2SecretMessage.tsx';
import { Surprise3Reasons } from './components/Surprise3Reasons.tsx';
import { Surprise4MemoryWorld } from './components/Surprise4MemoryWorld.tsx';
import { Surprise5GiftFromTheHeart } from './components/Surprise5GiftFromTheHeart.tsx';
import { Surprise6MoonMoment } from './components/Surprise6MoonMoment.tsx';
import { Surprise7FinalSecret } from './components/Surprise7FinalSecret.tsx';
import { DEFAULT_CONFIG } from './config/defaultConfig.ts';

export default function App() {
  const config = DEFAULT_CONFIG;

  const [activeSurprise, setActiveSurprise] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('karva_chauth_active_surprise');
      if (saved) {
        const num = parseInt(saved, 10);
        if (num >= 1 && num <= 7) return num;
      }
    } catch {
      // Fallback
    }
    return 1;
  });

  const [maxUnlockedSurprise, setMaxUnlockedSurprise] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('karva_chauth_max_unlocked');
      if (saved) {
        const num = parseInt(saved, 10);
        if (num >= 1 && num <= 7) return num;
      }
    } catch {
      // Fallback
    }
    return 1;
  });

  // Sync progress & scroll to top
  useEffect(() => {
    try {
      localStorage.setItem('karva_chauth_active_surprise', activeSurprise.toString());
      localStorage.setItem('karva_chauth_max_unlocked', maxUnlockedSurprise.toString());
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSurprise, maxUnlockedSurprise]);

  const handleAdvanceTo = (nextStage: number) => {
    setMaxUnlockedSurprise((prev) => Math.max(prev, nextStage));
    setActiveSurprise(nextStage);
  };

  const handleBack = () => {
    if (activeSurprise > 1) {
      setActiveSurprise((prev) => prev - 1);
    }
  };

  const handleRestartJourney = () => {
    setActiveSurprise(1);
    setMaxUnlockedSurprise(1);
    try {
      localStorage.removeItem('karva_chauth_active_surprise');
      localStorage.removeItem('karva_chauth_max_unlocked');
    } catch {
      // Ignore
    }
  };

  const handleReadLetterAgain = () => {
    setActiveSurprise(2);
  };

  const floatInVariants: Variants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.98,
      filter: 'blur(3px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12,
        delayChildren: 0.1,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      y: -22,
      scale: 0.97,
      filter: 'blur(2px)',
      transition: {
        duration: 0.45,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#070105] text-[#FDF9EE] selection:bg-[#A31D3D] selection:text-[#FFFDF8] overflow-x-hidden font-sans flex flex-col justify-between">
      {/* Background Celestial Stars, Glowing Moon & Rose Petals */}
      <StarrySkyCanvas />

      {/* Floating SVG Rose Petals Decorative Overlay */}
      <RosePetalsOverlay />

      {/* Progress & Surprise Stepper Header */}
      <SurpriseProgressNav
        activeSurprise={activeSurprise}
        maxUnlockedSurprise={maxUnlockedSurprise}
        totalSurprises={7}
        onSelectSurprise={(stage) => setActiveSurprise(stage)}
        onBack={handleBack}
        musicUrl={config.musicUrl}
        herName={config.herName}
      />

      {/* Main Single-Active-Surprise Journey Container */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-2 sm:px-4 py-8">
        <AnimatePresence mode="wait">
          {activeSurprise === 1 && (
            <motion.div
              key="surprise-1"
              variants={floatInVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full animate-float-in"
            >
              <Surprise1Beginning
                herName={config.herName}
                onComplete={() => handleAdvanceTo(2)}
              />
            </motion.div>
          )}

          {activeSurprise === 2 && (
            <motion.div
              key="surprise-2"
              variants={floatInVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full animate-float-in"
            >
              <Surprise2SecretMessage
                herName={config.herName}
                yourName={config.yourName}
                onComplete={() => handleAdvanceTo(3)}
              />
            </motion.div>
          )}

          {activeSurprise === 3 && (
            <motion.div
              key="surprise-3"
              variants={floatInVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full animate-float-in"
            >
              <Surprise3Reasons onComplete={() => handleAdvanceTo(4)} />
            </motion.div>
          )}

          {activeSurprise === 4 && (
            <motion.div
              key="surprise-4"
              variants={floatInVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full animate-float-in"
            >
              <Surprise4MemoryWorld
                photos={config.photos}
                allPhotos={config.allPhotos}
                loveLetters={config.loveLetters}
                onComplete={() => handleAdvanceTo(5)}
              />
            </motion.div>
          )}

          {activeSurprise === 5 && (
            <motion.div
              key="surprise-5"
              variants={floatInVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full animate-float-in"
            >
              <Surprise5GiftFromTheHeart onComplete={() => handleAdvanceTo(6)} />
            </motion.div>
          )}

          {activeSurprise === 6 && (
            <motion.div
              key="surprise-6"
              variants={floatInVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full animate-float-in"
            >
              <Surprise6MoonMoment
                herName={config.herName}
                onComplete={() => handleAdvanceTo(7)}
              />
            </motion.div>
          )}

          {activeSurprise === 7 && (
            <motion.div
              key="surprise-7"
              variants={floatInVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full animate-float-in"
            >
              <Surprise7FinalSecret
                herName={config.herName}
                yourName={config.yourName}
                onRestartJourney={handleRestartJourney}
                onReadLetterAgain={handleReadLetterAgain}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Subtle Footer Note */}
      <footer className="relative z-10 py-4 text-center text-[11px] sm:text-xs text-[#E6CA65]/80 font-serif-cormorant tracking-widest uppercase px-4 space-y-1">
        <p>Karva Chauth · 29 October 2026 · Madhusmita ❤️ Piyusa Forever</p>
        <p className="text-[10px] text-[#FFB6C1]/80 normal-case font-medium">
          I ❤️ u baby · ummmaaaaa 😘😘😘😘 · baby ummaaa · ummmaaaah
        </p>
      </footer>
    </div>
  );
}
