import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The mirrored WordPress assets live in public/media (~260MB). We don't want
// Vite to copy them into dist on every build; instead the Node server serves them
// straight from public/media. During `vite dev` they are still served at /media.
export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    chunkSizeWarningLimit: 4000,
  },
  server: {
    port: 5173,
    proxy: {
      // Only the API is proxied to Node; /media is served by Vite from public/.
      '/api': 'http://localhost:8787',
    },
  },
});
