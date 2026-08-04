import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only render cursor on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Interactive element hover detection
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.getAttribute('role') === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    let animationFrame;
    const follow = () => {
      setTrailPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrame = requestAnimationFrame(follow);
    };
    animationFrame = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-eco-accent rounded-full pointer-events-none z-50 transition-transform duration-75 ease-out shadow-eco-glow"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${isHovered ? 1.5 : 1})`,
        }}
      />
      {/* Outer Halo */}
      <div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-40 transition-all duration-300 ${
          isHovered
            ? 'w-12 h-12 border-eco-accent bg-eco-accent/10 scale-125'
            : 'w-8 h-8 border-eco-primary/40 dark:border-eco-accent/40 scale-100'
        }`}
        style={{
          transform: `translate3d(${trailPosition.x - (isHovered ? 24 : 16)}px, ${
            trailPosition.y - (isHovered ? 24 : 16)
          }px, 0)`,
        }}
      />
    </>
  );
};
