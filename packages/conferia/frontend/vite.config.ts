import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

export default defineConfig({
  appType: 'spa',
  base: './',
  plugins: [
    vue()
  ],
  server: {
    host: '0.0.0.0'
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    modulePreload: {
      polyfill: false
    },
    reportCompressedSize: false
  },
  css: {
    lightningcss: {
      nonStandard: {
        deepSelectorCombinator: true
      },
      targets: browserslistToTargets(browserslist())
    }
  },
  worker: {
    format: 'es'
  }
});
