import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0'
  },
  base: '/',
  publicDir: 'public',
  build: {
    cssCodeSplit: true,
    minify: 'terser'
  }
});
