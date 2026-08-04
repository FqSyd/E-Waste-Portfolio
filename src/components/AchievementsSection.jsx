import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, CheckCircle, Star, Calendar, Building } from 'lucide-react';
import { achievementData } from '../data/achievementData';

export const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-20 relative bg-white/40 dark:bg-eco-darkCard/40 border-y border-eco-border dark:border-eco-darkBorder overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-eco-primary dark:text-eco-accent bg-eco-primary/10 dark:bg-eco-accent/10 px-4 py-1.5 rounded-full mb-3">
            Recognition & Honors
          </span>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-5xl text-eco-text dark:text-eco-darkText tracking-tight">
            Academic Achievements
          </h2>
          <p className="mt-4 text-eco-muted dark:text-eco-darkMuted text-base">
            Certificates, hackathon awards, competition honors, and professional workshops completed in environmental computing.
          </p>
        </div>

        {/* Grid of Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievementData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-6 border border-eco-border dark:border-eco-darkBorder shadow-eco-sm hover:shadow-eco-glow transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-eco-primary to-eco-accent text-white flex items-center justify-center shadow-eco-sm">
                    {item.category === 'Award' ? <Trophy className="w-6 h-6" /> :
                     item.category === 'Certificate' ? <Award className="w-6 h-6" /> :
                     item.category === 'Competition' ? <Star className="w-6 h-6" /> :
                     <CheckCircle className="w-6 h-6" />}
                  </div>
                  
                  <span className="px-3 py-1 rounded-full bg-eco-primary/10 dark:bg-eco-accent/10 text-eco-primary dark:text-eco-accent text-xs font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="font-outfit font-bold text-base text-eco-text dark:text-eco-darkText mb-1">
                  {item.title}
                </h3>

                <div className="flex items-center space-x-1 text-xs text-eco-primary dark:text-eco-accent font-semibold mb-3">
                  <Building className="w-3.5 h-3.5" />
                  <span className="truncate">{item.issuer}</span>
                </div>

                <p className="text-xs text-eco-muted dark:text-eco-darkMuted leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Date Footer */}
              <div className="pt-3 border-t border-eco-border/40 dark:border-eco-darkBorder/40 flex items-center justify-between text-[11px] text-eco-muted dark:text-eco-darkMuted font-medium">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </span>
                <span className="text-eco-primary dark:text-eco-accent font-bold">Verified</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
