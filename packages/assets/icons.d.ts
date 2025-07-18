import type { ImageMetadata } from 'astro';

declare module '@bpm2025-website/assets/icon' {
  const icon: ImageMetadata;
  export default icon;
}
