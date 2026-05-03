/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PP Neue Montreal', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['PP Mondwest', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        primary: '#051A24',
        secondary: '#0D212C',
        muted: '#273C46',
        gold: '#D4A574',
        cream: '#F5F1E8',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-mobile': 'marquee 18s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        primary: '0 1px 2px 0 rgba(5,26,36,0.10), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)',
        card: '0 4px 16px rgba(0,0,0,0.08)',
        dark: '0 8px 32px rgba(5,26,36,0.18)',
      },
    },
  },
  plugins: [],
}
