import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, ZoomIn, ZoomOut } from 'lucide-react';

export const PdfModal = ({ isOpen, onClose, assignment }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen || !assignment) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl h-[85vh] glass-modal rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 border border-eco-primary/30"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-eco-border dark:border-eco-darkBorder bg-white/80 dark:bg-eco-darkCard/80">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-eco-primary/10 text-eco-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="truncate">
                <h3 className="font-outfit font-bold text-base sm:text-lg text-eco-text dark:text-eco-darkText truncate">
                  {assignment.title}
                </h3>
                <span className="text-xs text-eco-muted dark:text-eco-darkMuted">
                  {assignment.subject} • Submitted {assignment.date}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 shrink-0">
              <a
                href={assignment.pdf}
                download
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-eco-primary text-white text-xs font-semibold hover:bg-eco-secondary transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              <button
                onClick={onClose}
                aria-label="Close Modal"
                className="p-2 rounded-xl bg-eco-bg dark:bg-eco-darkBg text-eco-text dark:text-eco-darkText hover:bg-rose-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 bg-neutral-900 relative">
            <iframe
              src={`${assignment.pdf}#toolbar=1&navpanes=0`}
              title={assignment.title}
              className="w-full h-full border-none"
            />
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-eco-border dark:border-eco-darkBorder bg-white/80 dark:bg-eco-darkCard/80 flex items-center justify-between text-xs text-eco-muted dark:text-eco-darkMuted">
            <span>Assignment #{assignment.assignmentNumber}</span>
            <div className="flex items-center space-x-2">
              <a
                href={assignment.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-eco-primary dark:text-eco-accent hover:underline font-medium"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
