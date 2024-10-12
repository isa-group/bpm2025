import { resolve } from 'node:path';
import { availableParallelism } from 'node:os';

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import Icons from 'unplugin-icons/vite';
import compress from 'astro-compress';

export default defineConfig({
  output: 'static',
  base: process.env.CI && process.env.STAGING ? process.env.BASE_URL : '/',
  site: process.env.CI && process.env.STAGING ? process.env.SITE_URL : 'https://www.bpm2025seville.org',
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds
    ]
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    sitemap(),
    mdx(),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
      Logger: 1
    })
  ],
  build: {
    assets: 'assets',
    concurrency: availableParallelism()
  },
  vite: {
    cacheDir: resolve(import.meta.dirname, './node_modules/.vite'),
    resolve: {
      alias: {
        '@': resolve(import.meta.dirname, './src')
      }
    },
    plugins: [Icons({
      compiler: 'astro',
      iconCustomizer(_, __, props) {
        props['astro-icon'] = '';
      }
    })]
  }
});
