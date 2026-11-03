import React, { useState, useEffect } from 'react';
import { Heart, Moon, SlidersHorizontal, Menu, X } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer.tsx';

interface NavbarProps {
  herName: string;
  onOpenPersonalize: () => void;
  musicUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  herName,
  onOpenPersonalize,
  musicUrl,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#12040D]/90 backdrop-blur-md border-b border-[#E6CA65]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6B0E23] to-[#A31D3D] border border-[#E6CA65]/50 flex items-center justify-center text-[#E6CA65] shadow-[0_0_15px_rgba(230,202,101,0.3)]">
            <Moon className="w-4 h-4 fill-[#E6CA65]" />
          </div>
          <div>
            <span className="font-serif-cormorant font-bold text-base sm:text-lg text-[#FDF9EE] tracking-wide block leading-none">
              My Moon, My Love
            </span>
            <span className="font-script-romantic text-xs text-[#E6CA65] block mt-0.5 leading-none">
              For {herName || 'Madhusmita'} ❤️
            </span>
          </div>
        </button>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-serif-cormorant tracking-widest uppercase text-[#F5E6BE]/80">
          <button
            onClick={() => scrollTo('stage-envelope')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Love Letter
          </button>
          <button
            onClick={() => scrollTo('stage-little-things')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Little Things
          </button>
          <button
            onClick={() => scrollTo('stage-promises')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Promises
          </button>
          <button
            onClick={() => scrollTo('stage-gallery')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Memories
          </button>
          <button
            onClick={() => scrollTo('stage-moonlit-surprise')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer text-[#E6CA65]"
          >
            Virtual Hug ✦
          </button>
        </nav>

        {/* Actions: Audio & Personalize */}
        <div className="flex items-center gap-2 sm:gap-3">
          <AudioPlayer musicUrl={musicUrl} />

          <button
            onClick={onOpenPersonalize}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#F5E6BE]/80 hover:text-white transition-colors cursor-pointer"
            title="Personalize names and photos"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E6CA65]" />
            <span>Customize</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 px-4 py-4 bg-[#14050F]/95 backdrop-blur-xl border-b border-[#E6CA65]/20 flex flex-col gap-3 text-sm font-serif-cormorant tracking-wider">
          <button
            onClick={() => scrollTo('stage-envelope')}
            className="text-left py-2 text-[#FDF9EE] hover:text-[#E6CA65] border-b border-white/5"
          >
            💌 The Love Letter
          </button>
          <button
            onClick={() => scrollTo('stage-little-things')}
            className="text-left py-2 text-[#FDF9EE] hover:text-[#E6CA65] border-b border-white/5"
          >
            ✨ The Little Things I Love
          </button>
          <button
            onClick={() => scrollTo('stage-promises')}
            className="text-left py-2 text-[#FDF9EE] hover:text-[#E6CA65] border-b border-white/5"
          >
            💍 Promises From My Heart
          </button>
          <button
            onClick={() => scrollTo('stage-gallery')}
            className="text-left py-2 text-[#FDF9EE] hover:text-[#E6CA65] border-b border-white/5"
          >
            📸 Our Memory Gallery
          </button>
          <button
            onClick={() => scrollTo('stage-moonlit-surprise')}
            className="text-left py-2 text-[#E6CA65] border-b border-white/5"
          >
            🌙 Send Me a Million Hugs
          </button>
          <div className="pt-2 flex justify-between items-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPersonalize();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#E6CA65] font-sans"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Personalize Names & Photos</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
