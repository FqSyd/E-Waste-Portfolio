import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Upload, PlusCircle, Sparkles, Code2, Check, Download } from 'lucide-react';
import { assignmentData } from '../data/assignmentData';
import { AssignmentCard } from './AssignmentCard';
import { PdfModal } from './PdfModal';
import { UploadAssignmentModal } from './UploadAssignmentModal';
import { getStoredItems, saveStoredItem, STORE_ASSIGNMENTS } from '../utils/storage';

export const AssignmentsSection = () => {
  const [assignments, setAssignments] = useState(assignmentData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePdfAssignment, setActivePdfAssignment] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Load custom stored assignments from IndexedDB / Storage on mount
  useEffect(() => {
    const loadCustom = async () => {
      try {
        const customItems = await getStoredItems(STORE_ASSIGNMENTS);
        if (customItems && customItems.length > 0) {
          // Merge custom items with assignmentData, avoiding duplicates by id
          const existingIds = new Set(assignmentData.map(a => a.id));
          const uniqueCustom = customItems.filter(item => !existingIds.has(item.id));
          setAssignments([...uniqueCustom, ...assignmentData]);
        } else {
          setAssignments(assignmentData);
        }
      } catch (e) {
        console.warn('Could not load stored assignments:', e);
      }
    };

    loadCustom();
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event('portfolio_stats_updated'));
  }, [assignments]);

  const handleAddAssignment = async (newAssignment) => {
    // 1. Update React state immediately so it renders on screen right now!
    setAssignments(prev => [newAssignment, ...prev]);

    // 2. Persist to IndexedDB asynchronously (handles large files without 5MB quota crash!)
    try {
      await saveStoredItem(STORE_ASSIGNMENTS, newAssignment);
    } catch (err) {
      console.warn("Storage save error:", err);
    }

    // 3. Update counter
    window.dispatchEvent(new Event('portfolio_stats_updated'));
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const matchesCategory = selectedCategory === 'All' || assignment.category === selectedCategory;
      const matchesSearch = 
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [assignments, selectedCategory, searchQuery]);

  const categories = ['All', 'Reports', 'Research', 'Activities', 'Presentations', 'Practicals'];

  const getExportCode = () => {
    return `// Paste this into src/data/assignmentData.js to permanently host these assignments on Vercel/Netlify/GitHub Pages:
export const assignmentData = ${JSON.stringify(assignments.map(a => ({
      ...a,
      // If it's a huge base64 string, recommend placing the file in public/assignments
      pdf: a.pdf.startsWith('data:') ? `./assignments/${a.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf` : a.pdf
    })), null, 2)};`;
  };

  const copyExportCode = () => {
    navigator.clipboard.writeText(getExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="assignments" className="py-20 relative bg-eco-bg dark:bg-eco-darkBg overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-eco-primary dark:text-eco-accent bg-eco-primary/10 dark:bg-eco-accent/10 px-4 py-1.5 rounded-full mb-3">
            Central Coursework Repository
          </span>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-5xl text-eco-text dark:text-eco-darkText tracking-tight">
            Coursework & Assignments
          </h2>
          <p className="mt-4 text-eco-muted dark:text-eco-darkMuted text-base">
            Explore submitted reports, signed sustainability pledge, device anatomy practicals, and data analysis projects.
          </p>
        </div>

        {/* Filter Controls, Search & Upload Trigger */}
        <div className="glass-card rounded-3xl p-6 border border-eco-border dark:border-eco-darkBorder shadow-eco-md mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-eco-primary text-white shadow-eco-sm scale-105'
                    : 'bg-white/60 dark:bg-eco-darkBg/60 text-eco-text dark:text-eco-darkText hover:bg-eco-primary/10 dark:hover:bg-eco-accent/10 border border-eco-border/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Action Bar: Search & Upload Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-eco-muted dark:text-eco-darkMuted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/80 dark:bg-eco-darkBg/80 border border-eco-border dark:border-eco-darkBorder text-xs text-eco-text dark:text-eco-darkText placeholder-eco-muted/70 focus:outline-none focus:border-eco-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-eco-muted hover:text-eco-primary"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setUploadModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-eco-primary to-eco-secondary text-white text-xs font-bold shadow-eco-glow hover:shadow-eco-md hover:scale-105 transition-all flex items-center justify-center space-x-2 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Upload Assignment</span>
            </button>
          </div>

        </div>

        {/* Assignments Grid */}
        {filteredAssignments.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredAssignments.map(assignment => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onPreview={(a) => setActivePdfAssignment(a)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-12 text-center border border-eco-border dark:border-eco-darkBorder max-w-xl mx-auto shadow-eco-md"
          >
            <div className="w-16 h-16 rounded-2xl bg-eco-primary/10 text-eco-primary mx-auto mb-4 flex items-center justify-center shadow-eco-glow">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="font-outfit font-bold text-2xl text-eco-text dark:text-eco-darkText mb-2">
              No matching assignments
            </h3>
            <p className="text-sm text-eco-muted dark:text-eco-darkMuted leading-relaxed mb-6">
              No coursework matches your search query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-xl bg-eco-primary text-white text-xs font-bold hover:bg-eco-secondary transition-all shadow-sm"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

      </div>

      {/* PDF Modal Viewer */}
      <PdfModal
        isOpen={Boolean(activePdfAssignment)}
        onClose={() => setActivePdfAssignment(null)}
        assignment={activePdfAssignment}
      />

      {/* Upload Assignment Modal Form */}
      <UploadAssignmentModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onAddAssignment={handleAddAssignment}
      />

    </section>
  );
};
