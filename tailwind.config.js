const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'className'
  theme: {
    extend: {
      colors: {
        purple: colors.purple,
        indigo: colors.indigo
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
