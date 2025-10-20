/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fortune-red': '#C41E3A',
        'deep-red': '#8B0000',
        'lucky-gold': '#FFD700',
        'rich-gold': '#B8860B',
        'prosperity-orange': '#FF6B35',
      },
      fontFamily: {
        'casino': ['"Black Ops One"', 'cursive'],
      },
    },
  },
  plugins: [],
}
