/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
       sans: ['Inter', 'sans-serif'],
      },
      colors: {
        customnavcardbtn: '#556CD6',
        customsidebar: '#4758B8',
        customheading: '#212121',
        customSubheading: '#757575',
        custombackground: '#F4F5F7 ',
        floralWhite: '#FFFAF0',
        whiteSmoke: '#F5F5F5',
        antiqueWhite: '#FAEBD7',
      },
    },
  },
  plugins: [],
}