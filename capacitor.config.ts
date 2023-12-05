import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.amancpp.app',
  appName: 'fitness-tracker',
  webDir: 'dist/fitness-tracker',
  server: {
    androidScheme: 'https'
  }
};

export default config;
