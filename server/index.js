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

// Static site assets (css/js/fonts/images/video) captured from the original site.
// Served from the client's public folder so we don't duplicate ~260MB into dist.
const MIRROR_DIR = path.join(ROOT, 'client', 'public', 'wp-mirror');
app.use('/wp-mirror', express.static(MIRROR_DIR, { maxAge: '30d', fallthrough: true }));

// Contact / lead form endpoint.
app.post('/api/contact', handleContact);
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Built React app (after `npm run build`).
const DIST = path.join(ROOT, 'client', 'dist');
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/wp-mirror')) return next();
    res.sendFile(path.join(DIST, 'index.html'));
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
