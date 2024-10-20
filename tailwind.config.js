// tailwind.config.js
module.exports = {
  content: [
    './index.html',        // Include the index.html file
    './src/**/*.{js,jsx}', // Include all React component files
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        darkBg: '#161a1d', // Add custom dark background color
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  plugins: [require('daisyui')], // Add DaisyUI as a plugin
};
