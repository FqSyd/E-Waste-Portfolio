import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Tag, Maximize2 } from 'lucide-react';

export const LightboxModal = ({ isOpen, currentIndex, items, onClose, onNext, onPrev }) => {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
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
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-lg"
        />

        {/* Modal Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-5xl w-full max-h-[90vh] glass-modal rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row border border-eco-accent/30"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 text-white hover:bg-rose-500 transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous / Next Arrow Controls */}
          <button
            onClick={onPrev}
            aria-label="Previous Image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-eco-primary transition-all backdrop-blur-md hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={onNext}
            aria-label="Next Image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-eco-primary transition-all backdrop-blur-md hover:scale-110 md:right-[380px]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Left Column: High-Res Image View */}
          <div className="flex-1 bg-black/90 flex items-center justify-center p-4 min-h-[300px] md:min-h-[500px]">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Right Column: Image Details & Meta Sidebar */}
          <div className="w-full md:w-96 p-6 sm:p-8 bg-white/95 dark:bg-eco-darkCard/95 flex flex-col justify-between border-t md:border-t-0 md:border-l border-eco-border dark:border-eco-darkBorder">
            <div className="space-y-4">
              
              {/* Category Badge */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-eco-primary/10 dark:bg-eco-accent/10 text-eco-primary dark:text-eco-accent text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>{currentItem.category}</span>
              </div>

              {/* Title */}
              <h3 className="font-outfit font-bold text-xl text-eco-text dark:text-eco-darkText leading-tight">
                {currentItem.title}
              </h3>

              {/* Caption */}
              <p className="text-xs sm:text-sm text-eco-muted dark:text-eco-darkMuted leading-relaxed">
                {currentItem.caption}
              </p>

              {/* Location & Date Metadata */}
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

            {/* Footer Pagination Indicator */}
            <div className="pt-6 border-t border-eco-border/40 dark:border-eco-darkBorder/40 flex items-center justify-between text-xs text-eco-muted dark:text-eco-darkMuted">
              <span>Photo {currentIndex + 1} of {items.length}</span>
              <span className="font-medium text-eco-primary dark:text-eco-accent">Use ← → keys to navigate</span>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
