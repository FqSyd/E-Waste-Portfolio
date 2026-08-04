import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Calendar, Tag, Milestone } from 'lucide-react';
import { timelineData } from '../data/timelineData';

export const TimelineSection = () => {
  return (
    <section id="timeline" className="py-20 relative bg-eco-bg dark:bg-eco-darkBg overflow-hidden">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-eco-primary dark:text-eco-accent bg-eco-primary/10 dark:bg-eco-accent/10 px-4 py-1.5 rounded-full mb-3">
            Course Chronology
          </span>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-5xl text-eco-text dark:text-eco-darkText tracking-tight">
            Academic Journey Timeline
          </h2>
          <p className="mt-4 text-eco-muted dark:text-eco-darkMuted text-base">
            Key milestones, assignment deadlines, field visits, workshops, and environmental campaigns completed throughout the semester.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          
          {/* Vertical Central Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-eco-primary via-eco-secondary to-eco-teal -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Content Card */}
                  <div className="w-full sm:w-1/2 px-0 sm:px-8">
                    <div className="glass-card rounded-3xl p-6 border border-eco-border dark:border-eco-darkBorder shadow-eco-sm hover:shadow-eco-md transition-all">
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-eco-primary/10 dark:bg-eco-accent/10 text-eco-primary dark:text-eco-accent text-xs font-bold uppercase tracking-wider">
                          <Tag className="w-3 h-3" />
                          <span>{item.category}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-xs text-eco-muted dark:text-eco-darkMuted font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.date}</span>
                        </span>
                      </div>

                      <h3 className="font-outfit font-bold text-lg text-eco-text dark:text-eco-darkText mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-eco-muted dark:text-eco-darkMuted leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-eco-border/40 dark:border-eco-darkBorder/40 text-[11px]">
                        <span className="font-semibold text-eco-primary dark:text-eco-accent flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{item.status}</span>
                        </span>
                        <span className="text-eco-muted dark:text-eco-darkMuted">Step #{item.id}</span>
                      </div>

                    </div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-eco-darkCard border-4 border-eco-primary dark:border-eco-accent flex items-center justify-center text-eco-primary dark:text-eco-accent shadow-eco-glow z-10 hidden sm:flex">
                    <Milestone className="w-4 h-4" />
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
