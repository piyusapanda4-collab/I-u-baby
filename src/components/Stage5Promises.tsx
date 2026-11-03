import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface PromiseData {
  number: string;
  headline: string;
  message: string;
  icon: typeof ShieldCheck;
  subtext: string;
}

const PROMISES: PromiseData[] = [
  {
    number: '01',
    headline: 'To Bring You Smiles',
    message: 'I will keep finding little ways to make you smile.',
    subtext: 'In spontaneous coffees, silly jokes, surprise notes, and soft reassurance.',
    icon: Sparkles,
  },
  {
    number: '02',
    headline: 'To Cherish Your Soul',
    message: 'I will respect your feelings, listen to your heart, and appreciate the person you are.',
    subtext: 'Your voice is sacred to me. I will stand with you with deep patience and care.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    headline: 'To Be Your Anchor',
    message:
      'I will keep reminding you that you matter, especially on days when life feels a little difficult.',
    subtext: 'Whenever the world feels overwhelming, my arms will always be your quiet shelter.',
    icon: Heart,
  },
];

export const Stage5Promises: React.FC = () => {
  return (
    <section id="stage-promises" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-3"
        >
          <span>Stage 5</span>
          <span className="text-[#A31D3D] text-base">·</span>
          <span>Sacred Vows</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl text-[#FDF9EE] font-bold tracking-tight mb-4"
        >
          Promises From My Heart
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base text-[#F5E6BE]/75 max-w-lg mx-auto font-light leading-relaxed"
        >
          Karva Chauth is a day of timeless devotion. These are not just words for today, but promises I hold for every sunrise and moonlit night we share.
        </motion.p>
      </div>

      {/* Promises Layout: Vertical on mobile, 3-column balanced on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {PROMISES.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative group rounded-3xl p-8 sm:p-9 bg-gradient-to-b from-[#240B17]/80 to-[#12050E]/80 border border-[#E6CA65]/25 hover:border-[#E6CA65]/60 transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              {/* Subtle Ambient Gold Radiance */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6CA65]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E6CA65]/10 transition-colors" />

              {/* Card Header: Roman / Decorative Number & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif-cormorant text-2xl font-bold tracking-widest text-[#E6CA65] opacity-90 border-b border-[#E6CA65]/30 pb-1">
                    {item.number}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#A31D3D]/25 border border-[#E6CA65]/30 flex items-center justify-center text-[#E6CA65] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-[#E6CA65]" />
                  </div>
                </div>

                <div className="font-script-romantic text-xl text-[#E6CA65] mb-3">
                  {item.headline}
                </div>

                {/* Primary Message (exact user prompt text) */}
                <p className="font-serif-cormorant text-xl sm:text-2xl text-[#FDF9EE] font-medium leading-relaxed tracking-wide mb-4">
                  “{item.message}”
                </p>
              </div>

              {/* Subtext and decorative line */}
              <div className="pt-6 border-t border-white/10 mt-4">
                <p className="text-xs sm:text-sm text-[#F5E6BE]/65 font-light leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
