import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Download, Calendar, Tag, FileCheck, ExternalLink } from 'lucide-react';

export const AssignmentCard = ({ assignment, onPreview }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-3xl overflow-hidden border border-eco-border dark:border-eco-darkBorder shadow-eco-sm hover:shadow-eco-glow hover:border-eco-accent/40 transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Cover Image & Badge */}
        <div className="relative h-48 w-full overflow-hidden bg-eco-bg dark:bg-eco-darkBg">
          <img
            src={assignment.image}
            alt={assignment.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Assignment Number Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-eco-primary/90 text-white backdrop-blur-md text-xs font-bold uppercase tracking-wider shadow-md">
            #{assignment.assignmentNumber}
          </div>

          {/* Category Tag */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-eco-darkCard/90 text-eco-text dark:text-eco-darkText backdrop-blur-md text-[11px] font-semibold">
            {assignment.category}
          </div>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center text-white/90 text-xs space-x-2">
            <Calendar className="w-3.5 h-3.5 text-eco-accent" />
            <span>Submitted: {assignment.date}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3">
          
          {/* Subject tag */}
          <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-eco-primary dark:text-eco-accent uppercase tracking-wider">
            <FileCheck className="w-3.5 h-3.5" />
            <span>{assignment.subject}</span>
          </div>

          {/* Title */}
          <h3 className="font-outfit font-bold text-lg text-eco-text dark:text-eco-darkText group-hover:text-eco-primary dark:group-hover:text-eco-accent transition-colors line-clamp-2">
            {assignment.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-eco-muted dark:text-eco-darkMuted leading-relaxed line-clamp-3">
            {assignment.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {assignment.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-eco-primary/5 dark:bg-eco-accent/5 border border-eco-primary/10 dark:border-eco-accent/10 text-[10px] font-medium text-eco-muted dark:text-eco-darkMuted"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Buttons Bar */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-3 border-t border-eco-border/40 dark:border-eco-darkBorder/40 mt-4">
        
        <button
          onClick={() => onPreview(assignment)}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-eco-primary/10 dark:bg-eco-accent/10 text-eco-primary dark:text-eco-accent font-bold text-xs hover:bg-eco-primary hover:text-white transition-all shadow-sm group/btn"
        >
          <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          <span>Preview PDF</span>
        </button>

        <a
          href={assignment.pdf}
          download
          className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-white/80 dark:bg-eco-darkCard/80 border border-eco-border dark:border-eco-darkBorder text-eco-text dark:text-eco-darkText font-bold text-xs hover:border-eco-primary dark:hover:border-eco-accent hover:text-eco-primary transition-all shadow-sm"
        >
          <Download className="w-4 h-4 text-eco-accent" />
          <span>Download</span>
        </a>

      </div>
    </motion.div>
  );
};
