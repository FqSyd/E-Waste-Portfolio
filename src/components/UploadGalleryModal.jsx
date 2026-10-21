import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Camera, CheckCircle, MapPin, Tag, Images, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const UploadGalleryModal = ({ isOpen, onClose, onAddPhoto }) => {
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    category: 'Awareness Campaign',
    date: new Date().toISOString().split('T')[0],
    location: 'Vidyalankar Campus, Mumbai',
    activityType: 'Recycling Campaign'
  });

  const [selectedImages, setSelectedImages] = useState([]); // array of { name, url }
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMultipleImageFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsProcessing(true);
    let loadedCount = 0;
    const newImgs = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newImgs.push({
          name: file.name,
          url: event.target.result
        });
        loadedCount++;
        if (loadedCount === files.length) {
          setSelectedImages(prev => [...prev, ...newImgs]);
          setIsProcessing(false);
        }
      };
      reader.onerror = () => {
        loadedCount++;
        if (loadedCount === files.length) setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please provide an album/activity title.");
      return;
    }

    if (selectedImages.length === 0) {
      alert("Please select at least one photo.");
      return;
    }

    try {
      const imageUrls = selectedImages.map(img => img.url);

      const newPhotoAlbum = {
        id: Date.now(),
        title: formData.title.trim(),
        caption: formData.caption.trim() || `Activity proof submission with ${imageUrls.length} photos.`,
        category: formData.category,
        date: formData.date,
        location: formData.location.trim() || "Vidyalankar Campus, Mumbai",
        image: imageUrls[0], // primary cover
        images: imageUrls,   // all multiple images
        activityType: formData.activityType
      };

      onAddPhoto(newPhotoAlbum);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

      // Reset
      setFormData({
        title: '',
        caption: '',
        category: 'Awareness Campaign',
        date: new Date().toISOString().split('T')[0],
        location: 'Vidyalankar Campus, Mumbai',
        activityType: 'Recycling Campaign'
      });
      setSelectedImages([]);
    } catch (err) {
      console.error("Gallery upload error:", err);
      alert("Failed to publish photo album: " + err.message);
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl glass-modal rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-eco-accent/30 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-eco-border dark:border-eco-darkBorder mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-eco-accent/10 text-eco-accent flex items-center justify-center">
                <Images className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-xl text-eco-text dark:text-eco-darkText">
                  Upload Photo Album
                </h3>
                <p className="text-xs text-eco-muted dark:text-eco-darkMuted">
                  Upload multiple photos together under a single activity title!
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-eco-bg dark:bg-eco-darkBg text-eco-text dark:text-eco-darkText hover:bg-rose-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                Activity Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Device Anatomy Teardown or Campus Recycling Drive"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText focus:outline-none focus:border-eco-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText focus:outline-none focus:border-eco-primary"
                >
                  <option value="Awareness Campaign">Awareness Campaign</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Field Visit">Field Visit</option>
                  <option value="Campus Activity">Campus Activity</option>
                  <option value="Recycling Drive">Recycling Drive</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText focus:outline-none focus:border-eco-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Vidyalankar Institute Plaza, Mumbai"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText focus:outline-none focus:border-eco-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                Caption / Activity Description
              </label>
              <textarea
                rows="3"
                placeholder="Detailed description of the activity and what the photos represent..."
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText focus:outline-none focus:border-eco-primary"
              />
            </div>

            {/* Multiple Images File Input */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-eco-darkBg/60 border border-dashed border-eco-accent/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-eco-accent flex items-center space-x-1.5 cursor-pointer">
                  <Images className="w-4 h-4" />
                  <span>Select Multiple Photos for this Title *</span>
                </label>
                {selectedImages.length > 0 && (
                  <span className="text-xs font-bold text-eco-primary bg-eco-primary/10 px-2.5 py-0.5 rounded-full">
                    {selectedImages.length} {selectedImages.length === 1 ? 'photo' : 'photos'} chosen
                  </span>
                )}
              </div>
              
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleMultipleImageFiles}
                className="block w-full text-xs text-eco-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-eco-accent file:text-white hover:file:bg-eco-primary cursor-pointer"
              />
              <p className="text-[11px] text-eco-muted dark:text-eco-darkMuted">
                Tip: Hold <kbd className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded text-[10px]">Ctrl</kbd> (or <kbd className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded text-[10px]">Cmd</kbd>) to select multiple photos at once.
              </p>

              {/* Selected Thumbnails Grid */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2 max-h-48 overflow-y-auto p-1">
                  {selectedImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-eco-border shadow-sm h-20 bg-black/10">
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-rose-500 opacity-90 transition-opacity"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 text-white px-1 rounded truncate max-w-[80%]">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-[11px] text-eco-muted dark:text-eco-darkMuted">
                {selectedImages.length > 0 ? `Ready to publish ${selectedImages.length} images` : 'Select images above'}
              </span>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-eco-border text-xs font-semibold text-eco-muted hover:text-eco-text"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isProcessing || selectedImages.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-eco-accent to-eco-teal text-white text-xs font-bold shadow-eco-glow hover:shadow-eco-md transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isProcessing ? 'Processing...' : `Publish Album (${selectedImages.length})`}</span>
                </button>
              </div>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
