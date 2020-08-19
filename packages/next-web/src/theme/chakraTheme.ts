import { theme as chakraTheme } from '@chakra-ui/core';
import numberToRemScale from './numberToRemScale';

const theme = {
  ...chakraTheme,
  radii: {
    ...chakraTheme.radii,
    none: '0',
    sm: '0.1rem',
    md: '0.4rem',
    lg: '0.8rem',
    full: '1.2rem',
  },
  fontSizes: {
    xs: '1.2rem', // "0.75rem",
    sm: '1.4rem', // "0.875rem",
    md: '1.6rem', // "1rem",
    lg: '1.8rem', // "1.125rem",
    xl: '2rem', // "1.25rem",
    '2xl': '2.4rem', // "1.5rem",
    '3xl': '3rem', // "1.875rem",
    '4xl': '3.6rem', // "2.25rem",
    '5xl': '4.8rem', // "3rem",
    '6xl': '6.4rem', // "4rem",
  },
  space: {
    ...chakraTheme.space,
    ...numberToRemScale,
  },
  sizes: {
    ...chakraTheme.sizes,
    ...numberToRemScale,
    full: '100%',
    '3xs': '22.4rem',
    '2xs': '25.6rem',
    xs: '32rem',
    sm: '38.4rem',
    md: '44.8rem',
    lg: '51.2rem',
    xl: '57.6rem',
    '2xl': '67.2rem',
    '3xl': '76.8rem',
    '4xl': '89.6rem',
    '5xl': '102.4rem',
    '6xl': '115.2rem',
    containers: {
      sm: '38.4rem',
      md: '44.8rem',
      lg: '51.2rem',
      xl: '57.6rem',
    },
  },
};

export default theme;
