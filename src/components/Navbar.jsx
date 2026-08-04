import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Leaf, 
  Menu, 
  X, 
  BookOpen, 
  FileText, 
  Image as ImageIcon, 
  Award, 
  Mail, 
  User 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', icon: Leaf },
    { name: 'About', href: '#about', icon: User },
    { name: 'Subject Overview', href: '#subject', icon: BookOpen },
    { name: 'Assignments', href: '#assignments', icon: FileText },
    { name: 'Gallery', href: '#gallery', icon: ImageIcon },
    { name: 'Achievements', href: '#achievements', icon: Award },
    { name: 'Contact', href: '#contact', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      scrolled ? 'glass-nav py-3 shadow-eco-sm' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#home" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-primary to-eco-accent flex items-center justify-center text-white shadow-eco-glow group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 animate-pulse-glow" />
          </div>
          <div>
            <span className="font-outfit font-bold text-lg tracking-tight text-eco-text dark:text-eco-darkText group-hover:text-eco-primary dark:group-hover:text-eco-accent transition-colors">
              Faaeq Sayed
            </span>
            <span className="block text-xs font-medium text-eco-muted dark:text-eco-darkMuted">
              E-Waste Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/50 dark:bg-eco-darkCard/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-eco-border/60 dark:border-eco-darkBorder/60 shadow-sm">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-eco-primary text-white shadow-eco-sm'
                    : 'text-eco-text/80 dark:text-eco-darkText/80 hover:text-eco-primary dark:hover:text-eco-accent hover:bg-eco-primary/10 dark:hover:bg-eco-accent/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls (Theme Toggle & Mobile Menu Toggle) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-xl bg-white/80 dark:bg-eco-darkCard/80 border border-eco-border dark:border-eco-darkBorder text-eco-text dark:text-eco-darkText hover:text-eco-primary dark:hover:text-eco-accent hover:shadow-eco-sm transition-all transform active:scale-95"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 rotate-0 transition-transform duration-500" />
            ) : (
              <Moon className="w-5 h-5 text-eco-primary -rotate-12 transition-transform duration-500" />
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2.5 rounded-xl bg-white/80 dark:bg-eco-darkCard/80 border border-eco-border dark:border-eco-darkBorder text-eco-text dark:text-eco-darkText"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-modal border-b border-eco-border/60 dark:border-eco-darkBorder/60 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-eco-primary text-white'
                        : 'text-eco-text dark:text-eco-darkText hover:bg-eco-primary/10 dark:hover:bg-eco-accent/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
