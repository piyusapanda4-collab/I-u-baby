import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LittleThingItem {
  id: string;
  title: string;
  subtitle: string;
  message: string;
  icon: 'smile' | 'heart' | 'sparkles';
  accentColor: string;
}

const ITEMS: LittleThingItem[] = [
  {
    id: 'smile',
    title: 'Your Smile',
    subtitle: 'The warmth that brightens my day',
    message: 'You make my ordinary days feel a little more beautiful.',
    icon: 'smile',
    accentColor: '#E6CA65',
  },
  {
    id: 'heart',
    title: 'Your Heart',
    subtitle: 'Pure, kind, and irreplaceable',
    message:
      'I cherish who you are, the little things that make you unique, and the warmth you bring into my life.',
    icon: 'heart',
    accentColor: '#FF6B8B',
  },
  {
    id: 'memories',
    title: 'Our Memories',
    subtitle: 'Every laugh, every walk, every glance',
    message: 'The little moments we share are the ones I want to keep close to my heart.',
    icon: 'sparkles',
    accentColor: '#D4AF37',
  },
];

export const Stage4LittleThings: React.FC = () => {
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    const isNowRevealed = !revealedIds[id];
    setRevealedIds((prev) => ({ ...prev, [id]: isNowRevealed }));

    if (isNowRevealed) {
      // Get click coordinate for localized confetti burst
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 18,
        spread: 45,
        origin: { x, y },
        colors: ['#E6CA65', '#A31D3D', '#FF85A1', '#FFF'],
        ticks: 120,
        shapes: ['circle'],
        scalar: 0.9,
      });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'smile':
        return <Smile className="w-6 h-6 text-[#E6CA65]" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-[#FF6B8B] fill-[#FF6B8B]" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-[#E6CA65]" />;
    }
  };

  return (
    <section id="stage-little-things" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-3"
        >
          <span>Stage 4</span>
          <span className="text-[#A31D3D] text-base">·</span>
          <span>Tap to Discover</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl text-[#FDF9EE] font-bold tracking-tight mb-4"
        >
          The Little Things I Love
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base text-[#F5E6BE]/75 max-w-lg mx-auto font-light leading-relaxed"
        >
          Tap each card below to unveil the quiet treasures that live in my heart every single day.
        </motion.p>
      </div>

      {/* 3 Interactive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {ITEMS.map((item, idx) => {
          const isRevealed = !!revealedIds[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              onClick={(e) => handleCardClick(item.id, e)}
              className="group relative cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-expanded={isRevealed}
              aria-label={`${item.title}. ${isRevealed ? 'Revealed' : 'Tap to reveal'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item.id, e as unknown as React.MouseEvent);
                }
              }}
            >
              {/* Outer Glow Halo on Revealed */}
              <div
                className={`absolute -inset-0.5 rounded-3xl transition-opacity duration-500 blur-xl ${
                  isRevealed
                    ? 'opacity-60 bg-gradient-to-r from-[#A31D3D] via-[#E6CA65] to-[#8C1D38]'
                    : 'opacity-0 group-hover:opacity-30 bg-gradient-to-r from-[#A31D3D]/50 to-[#E6CA65]/50'
                }`}
              />

              {/* Card Container */}
              <div
                className={`relative h-full min-h-[260px] rounded-2xl p-7 flex flex-col justify-between transition-all duration-500 border ${
                  isRevealed
                    ? 'bg-gradient-to-b from-[#2E0510] via-[#1F0812] to-[#120B1D] border-[#E6CA65]/80 shadow-[0_15px_40px_rgba(163,29,61,0.35)]'
                    : 'bg-gradient-to-b from-[#1C0F22]/90 to-[#0F0717]/90 border-[#E6CA65]/20 hover:border-[#E6CA65]/50'
                }`}
              >
                {/* Top Row: Icon & Status indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isRevealed
                        ? 'bg-[#E6CA65]/20 shadow-[0_0_20px_rgba(230,202,101,0.3)]'
                        : 'bg-white/5 group-hover:bg-white/10'
                    }`}
                  >
                    {getIcon(item.icon)}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-serif-cormorant tracking-wider">
                    {isRevealed ? (
                      <span className="flex items-center gap-1 text-[#E6CA65]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Revealed</span>
                      </span>
                    ) : (
                      <span className="text-[#F5E6BE]/50 group-hover:text-[#E6CA65] transition-colors">
                        Tap to reveal ✦
                      </span>
                    )}
                  </div>
                </div>

                {/* Center Content: Title & Revealed message */}
                <div className="my-auto py-2">
                  <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#FDF9EE] mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  <AnimatePresence mode="wait">
                    {isRevealed ? (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="mt-2"
                      >
                        <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#FDF9EE] leading-snug font-medium border-l-2 border-[#E6CA65] pl-3 py-1">
                          “{item.message}”
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-1"
                      >
                        <p className="text-sm text-[#F5E6BE]/60 font-light leading-relaxed">
                          {item.subtitle}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom decorative row */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#E6CA65]/60 font-serif-cormorant tracking-widest">
                  <span>0{idx + 1}</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {isRevealed ? '♥ Forever' : 'Touch to open →'}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
