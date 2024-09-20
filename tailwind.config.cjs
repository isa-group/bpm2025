import defaultTheme from 'tailwindcss/defaultTheme';
import typographyPlugin from '@tailwindcss/typography';

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--aw-color-primary))',
        secondary: 'rgb(var(--aw-color-secondary))',
        accent: 'rgb(var(--aw-color-accent))',
        default: 'rgb(var(--aw-color-text-default))',
        muted: 'rgb(var(--aw-color-text-muted))'
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [typographyPlugin],
  darkMode: 'class'
};
