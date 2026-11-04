/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#060911',
          900: '#0B0F17',
          800: '#0F172A',
          700: '#15203B',
          600: '#1E293B',
        },
        navy: {
          950: '#040b18',
          900: '#081526',
          800: '#0d1f38',
          700: '#132a4a',
          600: '#1b3a63',
        },
        electric: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        ember: {
          400: '#ffa633',
          500: '#ff8a00',
          600: '#cc6e00',
        },
        silver: {
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        'dot-pattern':
          "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(0,102,255,0.22), transparent 60%)',
        'radial-glow-cyan':
          'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.15), transparent 70%)',
        'silver-gradient':
          'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
        'hero-gradient':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,102,255,0.18), rgba(11,15,23,0) 100%)',
      },
      backgroundSize: {
        grid: '48px 48px',
        dot: '24px 24px',
      },
      boxShadow: {
        glow: '0 0 40px rgba(0,102,255,0.35)',
        'glow-lg': '0 0 80px rgba(0,102,255,0.25)',
        'glow-cyan': '0 0 40px rgba(6,182,212,0.25)',
        'glow-ember': '0 0 40px rgba(255,138,0,0.3)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-hover': '0 20px 50px rgba(0, 102, 255, 0.22)',
        'card-elevated': '0 12px 36px -8px rgba(0,0,0,0.6)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-10px) translateX(6px)' },
          '66%': { transform: 'translateY(6px) translateX(-5px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
};
