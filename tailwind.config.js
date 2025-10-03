const plugin = require('tailwindcss/plugin');

const legacyColors = {
  primary: '#1D4ED8',
  secondary: '#F59E0B',
};

const legacyKeyframes = {
  blink: {
    '0%, 100%': { opacity: '0' },
    '50%': { opacity: '1' },
  },
  'gradient-border': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  softPing: {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '50%': { transform: 'scale(1.08)', opacity: '0.6' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-4px)' },
  },
  pulseSlow: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.7' },
  },
  flipY: {
    '0%': { transform: 'rotateY(0)' },
    '50%': { transform: 'rotateY(180deg)' },
    '100%': { transform: 'rotateY(360deg)' },
  },
};

const legacyAnimations = {
  blink: 'blink 1s ease-in-out infinite',
  'gradient-border': 'gradient-border 3s linear infinite',
  softPing: 'softPing 2.5s ease-in-out infinite',
  float: 'float 3s ease-in-out infinite',
  pulseSlow: 'pulseSlow 2s ease-in-out infinite',
  flipY: 'flipY 6s linear infinite',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-th)', 'var(--font-en)', 'sans-serif'],
      },
      colors: {
        ...legacyColors,
        virintira: {
          primary: '#A70909',
          'primary-dark': '#6B0606',
          muted: '#5D3F3F',
          border: 'rgba(167, 9, 9, 0.18)',
          foreground: '#2D0404',
          soft: '#FFF5F5',
        },
      },
      boxShadow: {
        header: '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        '3xl': '1.75rem',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(.22,1,.36,1)',
      },
      keyframes: legacyKeyframes,
      animation: legacyAnimations,
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0,0,0,0.15)',
        },
        '.text-shadow-lg': {
          textShadow: '0 6px 20px rgba(167,9,9,0.35)',
        },
      });
    }),
  ],
};
