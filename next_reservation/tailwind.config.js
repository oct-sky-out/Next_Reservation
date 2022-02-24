module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        emerald: '#48cfae',
      },
      borderColor: (theme) => ({
        emerald: '#48cfae',
      }),
      backgroundColor: (theme) => ({
        emerald: '#48cfae',
      }),
      width: {
        pictureCard: 'calc((100% - 48px)/3)',
        '100px': '100px',
        200: '200px',
        300: '300px',
        400: '400px',
        500: '500px',
        600: '600px',
        700: '700px',
        800: '800px',
        900: '900px',
        1000: '1000px',
      },
      height: {
        outOfHeader: 'calc(100vh - 240px)',
        '100px': '100px',
        200: '200px',
        300: '300px',
        400: '400px',
        500: '500px',
        600: '600px',
        700: '700px',
        800: '800px',
        900: '900px',
        1000: '1000px',
      },
      backgroundImage: {
        'mainImage-camping':
          'url(https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/mainpage%2Fcamping.jpg?alt=media&token=9d83d279-2311-4859-bc5f-902d0e3b70d1)',
      },
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
      inset: {
        '-3.1': '-3.1rem',
      },
      zIndex: {
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        8: '9',
      },
    },
  },
  variants: {
    Animation: ['fadeInAndUpForm'],
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-textshadow'),
  ],
};
