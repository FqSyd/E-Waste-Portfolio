import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const FloatingLeafCanvas = () => {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles array
    const particles = [];
    const particleCount = 28;

    class EcoParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 12 + 8;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.type = Math.random() > 0.4 ? 'leaf' : (Math.random() > 0.5 ? 'glow' : 'recycle');
      }

      update() {
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'leaf') {
          // Draw leaf shape
          ctx.fillStyle = darkMode ? '#00C853' : '#2E7D32';
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.quadraticCurveTo(this.size * 0.8, 0, 0, this.size);
          ctx.quadraticCurveTo(-this.size * 0.8, 0, 0, -this.size);
          ctx.fill();
          
          // Leaf stem line
          ctx.strokeStyle = darkMode ? '#43A047' : '#1B5E20';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -this.size * 0.8);
          ctx.lineTo(0, this.size * 0.8);
          ctx.stroke();
        } else if (this.type === 'glow') {
          // Draw glowing orb particle
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
          gradient.addColorStop(0, darkMode ? 'rgba(0, 200, 83, 0.4)' : 'rgba(46, 125, 50, 0.3)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw subtle eco node circle with crosshatch
          ctx.strokeStyle = darkMode ? 'rgba(38, 166, 154, 0.6)' : 'rgba(43, 160, 71, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new EcoParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};
