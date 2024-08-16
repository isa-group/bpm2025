import path from 'node:path';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import Icons from 'unplugin-icons/vite';
import compress from 'astro-compress';

import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
  lazyImagesRehypePlugin
} from './src/utils/frontmatter.mjs';

const DEPLOYED_URL = 'https://www.bpm2025seville.org';

export default defineConfig({
  output: 'static',
  site: DEPLOYED_URL,
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
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin]
  },

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
