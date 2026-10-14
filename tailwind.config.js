/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FAFAF7',
        'bg-secondary': '#F3F3EE',
        surface: '#FFFFFF',
        'text-primary': '#171717',
        'text-secondary': '#707070',
        border: 'rgba(23, 23, 23, 0.08)',
        'border-strong': 'rgba(23, 23, 23, 0.16)',
        accent: {
          DEFAULT: '#A8B5A0',
          dark: '#7F8E78',
          light: '#E6EAE3',
        },
      },
      fontFamily: {
        handwritten: ['"Gochi Hand"', '"Caveat Brush"', 'cursive'],
        serif: ['"Instrument Serif"', 'Fraunces', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        media: '24px',
        input: '16px',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(23, 23, 23, 0.12)',
        subtle: '0 4px 20px -4px rgba(23, 23, 23, 0.06)',
        glow: '0 0 25px rgba(168, 181, 160, 0.25)',
      },
    },
  },
  plugins: [],
}
