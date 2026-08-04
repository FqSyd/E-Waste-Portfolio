import React, { useEffect, useState } from 'react';

export const ReadingProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-eco-border/40 dark:bg-eco-darkBorder/40">
      <div
        className="h-full bg-gradient-to-r from-eco-primary via-eco-secondary to-eco-accent transition-all duration-150 ease-out shadow-eco-glow"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
