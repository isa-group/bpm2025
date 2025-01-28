import { defineConfig, presetUno, transformerVariantGroup, presetTypography, transformerDirectives } from 'unocss';

const defaultPreset = presetUno({
  preflight: 'on-demand'
});

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(astro|html|js|jsx|json|md|mdx|svelte|ts|tsx|vue)($|\?)/
      ]
    }
  },
  rules: [
    ['bg-page', { 'background-color': 'rgb(var(--aw-color-bg-page));' }],
    ['bg-dark', { 'background-color': 'rgb(var(--aw-color-bg-page-dark));' }],
    ['bg-light', { 'background-color': 'rgb(var(--aw-color-bg-page));' }],
    ['text-page', { color: 'rgb(var(--aw-color-text-page));' }],
    ['text-muted', { color: 'rgb(var(--aw-color-text-muted));' }]
  ],
  presets: [
    defaultPreset,
    presetTypography()
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
  theme: {
    colors: {
      primary: 'rgb(var(--aw-color-primary))',
      secondary: 'rgb(var(--aw-color-secondary))',
      accent: 'rgb(var(--aw-color-accent))',
      default: 'rgb(var(--aw-color-text-default))',
      muted: 'rgb(var(--aw-color-text-muted))'
    },
    fontFamily: {
      sans: ['var(--aw-font-sans, ui-sans-serif)', defaultPreset.theme!.fontFamily!.sans].join(','),
      serif: ['var(--aw-font-serif, ui-serif)', defaultPreset.theme!.fontFamily!.serif].join(','),
      heading: ['var(--aw-font-heading, ui-sans-serif)', defaultPreset.theme!.fontFamily!.sans].join(',')
    }
  }
});
