
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7f79ab4b1bae4fc99c72212bf7066415',
  appName: 'PatientConnect Health',
  webDir: 'dist',
  server: {
    url: 'https://7f79ab4b-1bae-4fc9-9c72-212bf7066415.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e',
      showSpinner: false
    }
  }
};

export default config;
