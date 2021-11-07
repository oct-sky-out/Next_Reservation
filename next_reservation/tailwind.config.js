module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      borderColor: (theme) => ({
        emerald: '#48cfae',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
