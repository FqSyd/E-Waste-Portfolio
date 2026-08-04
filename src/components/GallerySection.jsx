import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ZoomIn, Upload, PlusCircle, Image as ImageIcon } from 'lucide-react';
import { galleryData } from '../data/galleryData';
import { LightboxModal } from './LightboxModal';
import { UploadGalleryModal } from './UploadGalleryModal';

export const GallerySection = () => {
  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('custom_gallery');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...galleryData, ...parsed];
      } catch (e) {
        return galleryData;
      }
    }
    return galleryData;
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const categories = [
    'All',
    'Awareness Campaign',
    'Workshop',
    'Field Visit',
    'Campus Activity',
    'Recycling Drive',
    'Seminar'
  ];

  useEffect(() => {
    window.dispatchEvent(new Event('portfolio_stats_updated'));
  }, [gallery]);

  const handleAddPhoto = (newPhoto) => {
    const updated = [newPhoto, ...gallery];
    setGallery(updated);

    const customItems = updated.filter(item => typeof item.id === 'number' && item.id > 1000);
    localStorage.setItem('custom_gallery', JSON.stringify(customItems));
    window.dispatchEvent(new Event('portfolio_stats_updated'));
  };

  const filteredGallery = useMemo(() => {
    if (selectedCategory === 'All') return gallery;
    return gallery.filter(item => item.category === selectedCategory);
  }, [gallery, selectedCategory]);

  const handleNext = () => {
    setLightboxIndex(prev => (prev + 1) % filteredGallery.length);
  };

  const handlePrev = () => {
    setLightboxIndex(prev => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <section id="gallery" className="py-20 relative bg-white/50 dark:bg-eco-darkCard/50 border-y border-eco-border dark:border-eco-darkBorder overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-eco-primary dark:text-eco-accent bg-eco-primary/10 dark:bg-eco-accent/10 px-4 py-1.5 rounded-full mb-3">
            Activity Proofs
          </span>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-5xl text-eco-text dark:text-eco-darkText tracking-tight">
            Photo Gallery
          </h2>
          <p className="mt-4 text-eco-muted dark:text-eco-darkMuted text-base">
            Documenting hands-on recycling drives, field visits, awareness workshops, and campus eco-initiatives.
          </p>
        </div>

        {/* Category Filters & Upload Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-eco-primary text-white shadow-eco-sm scale-105'
                    : 'bg-white/80 dark:bg-eco-darkBg/80 text-eco-text dark:text-eco-darkText hover:bg-eco-primary/10 border border-eco-border dark:border-eco-darkBorder'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-eco-accent to-eco-teal text-white text-xs font-bold shadow-eco-glow hover:shadow-eco-md hover:scale-105 transition-all flex items-center justify-center space-x-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Photo Proof</span>
          </button>

        </div>

        {/* Pinterest Masonry Grid */}
        {filteredGallery.length > 0 ? (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence>
              {filteredGallery.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="break-inside-avoid glass-card rounded-3xl overflow-hidden border border-eco-border dark:border-eco-darkBorder shadow-eco-sm hover:shadow-eco-glow hover:border-eco-accent/40 cursor-pointer transition-all group relative"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-eco-bg dark:bg-eco-darkBg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 max-h-[500px]"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-eco-accent/90 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-eco-darkCard/90 text-eco-text dark:text-eco-darkText text-[11px] font-semibold backdrop-blur-md shadow-sm">
                      {item.category}
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-outfit font-bold text-base text-eco-text dark:text-eco-darkText group-hover:text-eco-primary dark:group-hover:text-eco-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-eco-muted dark:text-eco-darkMuted line-clamp-2">
                      {item.caption}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-eco-border/40 dark:border-eco-darkBorder/40 text-[11px] text-eco-muted dark:text-eco-darkMuted font-medium">
                      <span className="flex items-center space-x-1">
                        <ImageIcon className="w-3.5 h-3.5 text-eco-primary" />
                        <span className="truncate max-w-[140px]">{item.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Camera className="w-3.5 h-3.5 text-eco-accent" />
                        <span>{item.date}</span>
                      </span>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Gallery State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-12 text-center border border-eco-border dark:border-eco-darkBorder max-w-xl mx-auto shadow-eco-md"
          >
            <div className="w-16 h-16 rounded-2xl bg-eco-accent/10 text-eco-accent mx-auto mb-4 flex items-center justify-center shadow-eco-glow">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="font-outfit font-bold text-2xl text-eco-text dark:text-eco-darkText mb-2">
              No Photos Uploaded Yet
            </h3>
            <p className="text-sm text-eco-muted dark:text-eco-darkMuted leading-relaxed mb-6">
              Click below to upload photo proofs of your recycling campaigns, field visits, or workshops to your masonry gallery!
            </p>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-eco-accent text-white text-xs font-bold hover:bg-eco-primary transition-all shadow-eco-glow inline-flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Upload Photo Proof</span>
            </button>
          </motion.div>
        )}

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxIndex !== null}
        currentIndex={lightboxIndex || 0}
        items={filteredGallery}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Upload Gallery Modal Form */}
      <UploadGalleryModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onAddPhoto={handleAddPhoto}
      />

    </section>
  );
};
