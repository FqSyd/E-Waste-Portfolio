import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, CheckCircle, Image as ImageIcon, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const UploadAssignmentModal = ({ isOpen, onClose, onAddAssignment }) => {
  const [formData, setFormData] = useState({
    assignmentNumber: '',
    title: '',
    description: '',
    category: 'Reports',
    date: new Date().toISOString().split('T')[0],
    subject: 'E-Waste & Environmental Management',
    pdfUrl: '',
    imageUrl: '',
    tags: ''
  });

  const [pdfFileName, setPdfFileName] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handlePdfFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFileName(file.name);
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, pdfUrl: event.target.result }));
        setIsLoading(false);
      };
      reader.onerror = () => {
        alert("Failed to read PDF file. Please try again.");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

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
    if (!formData.title.trim()) {
      alert("Please provide an assignment title.");
      return;
    }

    if (!formData.pdfUrl) {
      alert("Please select a PDF document file.");
      return;
    }

    try {
      const newAssignment = {
        id: Date.now(),
        assignmentNumber: formData.assignmentNumber.trim() || `${Math.floor(Math.random() * 90 + 10)}`,
        title: formData.title.trim(),
        description: formData.description.trim() || "Uploaded coursework submission.",
        category: formData.category,
        date: formData.date,
        subject: formData.subject,
        pdf: formData.pdfUrl,
        image: formData.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : ["Uploaded", "Coursework"]
      };

      onAddAssignment(newAssignment);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

      // Reset Form
      setFormData({
        assignmentNumber: '',
        title: '',
        description: '',
        category: 'Reports',
        date: new Date().toISOString().split('T')[0],
        subject: 'E-Waste & Environmental Management',
        pdfUrl: '',
        imageUrl: '',
        tags: ''
      });
      setPdfFileName('');
      setImageFileName('');
    } catch (err) {
      console.error("Submission error:", err);
      alert("Could not publish assignment: " + err.message);
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
          className="relative w-full max-w-2xl glass-modal rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-eco-primary/30 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-eco-border dark:border-eco-darkBorder mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-eco-primary/10 text-eco-primary flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-xl text-eco-text dark:text-eco-darkText">
                  Upload New Assignment
                </h3>
                <p className="text-xs text-eco-muted dark:text-eco-darkMuted">
                  Upload coursework to render instantly on your portfolio cards and PDF modal.
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                  Assignment #
                </label>
                <input
                  type="text"
                  placeholder="e.g. 01, PLEDGE"
                  value={formData.assignmentNumber}
                  onChange={(e) => setFormData({ ...formData, assignmentNumber: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText focus:outline-none focus:border-eco-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Assignment 1: Global E-Waste Assessment"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText focus:outline-none focus:border-eco-primary"
                />
              </div>
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
                  <option value="Reports">Reports</option>
                  <option value="Research">Research</option>
                  <option value="Activities">Activities</option>
                  <option value="Presentations">Presentations</option>
                  <option value="Practicals">Practicals</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                  Submission Date
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
                Short Description
              </label>
              <textarea
                rows="3"
                placeholder="Brief summary of assignment contents, methodologies, and conclusions..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText focus:outline-none focus:border-eco-primary"
              />
            </div>

            {/* PDF File Upload */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-eco-darkBg/60 border border-dashed border-eco-primary/40 space-y-2">
              <label className="block text-xs font-bold text-eco-primary dark:text-eco-accent flex items-center space-x-1.5">
                <FileText className="w-4 h-4" />
                <span>Upload PDF Document *</span>
              </label>
              
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfFile}
                required={!formData.pdfUrl}
                className="block w-full text-xs text-eco-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-eco-primary file:text-white hover:file:bg-eco-secondary cursor-pointer"
              />
              {isLoading && (
                <span className="block text-[11px] text-amber-500 font-medium">Reading PDF file, please wait...</span>
              )}
              {pdfFileName && !isLoading && (
                <span className="block text-[11px] font-medium text-eco-accent">✓ Selected PDF: {pdfFileName}</span>
              )}
            </div>

            {/* Cover Image Upload */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-eco-darkBg/60 border border-dashed border-eco-accent/40 space-y-2">
              <label className="block text-xs font-bold text-eco-text dark:text-eco-darkText flex items-center space-x-1.5">
                <ImageIcon className="w-4 h-4 text-eco-accent" />
                <span>Card Cover Image (Optional)</span>
              </label>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFile}
                className="block w-full text-xs text-eco-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/80 file:text-eco-text hover:file:bg-eco-primary hover:file:text-white cursor-pointer"
              />
              {imageFileName && (
                <span className="block text-[11px] font-medium text-eco-accent">✓ Selected Image: {imageFileName}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-eco-text dark:text-eco-darkText mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. E-Waste, Recycling, Report"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText focus:outline-none focus:border-eco-primary"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-[11px] text-eco-muted dark:text-eco-darkMuted">
                Instant preview & download enabled
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
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-eco-primary to-eco-secondary text-white text-xs font-bold shadow-eco-glow hover:shadow-eco-md transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isLoading ? 'Processing...' : 'Publish Assignment Card'}</span>
                </button>
              </div>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
