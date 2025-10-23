/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream-gold': '#F4E5C3',
        'peach-gold': '#FFE5B4',
        'antique-gold': '#D4AF37',
        'dark-gold': '#B8960B',
        'mid-gold': '#C4A137',
        'bright-gold': '#FFD700',
        'dark-red': '#8B0000',
        'dark-brown': '#8B4513',
      },
      fontFamily: {
        'casino': ['"Poppins"', 'sans-serif'],
        'sans': ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
