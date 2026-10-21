import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Tag, Images, Layers } from 'lucide-react';

export const LightboxModal = ({ isOpen, currentIndex, items, onClose, onNext, onPrev }) => {
  const currentItem = items[currentIndex];
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // When changing albums or opening modal, reset photo index to 0
  useEffect(() => {
    setActivePhotoIdx(0);
  }, [currentIndex, isOpen]);

  const albumImages = currentItem?.images && currentItem.images.length > 0
    ? currentItem.images
    : (currentItem?.image ? [currentItem.image] : []);

  const totalPhotos = albumImages.length;
  const currentPhotoUrl = albumImages[activePhotoIdx] || currentItem?.image;

  // Next photo inside album, or next album if at end
  const handleNextPhoto = () => {
    if (activePhotoIdx < totalPhotos - 1) {
      setActivePhotoIdx(prev => prev + 1);
    } else {
      onNext();
      setActivePhotoIdx(0);
    }
  };

  // Prev photo inside album, or prev album if at start
  const handlePrevPhoto = () => {
    if (activePhotoIdx > 0) {
      setActivePhotoIdx(prev => prev - 1);
    } else {
      onPrev();
      setActivePhotoIdx(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activePhotoIdx, totalPhotos]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className="relative max-w-6xl w-full max-h-[92vh] glass-modal rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row border border-eco-accent/30"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-500 transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Right Navigation Controls */}
          <button
            onClick={handlePrevPhoto}
            aria-label="Previous Image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 text-white hover:bg-eco-primary transition-all backdrop-blur-md hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextPhoto}
            aria-label="Next Image"
            className="absolute right-4 md:right-[380px] top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 text-white hover:bg-eco-primary transition-all backdrop-blur-md hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Left Column: Image Viewer + Thumbnail Strip */}
          <div className="flex-1 bg-black/95 flex flex-col items-center justify-between p-4 min-h-[350px] md:min-h-[550px] relative">
            <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
              <motion.img
                key={`${currentIndex}-${activePhotoIdx}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                src={currentPhotoUrl}
                alt={currentItem.title}
                className="max-h-[62vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Bottom Multi-Photo Thumbnail Strip */}
            {totalPhotos > 1 && (
              <div className="w-full pt-3 pb-1 border-t border-white/10 flex items-center justify-center space-x-2 overflow-x-auto max-w-lg z-20">
                {albumImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative rounded-lg overflow-hidden shrink-0 w-14 h-12 transition-all ${
                      activePhotoIdx === idx
                        ? 'ring-2 ring-eco-accent scale-105 opacity-100'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 text-[8px] bg-black/70 text-white px-1 font-mono">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Album Details & Navigation Meta */}
          <div className="w-full md:w-96 p-6 sm:p-8 bg-white/95 dark:bg-eco-darkCard/95 flex flex-col justify-between border-t md:border-t-0 md:border-l border-eco-border dark:border-eco-darkBorder overflow-y-auto">
            <div className="space-y-4">
              
              {/* Top Badges */}
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-eco-primary/10 dark:bg-eco-accent/10 text-eco-primary dark:text-eco-accent text-xs font-bold uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{currentItem.category}</span>
                </span>

                {totalPhotos > 1 && (
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-eco-accent/15 text-eco-primary dark:text-eco-accent text-xs font-semibold">
                    <Images className="w-3.5 h-3.5" />
                    <span>{totalPhotos} Photos</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-outfit font-bold text-xl text-eco-text dark:text-eco-darkText leading-tight">
                {currentItem.title}
              </h3>

              {/* Caption */}
              <p className="text-xs sm:text-sm text-eco-muted dark:text-eco-darkMuted leading-relaxed">
                {currentItem.caption}
              </p>

              {/* Metadata */}
              <div className="space-y-2 pt-4 border-t border-eco-border/60 dark:border-eco-darkBorder/60 text-xs font-medium text-eco-text dark:text-eco-darkText">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-eco-primary dark:text-eco-accent shrink-0" />
                  <span>{currentItem.location}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-eco-secondary dark:text-eco-teal shrink-0" />
                  <span>{currentItem.date}</span>
                </div>
              </div>

            </div>

            {/* Footer Navigation Info */}
            <div className="pt-6 border-t border-eco-border/40 dark:border-eco-darkBorder/40 space-y-2">
              <div className="flex items-center justify-between text-xs text-eco-muted dark:text-eco-darkMuted">
                <span className="font-semibold text-eco-text dark:text-eco-darkText">
                  Photo {activePhotoIdx + 1} of {totalPhotos}
                </span>
                <span>Album {currentIndex + 1} of {items.length}</span>
              </div>

              {/* Album Switcher buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={onPrev}
                  className="text-xs font-bold text-eco-primary dark:text-eco-accent hover:underline flex items-center space-x-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Album</span>
                </button>

                <button
                  onClick={onNext}
                  className="text-xs font-bold text-eco-primary dark:text-eco-accent hover:underline flex items-center space-x-1"
                >
                  <span>Next Album</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
