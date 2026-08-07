/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerBlue: '#1b75bc',
        headerLightText: '#BCE3F7',
        navOrange: '#FF7700',
        dropdownGreen: '#2D3E15',
        dropdownHover: '#1f2e0d',
        btnGreen: '#00C853',
        btnGreenHover: '#00A844',
        btnYellow: '#FFB800',
        btnYellowHover: '#E5A600',
        footerPurple: '#7A298D',
        accentYellow: '#FFD700',
      },
      fontFamily: {
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        open: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
