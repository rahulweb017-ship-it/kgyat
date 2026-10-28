import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { handleContact } from './contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 8787;

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Static media assets (css/js/fonts/images/video).
// Served from the client's public/media folder.
const MEDIA_DIR = path.join(ROOT, 'client', 'public', 'media');
app.use('/media', express.static(MEDIA_DIR, { maxAge: '30d', fallthrough: true }));
// Legacy redirect from /wp-mirror to /media for backward compatibility
app.use('/wp-mirror', (req, res) => res.redirect(301, '/media' + req.url));

// Contact / lead form endpoint.
app.post('/api/contact', handleContact);
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Built React app (after `npm run build`).
const DIST = path.join(ROOT, 'client', 'dist');
if (fs.existsSync(DIST)) {
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });
  app.use(express.static(DIST, { maxAge: 0, etag: false }));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/media') || req.path.startsWith('/wp-mirror')) return next();
    const cleanPath = req.path.replace(/^\/+|\/+$/g, '');
    const routeIndex = path.join(DIST, cleanPath, 'index.html');
    if (cleanPath && fs.existsSync(routeIndex)) {
      return res.sendFile(routeIndex, { etag: false });
    }
    res.sendFile(path.join(DIST, 'index.html'), { etag: false });
  });
} else {
  app.get('/', (_req, res) => {
    res
      .status(200)
      .send('<h1>Kgyat API server</h1><p>Client build not found. Run <code>npm run build</code>, or use <code>npm run client:dev</code> for development (Vite on :5173).</p>');
  });
}

const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Kgyat server listening on http://${HOST}:${PORT}`);
  if (!fs.existsSync(DIST)) console.log('  (serving API + /wp-mirror only; run the Vite dev server for the UI)');
});
