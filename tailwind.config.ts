import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'brand-primary': 'var(--brand-primary)',
        'brand-secondary': 'var(--brand-secondary)',

        /* Neutral colors */
        'neutral-0': 'var(--neutral-0)',
        'neutral-50': 'var(--neutral-50)',
        'neutral-100': 'var(--neutral-100)',
        'neutral-200': 'var(--neutral-200)',
        'neutral-300': 'var(--neutral-300)',
        'neutral-400': 'var(--neutral-400)',
        'neutral-500': 'var(--neutral-500)',
        'neutral-600': 'var(--neutral-600)',
        'neutral-700': 'var(--neutral-700)',
        'neutral-800': 'var(--neutral-800)',
        'neutral-900': 'var(--neutral-900)',

        /* Text colors */
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-ternary': 'var(--text-ternary)',
        'text-invert': 'var(--text-invert)',
        'text-error': 'var(--text-error)',

        /* Surface colors */
        'surface-primary': 'var(--surface-primary)',
        'surface-secondary': 'var(--surface-secondary)',
        'surface-component': 'var(--surface-component)',
        'surface-component-secondary': 'var(--surface-component-secondary)',
        'surface-component-hover': 'var(--surface-component-hover)',
        'surface-hover': 'var(--surface-hover)',
      },
      borderColor: {
        DEFAULT: 'var(--border-primary)',
      },
      fontFamily: {
        accent: ['var(--font-accent)'],
        base: ['var(--font-base)'],
        brand: ['var(--font-brand)'],
      },
    },
  },
  plugins: [],
} satisfies Config
