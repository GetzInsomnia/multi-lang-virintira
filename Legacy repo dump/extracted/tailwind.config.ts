import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-th)', 'var(--font-en)', 'sans-serif'],
      },
      colors: {
        primary: '#1D4ED8',
        secondary: '#F59E0B',
      },
      keyframes: {
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
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite',
        'gradient-border': 'gradient-border 3s linear infinite',
        softPing: 'softPing 2.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        pulseSlow: 'pulseSlow 2s ease-in-out infinite',
        flipY: 'flipY 6s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config

