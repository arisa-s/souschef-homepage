/** @type {import('tailwindcss').Config} */
import { createThemes } from 'tw-colors'

export const colors = {
  light: {
    'brand-primary': '#1C121E',
    'brand-secondary': '#24333C',
    'neutral-0': '#FCFDFC',
    'neutral-50': '#F8FAF8',
    'neutral-100': '#F2F4F2',
    'neutral-200': '#ECEFEC',
    'neutral-300': '#E6E9E6',
    'neutral-400': '#E0E4E0',
    'neutral-500': '#C3C8C2',
    'neutral-600': '#8B918A',
    'neutral-700': '#818780',
    'neutral-800': '#6B716A',
    'neutral-900': '#141E12',
    'purple-900': '#A183BF',
    'purple-50': "#f4ebfc",
  },
  dark: {
    'brand-primary': '#EEECEE',
    'brand-secondary': '#D1D6D1',
    'neutral-0': '#151715',
    'neutral-50': '#1A1D19',
    'neutral-100': '#20241F',
    'neutral-200': '#262925',
    'neutral-300': '#2B2F2A',
    'neutral-400': '#313530',
    'neutral-500': '#4C514B',
    'neutral-600': '#687366',
    'neutral-700': '#778175',
    'neutral-800': '#9AA299',
    'neutral-900': '#ECEEEC',
    'purple-900': '#A183BF',
    'purple-50': '#655378',
  },
}

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['BasisGrotesque', 'Helvetica, Arial, sans-serif'],
        brand: ['Recoleta', 'Helvetica, Arial, sans-serif'],
        accent: ['RedRose', 'Helvetica, Arial, sans-serif'],
      },
      colors: {
        light: {
          brand: {
            primary: colors.light['brand-primary'],
            secondary: colors.light['brand-secondary'],
          },
        },
        dark: {
          brand: {
            primary: colors.dark['brand-primary'],
            secondary: colors.dark['brand-secondary'],
          },
        },
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        brand: {
          primary: colors.light['brand-primary'],
          secondary: colors.light['brand-secondary'],
        },
        neutral: {
          0: colors.light['neutral-0'],
          50: colors.light['neutral-50'],
          100: colors.light['neutral-100'],
          200: colors.light['neutral-200'],
          300: colors.light['neutral-300'],
          400: colors.light['neutral-400'],
          500: colors.light['neutral-500'],
          600: colors.light['neutral-600'],
          700: colors.light['neutral-700'],
          800: colors.light['neutral-800'],
          900: colors.light['neutral-900'],
        },
        surface: {
          primary: colors.light['neutral-0'],
          secondary: colors.light['neutral-100'],
          component: colors.light['brand-primary'],
          'component-active': colors.light['brand-secondary'],
          'component-disabled': colors.light['neutral-700'],
          'component-secondary': colors.light['neutral-100'],
          'component-hovered': colors.light['neutral-300'],
          ai: colors.light['purple-50'],
        },
        text: {
          primary: colors.light['neutral-900'],
          secondary: colors.light['neutral-800'],
          ternary: colors.light['neutral-500'],
          invert: colors.light['neutral-100'],
          ai: colors.light['purple-900'],
        },
        border: {
          primary: colors.light['neutral-400'],
          component: colors.light['neutral-500'],
          'component-disabled': colors.light['neutral-400'],
          'component-active': colors.light['neutral-600'],
        },
      },
      dark: {
        brand: {
          primary: colors.dark['brand-primary'],
          secondary: colors.dark['brand-secondary'],
        },
        neutral: {
          0: colors.dark['neutral-0'],
          50: colors.dark['neutral-50'],
          100: colors.dark['neutral-100'],
          200: colors.dark['neutral-200'],
          300: colors.dark['neutral-300'],
          400: colors.dark['neutral-400'],
          500: colors.dark['neutral-500'],
          600: colors.dark['neutral-600'],
          700: colors.dark['neutral-700'],
          800: colors.dark['neutral-800'],
          900: colors.dark['neutral-900'],
        },
        surface: {
          primary: colors.dark['neutral-200'],
          secondary: colors.dark['neutral-100'],
          component: colors.dark['brand-primary'],
          'component-active': colors.dark['brand-secondary'],
          'component-disabled': colors.dark['neutral-700'],
          'component-secondary': colors.dark['neutral-500'],
          'component-hovered': colors.dark['neutral-700'],
          ai: colors.dark['purple-50'],
        },
        text: {
          primary: colors.dark['neutral-900'],
          secondary: colors.dark['neutral-800'],
          ternary: colors.dark['neutral-500'],
          invert: colors.dark['neutral-100'],
          ai: colors.dark['purple-900'],
        },
        border: {
          primary: colors.dark['neutral-500'],
          component: colors.dark['neutral-500'],
          'component-disabled': colors.dark['neutral-400'],
          'component-active': colors.dark['neutral-600'],
        },
      },
    }),
  ],
}
