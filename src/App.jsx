import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { CustomCursor } from './components/CustomCursor';
import { FloatingLeafCanvas } from './components/FloatingLeafCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SubjectOverviewSection } from './components/SubjectOverviewSection';
import { AssignmentsSection } from './components/AssignmentsSection';
import { GallerySection } from './components/GallerySection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-eco-bg dark:bg-eco-darkBg text-eco-text dark:text-eco-darkText transition-colors duration-300">
        
        {/* Top Reading Scroll Bar */}
        <ReadingProgressBar />

        {/* Custom Desktop Eco Cursor */}
        <CustomCursor />

        {/* Ambient Canvas Background (Leaves & Glowing Particles) */}
        <FloatingLeafCanvas />

        {/* Navigation */}
        <Navbar />

        {/* Page Sections */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SubjectOverviewSection />
          <AssignmentsSection />
          <GallerySection />
          <AchievementsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </ThemeProvider>
  );
}
