/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#641F36',
          dark: '#451425',
          light: '#7F2745',
          surface: '#330D1B',
        },
        wine: {
          DEFAULT: '#451425',
          deep: '#2F0B18',
          darkest: '#1E0711',
        },
        cream: {
          DEFAULT: '#F7F0E7',
          surface: '#FAF6F0',
          darker: '#EDE3D6',
        },
        dusky: {
          DEFAULT: '#C28B9A',
          hover: '#B37B8B',
          light: '#D3A3B0',
        },
        blush: {
          DEFAULT: '#DFB9BF',
          light: '#EAD1D5',
        },
        taupe: {
          DEFAULT: '#826D72',
          light: '#9B878C',
          dark: '#635155',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        display: ['"Fraunces"', '"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'cad': '0 0 0 1px rgba(100, 31, 54, 0.15), 0 4px 20px -2px rgba(69, 20, 37, 0.08)',
        'cad-dark': '0 0 0 1px rgba(247, 240, 231, 0.15), 0 8px 30px -4px rgba(0, 0, 0, 0.4)',
        'blueprint': 'inset 0 0 40px rgba(100, 31, 54, 0.05)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(100, 31, 54, 0.12) 1px, transparent 1px)",
        'grid-pattern-dark': "radial-gradient(circle, rgba(223, 185, 191, 0.15) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
