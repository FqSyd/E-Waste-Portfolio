/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        eco: {
          primary: '#2E7D32',    // Primary Green
          secondary: '#43A047',  // Secondary Green
          accent: '#00C853',     // Vibrant Accent Green
          teal: '#26A69A',       // Teal Accent
          bg: '#F6FBF6',         // Eco Background Light
          card: '#FFFFFF',       // Card Background Light
          text: '#1B1B1B',       // Primary Text
          muted: '#666666',      // Secondary Text
          darkBg: '#0A120C',     // Eco Dark Background
          darkCard: '#131E15',   // Eco Dark Card
          darkText: '#E6F4E8',   // Eco Dark Text
          darkMuted: '#94A396',  // Eco Dark Muted Text
          border: '#E2EFE3',     // Subtle border light
          darkBorder: '#233826'  // Subtle border dark
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'eco-sm': '0 4px 20px -2px rgba(46, 125, 50, 0.08)',
        'eco-md': '0 10px 30px -5px rgba(46, 125, 50, 0.12)',
        'eco-lg': '0 20px 40px -10px rgba(46, 125, 50, 0.18)',
        'eco-glow': '0 0 25px rgba(0, 200, 83, 0.35)',
        'glass': '0 8px 32px 0 rgba(46, 125, 50, 0.07)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.47)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
