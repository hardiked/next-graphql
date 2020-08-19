// eslint-disable-next-line @typescript-eslint/no-var-requires
const numberToRemScale = require('./src/theme/numberToRemScale');

module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '1.2rem', //'.75rem',
      sm: '1.4rem',
      base: '1.6rem',
      lg: '1.8rem',
      xl: '2rem',
      '2xl': '2.4rem',
      '3xl': '3rem',
      '4xl': '3.6rem',
      '5xl': '4.8rem',
      '6xl': '6.4rem',
      '7xl': '8rem',
    },
    spacing: {
      ...numberToRemScale,
    },
    borderRadius: {
      none: '0',
      sm: '0.2rem',
      default: '0.4rem',
      md: '0.6rem',
      lg: '0.8rem',
      full: '999.9rem',
      large: '1.2rem',
    },
  },
  variants: {},
  plugins: [],
};
