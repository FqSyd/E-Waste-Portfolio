import React from 'react';
import { Leaf, ChevronUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { studentData } from '../data/studentData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white/70 dark:bg-eco-darkCard/70 border-t border-eco-border dark:border-eco-darkBorder pt-12 pb-8 overflow-hidden">
      
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eco-primary via-eco-secondary to-eco-teal" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-eco-primary flex items-center justify-center text-white shadow-eco-glow">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-outfit font-bold text-xl text-eco-text dark:text-eco-darkText">
                E-Waste Portfolio
              </span>
            </div>
            <p className="text-sm text-eco-muted dark:text-eco-darkMuted max-w-md leading-relaxed">
              Academic showcase created for university coursework in <strong>E-Waste & Environmental Management</strong>.
              Promoting green computing, circular economy strategies, and responsible electronic waste recycling.
            </p>
            <p className="text-xs text-eco-primary dark:text-eco-accent font-medium">
              Vidyalankar Institute of Technology • Dept. of Information Technology
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-semibold text-eco-text dark:text-eco-darkText mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-eco-muted dark:text-eco-darkMuted">
              <li><a href="#home" className="hover:text-eco-primary dark:hover:text-eco-accent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-eco-primary dark:hover:text-eco-accent transition-colors">About Student</a></li>
              <li><a href="#subject" className="hover:text-eco-primary dark:hover:text-eco-accent transition-colors">Subject Overview</a></li>
              <li><a href="#assignments" className="hover:text-eco-primary dark:hover:text-eco-accent transition-colors">Assignments & Repository</a></li>
              <li><a href="#gallery" className="hover:text-eco-primary dark:hover:text-eco-accent transition-colors">Photo Gallery</a></li>
              <li><a href="#achievements" className="hover:text-eco-primary dark:hover:text-eco-accent transition-colors">Certifications & Honors</a></li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div>
            <h4 className="font-outfit font-semibold text-eco-text dark:text-eco-darkText mb-4">
              Connect & Links
            </h4>
            <div className="flex space-x-3 mb-4">
              <a
                href={studentData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-lg bg-eco-bg dark:bg-eco-darkBg border border-eco-border dark:border-eco-darkBorder flex items-center justify-center text-eco-text dark:text-eco-darkText hover:text-eco-primary dark:hover:text-eco-accent hover:scale-105 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={studentData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-lg bg-eco-bg dark:bg-eco-darkBg border border-eco-border dark:border-eco-darkBorder flex items-center justify-center text-eco-text dark:text-eco-darkText hover:text-eco-primary dark:hover:text-eco-accent hover:scale-105 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${studentData.email}`}
                aria-label="Email Contact"
                className="w-9 h-9 rounded-lg bg-eco-bg dark:bg-eco-darkBg border border-eco-border dark:border-eco-darkBorder flex items-center justify-center text-eco-text dark:text-eco-darkText hover:text-eco-primary dark:hover:text-eco-accent hover:scale-105 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-eco-muted dark:text-eco-darkMuted">
              Academic Year: <strong>{studentData.academicYear}</strong>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-eco-border dark:border-eco-darkBorder pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-eco-muted dark:text-eco-darkMuted">
          <p className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by <strong className="text-eco-text dark:text-eco-darkText">{studentData.name}</strong></span>
          </p>

          <p>
            For <strong>{studentData.subject}</strong> • Vidyalankar Institute of Technology
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-eco-primary/10 dark:bg-eco-accent/10 text-eco-primary dark:text-eco-accent hover:bg-eco-primary hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
