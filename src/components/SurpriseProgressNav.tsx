import React from 'react';
import { Moon, ChevronLeft, SlidersHorizontal, Sparkles } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer.tsx';

interface ProgressNavProps {
  activeSurprise: number;
  maxUnlockedSurprise: number;
  totalSurprises: number;
  onSelectSurprise: (stage: number) => void;
  onBack: () => void;
  musicUrl?: string;
  herName: string;
}

export const SurpriseProgressNav: React.FC<ProgressNavProps> = ({
  activeSurprise,
  maxUnlockedSurprise,
  totalSurprises,
  onSelectSurprise,
  onBack,
  musicUrl,
  herName,
}) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-[#10030C]/90 backdrop-blur-md border-b border-[#E6CA65]/20 py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2">
        {/* Left: Brand title & Subtitle */}
        <div className="flex items-center gap-2.5 min-w-0">
          {activeSurprise > 1 && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[#E6CA65] transition-colors cursor-pointer"
              title="Go back to previous surprise"
              aria-label="Previous surprise"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2 truncate">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6B0E23] to-[#A31D3D] border border-[#E6CA65]/50 flex-shrink-0 flex items-center justify-center text-[#E6CA65]">
              <Moon className="w-3.5 h-3.5 fill-[#E6CA65]" />
            </div>
            <div className="truncate">
              <span className="font-serif-cormorant font-bold text-sm sm:text-base text-[#FDF9EE] block leading-tight truncate">
                1000 Little Reasons I Love You
              </span>
              <span className="text-[10px] sm:text-xs text-[#E6CA65]/90 font-light hidden sm:block leading-none mt-0.5 truncate">
                For My Woman · Madhusmita ❤️ Piyusa · I ❤️ u baby ummmaaaaa 😘😘😘😘
              </span>
            </div>
          </div>
        </div>

        {/* Center: Surprise Progress Step Dots (Desktop & Tablet) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-center">
            <div className="text-[11px] sm:text-xs font-serif-cormorant font-bold tracking-widest uppercase text-[#E6CA65]">
              Surprise {activeSurprise} of {totalSurprises}
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5 mt-1">
              {Array.from({ length: totalSurprises }).map((_, index) => {
                const stageNum = index + 1;
                const isCurrent = stageNum === activeSurprise;
                const isUnlocked = stageNum <= maxUnlockedSurprise;

                return (
                  <button
                    key={stageNum}
                    onClick={() => {
                      if (isUnlocked) onSelectSurprise(stageNum);
                    }}
                    disabled={!isUnlocked}
                    className={`h-1.5 rounded-full transition-all ${
                      isCurrent
                        ? 'w-5 bg-[#E6CA65]'
                        : isUnlocked
                        ? 'w-2 bg-[#E6CA65]/60 hover:bg-[#E6CA65] cursor-pointer'
                        : 'w-2 bg-white/15 cursor-not-allowed'
                    }`}
                    title={isUnlocked ? `Surprise ${stageNum}` : `Locked (Surprise ${stageNum})`}
                    aria-label={`Jump to surprise ${stageNum}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Audio Player */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <AudioPlayer musicUrl={musicUrl} />
        </div>
      </div>
    </header>
  );
};
