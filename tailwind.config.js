/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eu: {
          blue: '#0B2A6B',
          yellow: '#FFCC00',
          light: '#F6F4EC',
          navy: '#061A44',
          sky: '#BFD7FF',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'slide-hero': ['clamp(2.5rem, 3.8vw, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'slide-h1': ['clamp(2.15rem, 3.1vw, 3.65rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'slide-h2': ['clamp(1.35rem, 1.75vw, 2.05rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'slide-body': ['clamp(1.1rem, 1.3vw, 1.5rem)', { lineHeight: '1.42' }],
        'slide-meta': ['clamp(0.88rem, 0.98vw, 1.12rem)', { lineHeight: '1.38' }],
      },
    },
  },
  plugins: [],
};
