import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import browserslist from 'browserslist';
import UnoCSS from 'unocss/vite';
import { browserslistToTargets } from 'lightningcss';

export default defineConfig({
  appType: 'spa',
  base: './',
  plugins: [
    Vue(),
    UnoCSS()
  ],
  server: {
    host: '0.0.0.0'
  },
  build: {
    target: 'esnext',
    cssCodeSplit: false,
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
