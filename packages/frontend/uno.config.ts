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
  safelist: ['i-svg-spinners:ring-resize'],
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
      page: '#ffffff',
      dark: '#030620',
      primary: '#0161ef',
      secondary: '#0154cf',
      // accent: '#6d28d9',
      default: '#101010',
      muted: '#101010a8'
    },
    font: {
      sans: ['InterVariable', defaultPreset.theme!.font!.sans].join(','),
      serif: ['InterVariable', defaultPreset.theme!.font!.serif].join(','),
      heading: ['InterVariable', defaultPreset.theme!.font!.sans].join(',')
    }
  }
});
