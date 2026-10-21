import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Target, 
  Code, 
  Award, 
  FileText, 
  Camera, 
  BarChart3
} from 'lucide-react';
import { studentData } from '../data/studentData';
import { assignmentData } from '../data/assignmentData';
import { galleryData } from '../data/galleryData';
import { achievementData } from '../data/achievementData';
import { getStoredItems, STORE_ASSIGNMENTS, STORE_GALLERY } from '../utils/storage';

const Counter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end) || end === 0) {
      setCount(0);
      return;
    }
    const totalSteps = 25;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}</span>;
};

export const AboutSection = () => {
  const [assignmentCount, setAssignmentCount] = useState(assignmentData.length);
  const [galleryCount, setGalleryCount] = useState(galleryData.length);
  const [certificateCount, setCertificateCount] = useState(achievementData.length);

  const calculateCounts = async () => {
    // 1. Assignments count
    try {
      const customAss = await getStoredItems(STORE_ASSIGNMENTS);
      const existingAssIds = new Set(assignmentData.map(a => a.id));
      const uniqueAss = customAss.filter(item => !existingAssIds.has(item.id));
      setAssignmentCount(assignmentData.length + uniqueAss.length);

      // 2. Gallery Photos count (count all photos across all albums)
      const customGal = await getStoredItems(STORE_GALLERY);
      const existingGalIds = new Set(galleryData.map(g => g.id));
      const uniqueGal = customGal.filter(item => !existingGalIds.has(item.id));
      const allAlbums = [...galleryData, ...uniqueGal];
      const totalPhotos = allAlbums.reduce((acc, curr) => acc + (curr.images?.length || 1), 0);
      setGalleryCount(totalPhotos);
    } catch (e) {
      setAssignmentCount(assignmentData.length);
      const totalPhotos = galleryData.reduce((acc, curr) => acc + (curr.images?.length || 1), 0);
      setGalleryCount(totalPhotos);
    }

    // 3. Certificates
    setCertificateCount(achievementData.length);
  };

  useEffect(() => {
    calculateCounts();

    const handleStatsUpdate = () => calculateCounts();
    window.addEventListener('portfolio_stats_updated', handleStatsUpdate);
    window.addEventListener('storage', handleStatsUpdate);

    return () => {
      window.removeEventListener('portfolio_stats_updated', handleStatsUpdate);
      window.removeEventListener('storage', handleStatsUpdate);
    };
  }, []);

  return (
    <section id="about" className="py-20 relative bg-eco-bg dark:bg-eco-darkBg overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-eco-primary dark:text-eco-accent bg-eco-primary/10 dark:bg-eco-accent/10 px-4 py-1.5 rounded-full mb-3">
            Profile Overview
          </span>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-5xl text-eco-text dark:text-eco-darkText tracking-tight">
            About Student & Resume
          </h2>
          <p className="mt-4 text-eco-muted dark:text-eco-darkMuted text-base">
            {studentData.title} at Vidyalankar Institute of Technology, Mumbai.
          </p>
        </div>

        {/* Main Grid: Left Profile Photo & Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Uploaded Suit Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card rounded-3xl p-6 border border-eco-border dark:border-eco-darkBorder shadow-eco-md"
          >
            {/* Real Profile Photo Frame */}
            <div className="relative w-full h-96 sm:h-[420px] rounded-2xl overflow-hidden mb-6 border-2 border-eco-primary/30 dark:border-eco-accent/30 shadow-eco-glow group">
              <img
                src={studentData.profileImage}
                alt={studentData.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-xl backdrop-blur-md bg-white/80 dark:bg-eco-darkCard/80 border border-eco-border/40 text-center">
                <span className="block font-outfit font-bold text-lg text-eco-text dark:text-eco-darkText">{studentData.name}</span>
                <span className="text-xs text-eco-primary dark:text-eco-accent font-semibold">{studentData.title}</span>
                <span className="block text-[11px] text-eco-muted dark:text-eco-darkMuted mt-0.5">{studentData.college}</span>
              </div>
            </div>

            {/* Quick Education Path */}
            <div className="space-y-3">
              <h3 className="font-outfit font-bold text-base text-eco-text dark:text-eco-darkText flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-eco-primary dark:text-eco-accent" />
                <span>Education Background</span>
              </h3>

              {studentData.aboutMe.education.map((edu, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/60 dark:bg-eco-darkBg/60 border border-eco-border/60 dark:border-eco-darkBorder/60">
                  <span className="block font-semibold text-xs text-eco-text dark:text-eco-darkText">{edu.degree}</span>
                  <span className="block text-xs text-eco-muted dark:text-eco-darkMuted mt-0.5">{edu.institution}</span>
                  <div className="flex items-center justify-between mt-2 text-[11px]">
                    <span className="font-medium text-eco-primary dark:text-eco-accent">{edu.year}</span>
                    <span className="bg-eco-primary/10 dark:bg-eco-accent/10 px-2 py-0.5 rounded text-eco-primary dark:text-eco-accent font-bold">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Summary, Projects, Objective */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Professional Summary Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-eco-border dark:border-eco-darkBorder shadow-eco-sm">
              <h3 className="font-outfit font-bold text-xl text-eco-text dark:text-eco-darkText mb-3 flex items-center space-x-2">
                <User className="w-5 h-5 text-eco-primary dark:text-eco-accent" />
                <span>Professional Summary</span>
              </h3>
              <p className="text-sm sm:text-base text-eco-muted dark:text-eco-darkMuted leading-relaxed">
                {studentData.aboutMe.shortIntro}
              </p>
            </div>

            {/* Featured Resume Projects */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-eco-border dark:border-eco-darkBorder shadow-eco-sm">
              <h3 className="font-outfit font-bold text-xl text-eco-text dark:text-eco-darkText mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-eco-primary dark:text-eco-accent" />
                <span>Featured Technical Projects</span>
              </h3>
              
              <div className="space-y-4">
                {studentData.aboutMe.projects.map((project, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/70 dark:bg-eco-darkBg/70 border border-eco-border/60 dark:border-eco-darkBorder/60 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-outfit font-bold text-sm text-eco-text dark:text-eco-darkText">
                        {project.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-eco-primary dark:text-eco-accent bg-eco-primary/10 dark:bg-eco-accent/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                        {project.tech}
                      </span>
                    </div>
                    <p className="text-xs text-eco-muted dark:text-eco-darkMuted leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Objective */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-eco-border dark:border-eco-darkBorder shadow-eco-sm">
              <h3 className="font-outfit font-bold text-xl text-eco-text dark:text-eco-darkText mb-3 flex items-center space-x-2">
                <Target className="w-5 h-5 text-eco-primary dark:text-eco-accent" />
                <span>Career Objective</span>
              </h3>
              <p className="text-sm sm:text-base text-eco-muted dark:text-eco-darkMuted leading-relaxed">
                {studentData.aboutMe.careerObjective}
              </p>
            </div>

          </motion.div>

        </div>

        {/* Skills Animated Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 border border-eco-border dark:border-eco-darkBorder shadow-eco-md mb-16"
        >
          <h3 className="font-outfit font-bold text-2xl text-eco-text dark:text-eco-darkText mb-6 flex items-center space-x-3">
            <Code className="w-6 h-6 text-eco-primary dark:text-eco-accent" />
            <span>Technical & Analytics Skills</span>
          </h3>

          <div className="flex flex-wrap gap-3">
            {studentData.skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-eco-primary/10 to-eco-accent/10 hover:from-eco-primary hover:to-eco-accent hover:text-white border border-eco-primary/20 dark:border-eco-accent/30 text-eco-text dark:text-eco-darkText text-xs font-bold transition-all shadow-sm flex items-center space-x-2 cursor-pointer"
              >
                <span>{skill.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({skill.category})</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Dynamic Statistics Counters (3 Cards: Assignments, Certifications, Gallery) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Assignments Uploaded */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 text-center border border-eco-border dark:border-eco-darkBorder shadow-eco-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-eco-primary/10 text-eco-primary mx-auto mb-3 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div className="font-outfit font-extrabold text-3xl sm:text-4xl text-eco-primary dark:text-eco-accent mb-1">
              <Counter value={assignmentCount} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-eco-muted dark:text-eco-darkMuted">
              Assignments Uploaded
            </span>
          </motion.div>

          {/* Card 2: Certifications Earned */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 text-center border border-eco-border dark:border-eco-darkBorder shadow-eco-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-eco-teal/10 text-eco-teal mx-auto mb-3 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div className="font-outfit font-extrabold text-3xl sm:text-4xl text-eco-teal dark:text-eco-accent mb-1">
              <Counter value={certificateCount} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-eco-muted dark:text-eco-darkMuted">
              Certifications Earned
            </span>
          </motion.div>

          {/* Card 3: Gallery Photos */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 text-center border border-eco-border dark:border-eco-darkBorder shadow-eco-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-eco-accent/10 text-eco-accent mx-auto mb-3 flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <div className="font-outfit font-extrabold text-3xl sm:text-4xl text-eco-accent mb-1">
              <Counter value={galleryCount} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-eco-muted dark:text-eco-darkMuted">
              Gallery Photos
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
