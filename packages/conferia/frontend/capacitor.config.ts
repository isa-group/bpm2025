import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.bpm.2025seville',
  appName: 'BPM 2025 Conference',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
