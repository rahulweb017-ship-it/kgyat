import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The mirrored WordPress assets live in public/wp-mirror (~260MB). We don't want
// Vite to copy them into dist on every build; instead the Node server serves them
// straight from public/wp-mirror. During `vite dev` they are still served at /wp-mirror.
export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    chunkSizeWarningLimit: 4000,
  },
  server: {
    port: 5173,
    proxy: {
      // Only the API is proxied to Node; /wp-mirror is served by Vite from public/.
      '/api': 'http://localhost:8787',
    },
  },
});
