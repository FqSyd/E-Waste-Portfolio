import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Camera, CheckCircle, MapPin, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

export const UploadGalleryModal = ({ isOpen, onClose, onAddPhoto }) => {
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    category: 'Awareness Campaign',
    date: new Date().toISOString().split('T')[0],
    location: 'Vidyalankar Campus, Mumbai',
    imageUrl: '',
    activityType: 'Recycling Campaign'
  });

  const [imageFileName, setImageFileName] = useState('');

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, imageUrl: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      alert("Please provide at least a photo title and select an image file.");
      return;
    }

    const newPhoto = {
      id: Date.now(),
      title: formData.title,
      caption: formData.caption || "Activity photo proof submission.",
      category: formData.category,
      date: formData.date,
      location: formData.location,
      image: formData.imageUrl,
      activityType: formData.activityType
    };

    onAddPhoto(newPhoto);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    // Reset
    setFormData({
      title: '',
      caption: '',
      category: 'Awareness Campaign',
      date: new Date().toISOString().split('T')[0],
      location: 'Vidyalankar Campus, Mumbai',
      imageUrl: '',
      activityType: 'Recycling Campaign'
    });
    setImageFileName('');
    onClose();
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
          className="relative w-full max-w-xl glass-modal rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-eco-accent/30 my-8 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-eco-border dark:border-eco-darkBorder mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-eco-accent/10 text-eco-accent flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-xl text-eco-text dark:text-eco-darkText">
                  Upload Photo Proof
                </h3>
                <p className="text-xs text-eco-muted dark:text-eco-darkMuted">
                  Upload activity proof photos directly to your masonry gallery.
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
                Photo Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Campus E-Waste Collection Drive 2026"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText"
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
                  className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText"
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
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText"
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
                className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                Caption / Activity Details
              </label>
              <textarea
                rows="3"
                placeholder="Detailed description of what took place in this photo..."
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText"
              />
            </div>

            {/* Image File Upload */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-eco-darkBg/60 border border-dashed border-eco-accent/40 space-y-2">
              <label className="block text-xs font-bold text-eco-accent flex items-center space-x-1.5">
                <Camera className="w-4 h-4" />
                <span>Upload Photo Image *</span>
              </label>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFile}
                className="block w-full text-xs text-eco-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-eco-accent file:text-white hover:file:bg-eco-primary"
              />
              {imageFileName && (
                <span className="block text-[11px] font-medium text-eco-accent">✓ Selected Image: {imageFileName}</span>
              )}
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-eco-border text-xs font-semibold text-eco-muted hover:text-eco-text"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-eco-accent to-eco-teal text-white text-xs font-bold shadow-eco-glow hover:shadow-eco-md transition-all flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Publish Photo to Gallery</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
