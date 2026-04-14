import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f0f0f5',
          100: '#e0e0ea',
          200: '#c1c1d4',
          300: '#9ca3b0',
          400: '#6b7280',
          500: '#4a4a5a',
          600: '#2a2a3a',
          700: '#1e1e2e',
          800: '#161622',
          900: '#0d0d14',
          950: '#08080e',
        },
        neon: {
          pink: '#e91e8c',
          'pink-light': '#ff3da5',
          'pink-dark': '#c4177a',
          'pink-glow': 'rgba(233, 30, 140, 0.3)',
          cyan: '#00e5ff',
          'cyan-light': '#33ebff',
          'cyan-dark': '#0891b2',
          'cyan-glow': 'rgba(0, 229, 255, 0.3)',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
