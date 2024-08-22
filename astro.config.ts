import path from 'node:path';

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import Icons from 'unplugin-icons/vite';
import compress from 'astro-compress';
import { site } from './src/config.json';

export default defineConfig({
  output: 'static',
  base: process.env.CI && process.env.STAGING ? process.env.BASE_URL : '/',
  site: process.env.CI && process.env.STAGING ? process.env.SITE_URL : site.site,
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
  vite: {
    cacheDir: path.resolve(import.meta.dirname, './node_modules/.vite'),
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src')
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
