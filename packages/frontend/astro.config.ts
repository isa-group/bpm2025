import { resolve } from 'node:path';
import { availableParallelism } from 'node:os';

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import compress from '@playform/compress';
import AstroVue from '@astrojs/vue';

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
    AstroVue(),
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
