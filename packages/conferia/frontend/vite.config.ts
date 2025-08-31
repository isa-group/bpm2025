import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import browserslist from 'browserslist';
import UnoCSS from 'unocss/vite';
import { browserslistToTargets } from 'lightningcss';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  appType: 'spa',
  base: './',
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Vue() as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UnoCSS() as any,
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      },
      includeAssets: ['favicon.svg', 'apple-touch-icon.svg'],
      manifest: {
        name: 'BPM 2025 Conference',
        short_name: 'BPM 2025',
        description: 'Business Process Management 2025 Conference App',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
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
