import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname, import.meta.dirname);

export default defineConfig({
  output: 'static',

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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
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
