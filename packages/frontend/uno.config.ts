import { defineConfig } from 'unocss';
import config, { defaultPreset } from '@bpm2025-website/configs/uno';

export default defineConfig({
  ...config,
  safelist: ['i-svg-spinners:ring-resize'],
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
