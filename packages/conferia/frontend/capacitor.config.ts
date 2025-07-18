import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'icpm-navigator',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
