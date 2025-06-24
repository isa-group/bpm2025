import {
  defineConfig,
  presetWind4,
  transformerVariantGroup,
  presetTypography,
  presetIcons,
  transformerDirectives
} from 'unocss';

const defaultPreset = presetWind4({
  preflights: {
    reset: true
  }
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
    presetTypography(),
    presetIcons({
      warn: true,
      unit: '%',
      scale: 100
    })
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
  theme: {
    colors: {
      primary: 'var(--aw-color-primary)',
      secondary: 'var(--aw-color-secondary)',
      accent: 'var(--aw-color-accent)',
      default: 'var(--aw-color-text-default)',
      muted: 'var(--aw-color-text-muted)'
    },
    font: {
      sans: ['var(--aw-font-sans, ui-sans-serif)', defaultPreset.theme!.font!.sans].join(','),
      serif: ['var(--aw-font-serif, ui-serif)', defaultPreset.theme!.font!.serif].join(','),
      heading: ['var(--aw-font-heading, ui-sans-serif)', defaultPreset.theme!.font!.sans].join(',')
    }
  }
});
