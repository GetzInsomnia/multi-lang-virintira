const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
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
        header: '0 12px 48px rgba(167, 9, 9, 0.15)',
      },
      borderRadius: {
        '3xl': '1.75rem',
      },
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
