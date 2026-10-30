/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F2EADB',
        cream: '#FAF6EE',
        ink: '#1B1B18',
        tomato: '#C9472B',
        olive: '#3F5B3A',
        mustard: '#E0A526',
        paleblue: '#CFE0E6',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Archivo"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'ink-sm': '3px 3px 0px #1B1B18',
        'ink': '5px 5px 0px #1B1B18',
        'ink-lg': '8px 8px 0px #1B1B18',
        'tomato': '5px 5px 0px #C9472B',
        'mustard': '5px 5px 0px #E0A526',
        'paper': '5px 5px 0px #F2EADB',
      },
      fontSize: {
        'slide-hero': ['clamp(2.6rem, 4.2vw, 4.8rem)', { lineHeight: '0.96', letterSpacing: '-0.03em' }],
        'slide-h1': ['clamp(2.2rem, 3.3vw, 3.85rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'slide-h2': ['clamp(1.35rem, 1.8vw, 2.1rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'slide-body': ['clamp(1.08rem, 1.28vw, 1.48rem)', { lineHeight: '1.38' }],
        'slide-meta': ['clamp(0.86rem, 0.96vw, 1.08rem)', { lineHeight: '1.35' }],
      },
    },
  },
  plugins: [],
};
