import { resolve } from 'node:path';
import { availableParallelism } from 'node:os';

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import compress from '@playform/compress';
import AstroVue from '@astrojs/vue';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  /* @unocss-ignore */
  output: 'static',
  base: process.env.CI && process.env.STAGING ? process.env.BASE_URL : '/',
  site: process.env.CI && process.env.STAGING ? process.env.SITE_URL ?? '/' : 'https://www.bpm2025seville.org',
  /**
   * GitHub Pages forces the use of trailing slashes: when they're not used, Astro
   * makes the redirection straightforward. However, this affects our SEO, since
   * unnecessary redirections are made. To avoid this, we're forcing the use of
   * trailingSlashes.
   */
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds
    ]
  },
  integrations: [
    UnoCSS(),
    sitemap(),
    mdx(),
    AstroVue({
      appEntrypoint: '@bpm2025-website/conferia-frontend/instance'
    }),
    AstroPWA({
      mode: 'production',
      base: '/app/',
      scope: '/app/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'BPM 2025',
        short_name: 'BPM 2025',
        description: 'Business Process Management 2025 Conference - Mobile App',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/app/',
        start_url: '/app/',
        icons: [
          {
            src: '/icons/pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: '/app/',
        globPatterns: ['**/app/**/*.{css,js,html,svg,png,ico,txt}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: false,
        navigateFallback: '/app/'
      }
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
      Logger: 1
    })
  ],
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true
  },
  build: {
    assets: 'assets',
    concurrency: availableParallelism(),
    inlineStylesheets: 'never'
  },
  vite: {
    cacheDir: resolve(import.meta.dirname, './node_modules/.vite'),
    build: {
      cssCodeSplit: false,
      reportCompressedSize: false
    }
  }
});
