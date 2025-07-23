import {
  defineConfig,
  presetWind4,
  transformerVariantGroup,
  presetTypography,
  presetIcons,
  transformerDirectives
} from 'unocss';

export const defaultPreset = presetWind4({
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
  ]
});
