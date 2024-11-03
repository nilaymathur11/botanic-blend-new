/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        pink: {
          light: '#FFC0CB',
          DEFAULT: '#FF69B4',
          dark: '#FF1493',
        },
        green: {
          light: '#98FB98',
          DEFAULT: '#00FA9A',
          dark: '#2E8B57',
        },
      },
    },
  },
  plugins: [],
};