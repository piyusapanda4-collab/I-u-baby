import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryPhoto, MemoryAlbumPhoto } from '../types.ts';
import { Camera, Maximize2, X, ChevronRight, ChevronLeft, Heart, Sparkles, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';

interface Stage6GalleryProps {
  photos: GalleryPhoto[];
  allPhotos: MemoryAlbumPhoto[];
  onOpenPersonalize: () => void;
}

export const Stage6Gallery: React.FC<Stage6GalleryProps> = ({
  photos,
  allPhotos,
  onOpenPersonalize,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | MemoryAlbumPhoto | null>(null);
  const [showFullAlbumModal, setShowFullAlbumModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openLightbox = (photo: GalleryPhoto | MemoryAlbumPhoto, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const handleNextPhoto = () => {
    const list = showFullAlbumModal ? allPhotos : photos;
    const nextIdx = (currentIndex + 1) % list.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(list[nextIdx]);
  };

  const handlePrevPhoto = () => {
    const list = showFullAlbumModal ? allPhotos : photos;
    const prevIdx = (currentIndex - 1 + list.length) % list.length;
    setCurrentIndex(prevIdx);
    setSelectedPhoto(list[prevIdx]);
  };

  return (
    <section id="stage-gallery" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA65] font-serif-cormorant font-semibold mb-3"
        >
          <span>Stage 6</span>
          <span className="text-[#A31D3D] text-base">·</span>
          <span>Cherished Keepsakes</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl text-[#FDF9EE] font-bold tracking-tight mb-4"
        >
          Our Memory Gallery
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base text-[#F5E6BE]/75 max-w-xl mx-auto font-light leading-relaxed"
        >
          Four windows into our journey together, frozen in time and bathed in moonlight. Tap any photograph to view the memory close-up.
        </motion.p>

        {/* Gallery Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setShowFullAlbumModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6CA65]/15 border border-[#E6CA65]/40 text-[#E6CA65] hover:bg-[#E6CA65]/25 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-[0_4px_15px_rgba(230,202,101,0.15)]"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>View All 15 Memories from Our First Days</span>
          </button>

          <button
            onClick={onOpenPersonalize}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-[#F5E6BE]/80 hover:text-[#FDF9EE] hover:bg-white/10 text-xs sm:text-sm font-light transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize Photos</span>
          </button>
        </div>
      </div>

      {/* 4 Main Photo Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id || idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.12 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#2E0B19]/80 to-[#14060E]/90 border border-[#E6CA65]/30 hover:border-[#E6CA65] transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col cursor-pointer"
            onClick={() => openLightbox(photo, idx)}
          >
            {/* Image Aspect Box */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
              <img
                src={photo.url}
                alt={photo.alt || photo.caption}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                onError={(e) => {
                  // Fallback if local asset fails to load
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {/* Gentle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14060E] via-transparent to-black/20" />

              {/* Top Slot Pill Tag */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E6CA65]/30 text-[11px] font-serif-cormorant text-[#E6CA65] tracking-widest uppercase">
                Slot 0{idx + 1}
              </div>

              {/* Zoom Hover Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Caption & Memory Note Container */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-cormorant text-xl font-bold text-[#FDF9EE] leading-snug group-hover:text-[#E6CA65] transition-colors">
                  “{photo.caption}”
                </h3>
                {photo.subtext && (
                  <p className="text-xs text-[#F5E6BE]/70 mt-2 font-light leading-relaxed">
                    {photo.subtext}
                  </p>
                )}
              </div>

              <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#E6CA65]/80 font-serif-cormorant tracking-wide">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-[#A31D3D] fill-[#A31D3D]" />
                  <span>Cherished Memory</span>
                </span>
                <span className="group-hover:translate-x-1 transition-transform">Enlarge ↗</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX MODAL FOR SINGLE PHOTO */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[92vh] rounded-3xl bg-[#1C0814] border border-[#E6CA65]/50 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#A31D3D] hover:border-[#E6CA65] transition-all flex items-center justify-center cursor-pointer"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next controls */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#A31D3D] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 md:right-[380px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#A31D3D] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Main Image View */}
              <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
                <img
                  src={selectedPhoto.url}
                  alt={'caption' in selectedPhoto ? selectedPhoto.caption : selectedPhoto.title}
                  className="max-h-[80vh] w-full object-contain p-2"
                />
              </div>

              {/* Memory Story Sidebar */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#1C0814] to-[#12050E] overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 text-xs font-serif-cormorant tracking-widest text-[#E6CA65] uppercase mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
                    <span>Karva Chauth Memory</span>
                  </div>

                  <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#FDF9EE] leading-tight mb-4">
                    {'caption' in selectedPhoto ? `“${selectedPhoto.caption}”` : selectedPhoto.title}
                  </h3>

                  {'subtext' in selectedPhoto && selectedPhoto.subtext && (
                    <p className="text-sm text-[#E6CA65] font-serif-cormorant italic mb-4">
                      {selectedPhoto.subtext}
                    </p>
                  )}

                  <div className="p-4 rounded-xl bg-white/5 border border-[#E6CA65]/20 text-sm text-[#F5E6BE]/90 font-light leading-relaxed mb-6">
                    {'memoryNote' in selectedPhoto && selectedPhoto.memoryNote
                      ? selectedPhoto.memoryNote
                      : 'story' in selectedPhoto
                      ? selectedPhoto.story
                      : 'Every second with you is etched deeply in my heart.'}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#F5E6BE]/60">
                  <span>Photo {currentIndex + 1} of {showFullAlbumModal ? allPhotos.length : photos.length}</span>
                  <span className="font-script-romantic text-base text-[#E6CA65]">Forever Yours</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL 15-PHOTO ALBUM MODAL */}
      <AnimatePresence>
        {showFullAlbumModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-lg overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative max-w-6xl w-full my-auto max-h-[90vh] rounded-3xl bg-[#160610] border border-[#E6CA65]/50 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1E0817]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-serif-cormorant tracking-widest text-[#E6CA65] uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#E6CA65]" />
                    <span>Complete Photo Keepsake</span>
                  </div>
                  <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#FDF9EE]">
                    All 15 Memories From Our First Days
                  </h3>
                </div>

                <button
                  onClick={() => setShowFullAlbumModal(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#A31D3D] text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close album"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid of All 15 Photos */}
              <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {allPhotos.map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedPhoto(item);
                      setCurrentIndex(i);
                    }}
                    className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-black/60 border border-white/10 hover:border-[#E6CA65] cursor-pointer transition-all duration-300"
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="font-serif-cormorant text-xs font-bold text-white truncate">
                        {item.title}
                      </p>
                      {item.tag && (
                        <p className="text-[10px] text-[#E6CA65] truncate font-light">
                          {item.tag}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
