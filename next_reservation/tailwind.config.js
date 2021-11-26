module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      borderColor: (theme) => ({
        emerald: '#48cfae',
      }),
      backgroundColor: (theme) => ({
        emerald: '#48cfae',
      }),
      keyframes: {
        fadeInAndUpForm: {
          '0%': {
            transform: 'translateY(25%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        fadeInAndUpForm: 'fadeInAndUpForm 1s ease none',
      },
    },
  },
  variants: {
    Animation: ['fadeInAndUpForm'],
    extend: {},
  },
  plugins: [],
};
