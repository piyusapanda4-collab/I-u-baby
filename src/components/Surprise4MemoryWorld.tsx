import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryAlbumPhoto, GalleryPhoto, LoveQuoteLetter } from '../types.ts';
import {
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  Heart,
  Sparkles,
  Grid3X3,
  Film,
  ArrowRight,
  Compass,
  Umbrella,
  Flame,
  Camera,
  BookOpen,
  Volume2,
  Copy,
  Check,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Surprise4Props {
  photos: GalleryPhoto[];
  allPhotos: MemoryAlbumPhoto[];
  loveLetters: LoveQuoteLetter[];
  onComplete: () => void;
}

export const Surprise4MemoryWorld: React.FC<Surprise4Props> = ({
  photos,
  allPhotos,
  loveLetters,
  onComplete,
}) => {
  // Main view tab: 'letters' (7 love notes), 'photos' (15 personal pictures), or 'all'
  const [activeTab, setActiveTab] = useState<'letters' | 'photos' | 'all'>('letters');
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>('all');
  const [photoViewMode, setPhotoViewMode] = useState<'grid' | 'spotlight'>('grid');
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);

  // Unified lightbox support
  const [activeItem, setActiveItem] = useState<{
    type: 'letter' | 'photo';
    title: string;
    url: string;
    quoteOrStory: string;
    noteOrDedication?: string;
    tag?: string;
    rawText?: string;
  } | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  const photoCategories = [
    { id: 'all', label: 'All 15 Photos', icon: Sparkles, count: allPhotos.length },
    { id: 'umbrella', label: 'Under Our Umbrella', icon: Umbrella, count: 2 },
    { id: 'hugs', label: 'Warm Hugs & Smiles', icon: Heart, count: 5 },
    { id: 'adventures', label: 'Adventures & Heritage', icon: Compass, count: 5 },
    { id: 'festive', label: 'Festive & Blessings', icon: Flame, count: 3 },
  ];

  const filteredPhotos =
    selectedPhotoCategory === 'all'
      ? allPhotos
      : allPhotos.filter((p) => p.category === selectedPhotoCategory);

  const openLetterLightbox = (letter: LoveQuoteLetter, idx: number) => {
    setActiveItem({
      type: 'letter',
      title: letter.title,
      url: letter.url,
      quoteOrStory: letter.writtenText,
      noteOrDedication: letter.dedication,
      tag: letter.tag,
      rawText: letter.letterSentence,
    });
    setActiveItemIndex(idx);
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#E6CA65', '#A31D3D', '#FF6B8B'],
    });
  };

  const openPhotoLightbox = (photo: MemoryAlbumPhoto, idx: number) => {
    setActiveItem({
      type: 'photo',
      title: photo.title,
      url: photo.url,
      quoteOrStory: photo.story,
      noteOrDedication: photo.romanticNote,
      tag: photo.tag,
    });
    setActiveItemIndex(idx);
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.6 },
      colors: ['#E6CA65', '#A31D3D', '#FF6B8B'],
    });
  };

  const handleCopyQuote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakQuote = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 px-3 sm:px-6">
      {/* Top Occasion Kicker */}
      <div className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
        <span>Surprise 4 of 7 · Our Love Letters & Memory World</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
      </div>

      <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#FDF9EE] font-bold tracking-tight mb-2">
        Little Moments, Big Feelings
      </h2>

      {/* Sweet Kiss Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#6B0E23]/70 border border-[#E6CA65]/60 text-xs sm:text-sm text-[#FDF9EE] font-serif-cormorant font-bold mb-4 shadow-[0_0_20px_rgba(230,202,101,0.3)]">
        <span>I ❤️ u baby · ummmaaaaa 😘😘😘😘 · baby ummaaa · ummmaaaah</span>
      </div>

      <p className="text-sm sm:text-base text-[#F5E6BE]/90 font-light max-w-2xl leading-relaxed mb-6">
        Dedicated with infinite devotion to my baby, my woman, my cutie pie.{' '}
        <span className="text-[#E6CA65] font-serif-cormorant font-semibold">
          Madhusmita ❤️ Piyusa forever
        </span>
        .
      </p>

      {/* FEATURED SPECIAL HIGHLIGHT: LIPSTICK SWATCHES FOR MY WOMAN */}
      <div className="w-full mb-8 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#3A061B]/95 via-[#1E0513]/95 to-[#3A061B]/95 border-2 border-[#E6CA65]/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-center gap-6 text-left">
        <div
          className="relative w-full md:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden bg-black/80 border border-[#E6CA65]/50 group cursor-pointer flex-shrink-0"
          onClick={() => {
            const lipstickNote = loveLetters.find((l) => l.id === 'letter-kisses') || loveLetters[loveLetters.length - 1];
            openLetterLightbox(lipstickNote, loveLetters.length - 1);
          }}
        >
          <img
            src="/assets/aistudio/IMG20261011000009_a7471e5d.jpg"
            alt="Testing lipstick shades on hand for my woman"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 romantic-photo-filter"
          />
          <div className="romantic-vignette-overlay" />
          <div className="romantic-warm-sheen" />
          <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-[#6B0E23]/90 border border-[#E6CA65]/60 text-[10px] font-serif-cormorant text-[#E6CA65] font-bold tracking-widest uppercase">
            💄 Kisses & Lipsticks
          </div>
          <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <Maximize2 className="w-4 h-4 text-[#E6CA65]" />
          </div>
        </div>

        <div className="w-full md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif-cormorant text-[#E6CA65] tracking-widest uppercase font-bold mb-1.5">
              <Heart className="w-4 h-4 fill-[#FF6B8B] text-[#FF6B8B]" />
              <span>Dedicated To My Baby, My Woman, My Cutie Pie</span>
            </div>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#FDF9EE] leading-tight mb-2">
              Lipstick Swatches On My Hand For You
            </h3>
            <p className="font-serif-cormorant italic text-base sm:text-lg text-[#E6CA65] mb-2 leading-relaxed">
              “Testing deep wine & rose shades on my hand to find the perfect color for your sweet lips... ummmaaaaa 😘😘😘😘 baby ummaaa!”
            </p>
            <p className="text-xs sm:text-sm text-[#F5E6BE]/80 font-light leading-relaxed mb-4">
              From your man: Finding the prettiest lipstick shades for my queen. Every kiss from those lips is my heaven. I ❤️ u baby... ummmaaaah!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
            <button
              onClick={() => {
                confetti({
                  particleCount: 40,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#FF6B8B', '#E6CA65', '#A31D3D', '#FFB6C1'],
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B0E23] hover:bg-[#8C1D38] border border-[#E6CA65] text-xs font-serif-cormorant font-bold text-[#FDF9EE] cursor-pointer transition-all shadow-md active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-[#FF6B8B] text-[#FF6B8B]" />
              <span>Send 1000 Kisses 😘 (ummmaaaaa!)</span>
            </button>
            <span className="text-xs text-[#E6CA65] font-serif-cormorant">
              Click photo to zoom swatch
            </span>
          </div>
        </div>
      </div>

      {/* Romantic Tab Switcher */}
      <div className="w-full max-w-2xl flex items-center justify-center p-1.5 rounded-full bg-[#1A0412]/80 border-2 border-[#E6CA65]/40 backdrop-blur-md mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <button
          onClick={() => setActiveTab('letters')}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs sm:text-sm font-serif-cormorant font-bold transition-all cursor-pointer ${
            activeTab === 'letters'
              ? 'bg-gradient-to-r from-[#6B0E23] to-[#8C1D38] text-[#FDF9EE] border border-[#E6CA65] shadow-[0_0_15px_rgba(230,202,101,0.4)]'
              : 'text-[#F5E6BE]/70 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#E6CA65]" />
          <span>{loveLetters.length} Sacred Love Notes & Quotes</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-[#E6CA65]">
            {loveLetters.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs sm:text-sm font-serif-cormorant font-bold transition-all cursor-pointer ${
            activeTab === 'photos'
              ? 'bg-gradient-to-r from-[#6B0E23] to-[#8C1D38] text-[#FDF9EE] border border-[#E6CA65] shadow-[0_0_15px_rgba(230,202,101,0.4)]'
              : 'text-[#F5E6BE]/70 hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4 text-[#E6CA65]" />
          <span>{allPhotos.length} Cherished Photographs</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-[#E6CA65]">
            {allPhotos.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`hidden sm:inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-xs sm:text-sm font-serif-cormorant font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-gradient-to-r from-[#6B0E23] to-[#8C1D38] text-[#FDF9EE] border border-[#E6CA65] shadow-[0_0_15px_rgba(230,202,101,0.4)]'
              : 'text-[#F5E6BE]/70 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
          <span>All {loveLetters.length + allPhotos.length} Keepsakes</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LOVE LETTERS & SACRED QUOTES (From a Man to His Woman)        */}
      {/* ========================================================================= */}
      {(activeTab === 'letters' || activeTab === 'all') && (
        <div className="w-full mb-12">
          {/* Section Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#2B0514]/90 via-[#180410]/95 to-[#2B0514]/90 border border-[#E6CA65]/40 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div>
              <div className="flex items-center gap-2 text-xs font-serif-cormorant text-[#E6CA65] tracking-widest uppercase font-bold">
                <Heart className="w-3.5 h-3.5 fill-[#FF6B8B] text-[#FF6B8B]" />
                <span>Written For My Woman · From Her Man</span>
              </div>
              <h3 className="font-serif-cormorant text-xl sm:text-2xl text-[#FDF9EE] font-bold mt-1">
                Sacred Love Notes & Quotes Written From My Soul
              </h3>
              <p className="text-xs text-[#F5E6BE]/75 font-light mt-0.5">
                Every sentence and calligraphy note below was chosen and written for you with infinite devotion.
              </p>
            </div>
            <span className="text-xs font-serif-cormorant px-3 py-1 rounded-full bg-[#6B0E23]/70 border border-[#E6CA65]/50 text-[#E6CA65] font-semibold whitespace-nowrap">
              Madhusmita ❤️ Piyusa
            </span>
          </div>

          {/* Cards Grid for the Love Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loveLetters.map((letter, idx) => (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#280616] via-[#1A0411] to-[#0D0208] border-2 border-[#E6CA65]/50 hover:border-[#E6CA65] shadow-[0_18px_45px_rgba(0,0,0,0.8)] flex flex-col text-left transition-all"
              >
                {/* Visual Attachment Header */}
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden bg-black/80 cursor-pointer"
                  onClick={() => openLetterLightbox(letter, idx)}
                >
                  <img
                    src={letter.url}
                    alt={letter.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 romantic-photo-filter"
                    loading="lazy"
                  />
                  {/* Romantic Aesthetic Filters */}
                  <div className="romantic-vignette-overlay" />
                  <div className="romantic-warm-sheen" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0411] via-transparent to-black/30 pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-0.5 rounded-full bg-[#6B0E23]/90 border border-[#E6CA65]/60 text-[10px] font-serif-cormorant text-[#E6CA65] font-bold tracking-widest uppercase backdrop-blur-md">
                    Note 0{idx + 1} · {letter.tag}
                  </div>

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5 text-[#E6CA65]" />
                  </div>
                </div>

                {/* Letter Text & Sentence Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <div className="flex items-center justify-between text-xs text-[#E6CA65] font-serif-cormorant mb-1.5">
                      <span className="tracking-widest uppercase font-semibold">
                        {letter.date || 'Sacred Dedication'}
                      </span>
                      <Heart className="w-3.5 h-3.5 fill-[#FF6B8B] text-[#FF6B8B]" />
                    </div>

                    <h4 className="font-serif-cormorant text-xl font-bold text-[#FDF9EE] leading-snug group-hover:text-[#E6CA65] transition-colors mb-3">
                      {letter.title}
                    </h4>

                    {/* Transcribed Quote from Image */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#4A091A]/30 to-[#2A0510]/50 border-l-4 border-[#E6CA65] mb-3">
                      <p className="font-serif-cormorant italic text-base text-[#FDF9EE] font-medium leading-relaxed">
                        “{letter.writtenText}”
                      </p>
                    </div>

                    {/* Sentence written on image */}
                    <p className="text-xs text-[#E6CA65] font-serif-cormorant tracking-wide mb-3">
                      ✦ {letter.letterSentence}
                    </p>

                    {/* Man to Woman Dedication Note */}
                    <p className="text-xs text-[#F5E6BE]/80 font-light leading-relaxed mb-4">
                      {letter.dedication}
                    </p>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeakQuote(letter.writtenText, letter.id)}
                        className="p-1.5 rounded-full bg-white/5 hover:bg-[#6B0E23] text-[#E6CA65] hover:text-white transition-colors cursor-pointer"
                        title={speakingId === letter.id ? 'Stop listening' : 'Listen to this quote'}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopyQuote(letter.writtenText, letter.id)}
                        className="p-1.5 rounded-full bg-white/5 hover:bg-[#6B0E23] text-[#E6CA65] hover:text-white transition-colors cursor-pointer"
                        title="Copy quote"
                      >
                        {copiedId === letter.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => openLetterLightbox(letter, idx)}
                      className="inline-flex items-center gap-1 text-xs text-[#E6CA65] font-serif-cormorant font-bold hover:underline cursor-pointer group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Full Letter</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: 15 CHERISHED PHOTOGRAPHS (Scrapbook & Spotlight Modes)         */}
      {/* ========================================================================= */}
      {(activeTab === 'photos' || activeTab === 'all') && (
        <div className="w-full mb-12">
          {/* Controls Bar for Photographs */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-[#180410]/70 p-3 sm:p-4 rounded-2xl border border-[#E6CA65]/30 backdrop-blur-md">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {photoCategories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedPhotoCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedPhotoCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif-cormorant tracking-wide transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#6B0E23] to-[#8C1D38] text-[#FDF9EE] border border-[#E6CA65] shadow-[0_0_15px_rgba(230,202,101,0.3)] font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-[#F5E6BE]/70 border border-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3 text-[#E6CA65]" />
                    <span>{cat.label}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-[#E6CA65]">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Switcher: Grid vs Spotlight */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setPhotoViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-serif-cormorant transition-all cursor-pointer ${
                  photoViewMode === 'grid'
                    ? 'bg-[#6B0E23] text-white font-bold border border-[#E6CA65]/40'
                    : 'text-[#F5E6BE]/60 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5 text-[#E6CA65]" />
                <span>Scrapbook</span>
              </button>
              <button
                onClick={() => setPhotoViewMode('spotlight')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-serif-cormorant transition-all cursor-pointer ${
                  photoViewMode === 'spotlight'
                    ? 'bg-[#6B0E23] text-white font-bold border border-[#E6CA65]/40'
                    : 'text-[#F5E6BE]/60 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-[#E6CA65]" />
                <span>Spotlight</span>
              </button>
            </div>
          </div>

          {/* VIEW: SPOTLIGHT MODE */}
          {photoViewMode === 'spotlight' && (
            <div className="w-full max-w-4xl mx-auto mb-10">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#2E0514]/90 to-[#12030B] border-2 border-[#E6CA65]/60 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-4 sm:p-8 flex flex-col md:flex-row items-center gap-6 text-left">
                {/* Main Cinema Image Display */}
                <div
                  className="relative w-full md:w-3/5 aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-black/60 border border-[#E6CA65]/30 group cursor-pointer"
                  onClick={() => openPhotoLightbox(allPhotos[spotlightIndex], spotlightIndex)}
                >
                  <img
                    src={allPhotos[spotlightIndex].url}
                    alt={allPhotos[spotlightIndex].title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 romantic-photo-filter"
                  />
                  <div className="romantic-vignette-overlay" />
                  <div className="romantic-warm-sheen" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-4 h-4 text-[#E6CA65]" />
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#E6CA65]/40 text-xs text-[#E6CA65] font-serif-cormorant font-bold">
                    {allPhotos[spotlightIndex].tag || 'Cherished Memory'}
                  </div>
                </div>

                {/* Spotlight Details */}
                <div className="w-full md:w-2/5 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#E6CA65] font-serif-cormorant tracking-widest uppercase mb-2">
                      <span>Photo {spotlightIndex + 1} of {allPhotos.length}</span>
                      <Heart className="w-3.5 h-3.5 fill-[#FF6B8B] text-[#FF6B8B]" />
                    </div>

                    <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#FDF9EE] leading-tight mb-3">
                      {allPhotos[spotlightIndex].title}
                    </h3>

                    <p className="font-serif-cormorant italic text-base sm:text-lg text-[#E6CA65] mb-4">
                      “{allPhotos[spotlightIndex].story}”
                    </p>

                    {allPhotos[spotlightIndex].romanticNote && (
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#F5E6BE]/90 font-light leading-relaxed mb-6">
                        {allPhotos[spotlightIndex].romanticNote}
                      </div>
                    )}
                  </div>

                  {/* Prev / Next controls */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setSpotlightIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length)}
                      className="p-2.5 rounded-full bg-white/5 hover:bg-[#6B0E23] border border-white/10 text-white transition-colors cursor-pointer"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSpotlightIndex((prev) => (prev + 1) % allPhotos.length)}
                      className="p-2.5 rounded-full bg-white/5 hover:bg-[#6B0E23] border border-white/10 text-white transition-colors cursor-pointer"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <span className="text-xs text-[#E6CA65]/70 font-serif-cormorant ml-auto">
                      Click photo to zoom
                    </span>
                  </div>
                </div>
              </div>

              {/* Filmstrip Reel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-3 px-1 scrollbar-none">
                {allPhotos.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSpotlightIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      idx === spotlightIndex
                        ? 'border-[#E6CA65] scale-105 shadow-[0_0_15px_rgba(230,202,101,0.5)]'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.title} className="w-full h-full object-cover romantic-photo-filter" />
                    <div className="romantic-vignette-overlay opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: SCRAPBOOK GALLERY GRID */}
          {photoViewMode === 'grid' && (
            <div className="w-full">
              {/* Four Core Pillars */}
              {selectedPhotoCategory === 'all' && (
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-2 text-xs font-serif-cormorant tracking-widest uppercase text-[#E6CA65] mb-4">
                    <span>✦ Four Core Pillars of Our Journey ✦</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {photos.map((photo, idx) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{ y: -6 }}
                        onClick={() => {
                          const foundIdx = allPhotos.findIndex((item) => item.url === photo.url);
                          openPhotoLightbox(allPhotos[foundIdx >= 0 ? foundIdx : 0], foundIdx >= 0 ? foundIdx : 0);
                        }}
                        className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#2E0B19] to-[#12040D] border-2 border-[#E6CA65]/60 hover:border-[#E6CA65] shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col text-left cursor-pointer"
                      >
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/60">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 romantic-photo-filter"
                            loading="lazy"
                          />
                          <div className="romantic-vignette-overlay" />
                          <div className="romantic-warm-sheen" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#12040D] via-transparent to-black/30 pointer-events-none" />
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#6B0E23]/90 border border-[#E6CA65]/50 text-[10px] font-serif-cormorant text-[#E6CA65] font-bold tracking-widest uppercase">
                            Keepsake 0{idx + 1}
                          </div>
                          <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <Maximize2 className="w-3.5 h-3.5 text-[#E6CA65]" />
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif-cormorant text-lg font-bold text-[#FDF9EE] leading-snug group-hover:text-[#E6CA65] transition-colors">
                              “{photo.caption}”
                            </h4>
                            {photo.subtext && (
                              <p className="text-xs text-[#F5E6BE]/70 mt-1.5 font-light">
                                {photo.subtext}
                              </p>
                            )}
                          </div>
                          <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#E6CA65]">
                            <span>♥ Madhusmita ❤️ Piyusa</span>
                            <span className="group-hover:translate-x-1 transition-transform">View →</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* All 15 Photos Grid */}
              <div className="mt-8">
                <div className="flex items-center justify-between border-b border-[#E6CA65]/30 pb-3 mb-6 text-left">
                  <div>
                    <span className="font-serif-cormorant text-xs sm:text-sm tracking-widest uppercase text-[#E6CA65] font-bold block">
                      {selectedPhotoCategory === 'all'
                        ? 'All 15 Cherished Moments of Madhusmita ❤️ Piyusa'
                        : `Filtered Moments (${filteredPhotos.length})`}
                    </span>
                    <span className="text-xs text-[#F5E6BE]/60 font-light">
                      Click any photograph to view the full memory story
                    </span>
                  </div>
                  <div className="text-xs font-serif-cormorant text-[#E6CA65] flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" />
                    <span>15 Photos Total</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
                  {filteredPhotos.map((photo, i) => {
                    const globalIdx = allPhotos.findIndex((item) => item.id === photo.id);
                    return (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: (i % 5) * 0.08 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        onClick={() => openPhotoLightbox(photo, globalIdx >= 0 ? globalIdx : i)}
                        className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#240613] to-[#0E0308] border border-[#E6CA65]/30 hover:border-[#E6CA65] shadow-lg flex flex-col text-left cursor-pointer"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60">
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out romantic-photo-filter"
                            loading="lazy"
                          />
                          <div className="romantic-vignette-overlay" />
                          <div className="romantic-warm-sheen" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity pointer-events-none" />

                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3 h-3 text-[#E6CA65]" />
                          </div>

                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="font-serif-cormorant text-xs font-bold text-[#FDF9EE] leading-tight line-clamp-1 group-hover:text-[#E6CA65] transition-colors">
                              {photo.title}
                            </p>
                            {photo.tag && (
                              <span className="text-[10px] text-[#E6CA65]/80 font-light block mt-0.5 truncate">
                                {photo.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Primary Transition CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-6"
      >
        <button
          onClick={onComplete}
          className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#6B0E23] via-[#8C1D38] to-[#6B0E23] text-[#FDF9EE] text-base sm:text-lg font-serif-cormorant font-bold tracking-wide border-2 border-[#E6CA65] hover:scale-105 active:scale-95 transition-all shadow-[0_12px_40px_rgba(107,14,35,0.6)] cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-[#E6CA65]" />
          <span>There Is More, My Love</span>
          <ArrowRight className="w-5 h-5 text-[#E6CA65] group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* ========================================================================= */}
      {/* UNIFIED FULLSCREEN LIGHTBOX (Covers both 7 Letters and 15 Photos)        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[92vh] rounded-3xl bg-[#1C0814] border border-[#E6CA65]/60 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col md:flex-row text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#A31D3D] hover:border-[#E6CA65] transition-all flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-res Image Box */}
              <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
                <img
                  src={activeItem.url}
                  alt={activeItem.title}
                  className="max-h-[82vh] w-full object-contain p-2 romantic-photo-filter"
                />
                <div className="romantic-vignette-overlay opacity-30" />
              </div>

              {/* Story / Quote Sidebar */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#1C0814] to-[#10030B] overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 text-xs font-serif-cormorant tracking-widest text-[#E6CA65] uppercase mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
                    <span>
                      {activeItem.type === 'letter'
                        ? `Love Letter 0${activeItemIndex + 1} of 7`
                        : `Cherished Memory 0${activeItemIndex + 1} of 15`}
                    </span>
                  </div>

                  <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#FDF9EE] leading-tight mb-3">
                    {activeItem.title}
                  </h3>

                  {activeItem.tag && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#6B0E23]/50 border border-[#E6CA65]/40 text-xs text-[#E6CA65] font-serif-cormorant mb-4">
                      {activeItem.tag}
                    </span>
                  )}

                  {/* Written Quote */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-[#E6CA65]/30 mb-4">
                    <p className="font-serif-cormorant italic text-base sm:text-lg text-[#FDF9EE] leading-relaxed">
                      “{activeItem.quoteOrStory}”
                    </p>
                  </div>

                  {activeItem.rawText && (
                    <p className="text-xs text-[#E6CA65] font-serif-cormorant mb-4">
                      ✦ {activeItem.rawText}
                    </p>
                  )}

                  {activeItem.noteOrDedication && (
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-[#F5E6BE]/90 font-light leading-relaxed mb-6">
                      <span className="text-[#E6CA65] font-semibold block mb-1">
                        {activeItem.type === 'letter' ? 'From Her Man:' : 'Cherished Memory:'}
                      </span>
                      {activeItem.noteOrDedication}
                    </div>
                  )}
                </div>

                {/* Footer in Lightbox */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#F5E6BE]/60">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeakQuote(activeItem.quoteOrStory, 'lightbox')}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-[#6B0E23] text-[#E6CA65] transition-colors cursor-pointer"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopyQuote(activeItem.quoteOrStory, 'lightbox')}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-[#6B0E23] text-[#E6CA65] transition-colors cursor-pointer"
                      title="Copy"
                    >
                      {copiedId === 'lightbox' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <span className="font-script-romantic text-base text-[#E6CA65]">
                    Madhusmita ❤️ Piyusa forever
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
