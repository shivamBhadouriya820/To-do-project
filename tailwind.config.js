/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./*.html",      // Scan HTML files in the root folder
    "./*.{js,html}", // Include JS and HTML files
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}

