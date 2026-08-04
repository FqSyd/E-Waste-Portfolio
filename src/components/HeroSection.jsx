import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Recycle, 
  Cpu, 
  Globe, 
  Smartphone, 
  Sparkles, 
  FileText, 
  Compass 
} from 'lucide-react';
import { studentData } from '../data/studentData';

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      
      {/* Background Animated Eco & Circuit Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Soft Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-eco-accent/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-eco-teal/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        {/* Floating Electronic Device -> Leaf Transformation Graphic 1 */}
        <motion.div
          animate={{
            y: [-10, 15, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 left-8 lg:left-24 p-4 glass-card rounded-2xl border border-eco-accent/30 shadow-eco-glow hidden md:flex items-center space-x-3 z-10"
        >
          <div className="relative">
            <Smartphone className="w-8 h-8 text-eco-muted dark:text-eco-darkMuted" />
            <Leaf className="w-5 h-5 text-eco-accent absolute -bottom-1 -right-1 animate-spin-slow" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-eco-text dark:text-eco-darkText">E-Waste Upcycling</span>
            <span className="text-[10px] text-eco-primary font-medium">Device → Green Leaf</span>
          </div>
        </motion.div>

        {/* Circuit Line -> Plant Transformation Graphic 2 */}
        <motion.div
          animate={{
            y: [15, -10, 15],
            rotate: [0, -6, 6, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-8 lg:right-24 p-4 glass-card rounded-2xl border border-eco-teal/30 shadow-eco-glow hidden md:flex items-center space-x-3 z-10"
        >
          <div className="p-2.5 rounded-xl bg-eco-teal/10 text-eco-teal">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-eco-text dark:text-eco-darkText">Green Hardware</span>
            <span className="text-[10px] text-eco-accent font-medium">Circuits → Eco Systems</span>
          </div>
        </motion.div>

        {/* Floating Recycling & Energy Badges */}
        <motion.div
          animate={{ y: [-8, 12, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-12 lg:right-40 p-3 bg-white/60 dark:bg-eco-darkCard/60 backdrop-blur-md rounded-full border border-eco-accent/20 text-eco-accent hidden xl:block"
        >
          <Recycle className="w-6 h-6 animate-spin-slow" />
        </motion.div>

        <motion.div
          animate={{ y: [12, -8, 12] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-16 lg:left-36 p-3 bg-white/60 dark:bg-eco-darkCard/60 backdrop-blur-md rounded-full border border-eco-primary/20 text-eco-primary hidden xl:block"
        >
          <Globe className="w-6 h-6 animate-pulse" />
        </motion.div>
      </div>

      {/* Main Glass Hero Card */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-eco-primary/20 dark:border-eco-accent/20 shadow-eco-lg relative overflow-hidden"
        >
          
          {/* Subtle Top Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-eco-primary/10 dark:bg-eco-accent/10 border border-eco-primary/20 dark:border-eco-accent/20 text-eco-primary dark:text-eco-accent text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic E-Portfolio</span>
          </motion.div>

          {/* Large Main Heading */}
          <h1 className="font-outfit font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-eco-text dark:text-eco-darkText mb-3">
            E-Portfolio
          </h1>

          {/* Subtitle */}
          <h2 className="font-poppins font-semibold text-xl sm:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-eco-primary via-eco-secondary to-eco-teal mb-8">
            E-Waste & Environmental Management
          </h2>

          {/* Student Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/50 dark:bg-eco-darkBg/50 p-4 rounded-2xl border border-eco-border dark:border-eco-darkBorder mb-8 text-left">
            <div>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-eco-muted dark:text-eco-darkMuted">Student Name</span>
              <span className="font-semibold text-sm text-eco-text dark:text-eco-darkText">{studentData.name}</span>
            </div>
            <div>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-eco-muted dark:text-eco-darkMuted">Department</span>
              <span className="font-semibold text-sm text-eco-text dark:text-eco-darkText">B.Tech IT</span>
            </div>
            <div>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-eco-muted dark:text-eco-darkMuted">College</span>
              <span className="font-semibold text-sm text-eco-text dark:text-eco-darkText truncate block" title={studentData.college}>VIT Mumbai</span>
            </div>
            <div>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-eco-muted dark:text-eco-darkMuted">Academic Year</span>
              <span className="font-semibold text-sm text-eco-primary dark:text-eco-accent">{studentData.academicYear}</span>
            </div>
          </div>

          {/* Annie Leonard Environmental Quote */}
          <blockquote className="italic font-inter text-sm sm:text-base text-eco-muted dark:text-eco-darkMuted border-l-4 border-eco-accent pl-4 py-2 mb-8 max-w-2xl mx-auto text-left sm:text-center">
            {studentData.quote}
          </blockquote>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#assignments"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-eco-primary to-eco-secondary text-white font-semibold text-sm shadow-eco-glow hover:shadow-eco-lg hover:scale-105 transition-all flex items-center justify-center space-x-2 group"
            >
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              <span>Explore Portfolio</span>
            </a>

            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/80 dark:bg-eco-darkCard/80 border border-eco-border dark:border-eco-darkBorder text-eco-text dark:text-eco-darkText font-semibold text-sm hover:border-eco-primary dark:hover:border-eco-accent hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4 text-eco-primary dark:text-eco-accent" />
              <span>View About Profile</span>
            </a>
          </div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 inline-flex flex-col items-center cursor-pointer text-eco-muted dark:text-eco-darkMuted hover:text-eco-primary dark:hover:text-eco-accent transition-colors"
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-xs font-medium uppercase tracking-widest mb-2">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-current"
            />
          </div>
        </motion.div>

      </div>

      {/* Curved SVG Section Divider leading into About section */}
      <div className="eco-wave text-eco-bg dark:text-eco-darkBg">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>

    </section>
  );
};
