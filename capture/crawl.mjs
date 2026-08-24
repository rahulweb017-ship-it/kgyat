// Capture pipeline: mirror the live WordPress (Elementor) site into a static
// asset tree + per-page manifest that the React app consumes for a pixel-exact clone.
//
// Usage: node capture/crawl.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---- Config -----------------------------------------------------------------
const SITE_ORIGIN = 'http://localhost';
const SITE_BASE = '/kgyat'; // WP install lives under this path
const BASE_URL = SITE_ORIGIN + SITE_BASE; // http://localhost/kgyat
const FRONT_PAGE_ID = 8; // "Home-2" is set as page_on_front

const MIRROR_DIR = path.join(ROOT, 'client', 'public', 'wp-mirror');
const MANIFEST_OUT = path.join(ROOT, 'client', 'src', 'manifest.json');
const PAGES_TSV = path.join(__dirname, 'pages.tsv');

// ---- Helpers ----------------------------------------------------------------
const STATIC_EXT = /\.(css|js|mjs|png|jpe?g|gif|svg|webp|avif|ico|bmp|woff2?|ttf|otf|eot|mp4|webm|ogg|mp3|wav|pdf|json|map)(\?|#|$)/i;

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

/** Path (after /kgyat) used both for local storage and the /wp-mirror URL. */
function mirrorRelPath(urlObj) {
  let p = urlObj.pathname;
  if (p.startsWith(SITE_BASE + '/')) p = p.slice(SITE_BASE.length); // strip /kgyat
  else if (p === SITE_BASE) p = '/';
  return p.replace(/^\/+/, ''); // no leading slash
}

function isInternal(urlObj) {
  return urlObj.origin === SITE_ORIGIN && (urlObj.pathname === SITE_BASE || urlObj.pathname.startsWith(SITE_BASE + '/'));
}

function looksStatic(urlObj) {
  const p = urlObj.pathname;
  return STATIC_EXT.test(p) || /\/wp-content\/|\/wp-includes\//.test(p);
}

// ---- Page list & permalink resolution --------------------------------------
function loadPages() {
  const raw = fs.readFileSync(PAGES_TSV, 'utf8').trim().split(/\r?\n/);
  const header = raw.shift().split('\t');
  const idx = Object.fromEntries(header.map((h, i) => [h, i]));
  const pages = raw.map((line) => {
    const c = line.split('\t');
    return {
      id: Number(c[idx.ID]),
      parent: Number(c[idx.post_parent]),
      slug: c[idx.post_name],
      title: c[idx.post_title],
      order: Number(c[idx.menu_order]),
    };
  });
  const byId = new Map(pages.map((p) => [p.id, p]));
  for (const p of pages) {
    const segs = [];
    let cur = p;
    const seen = new Set();
    while (cur && !seen.has(cur.id)) {
      seen.add(cur.id);
      segs.unshift(cur.slug);
      cur = cur.parent ? byId.get(cur.parent) : null;
    }
    p.pathSegs = segs;
    p.route = p.id === FRONT_PAGE_ID ? '/' : '/' + segs.join('/');
    p.url = p.id === FRONT_PAGE_ID ? BASE_URL + '/' : BASE_URL + '/' + segs.join('/') + '/';
  }
  return { pages, byId };
}

// Map of every internal permalink pathname -> SPA route, for link rewriting.
function buildLinkMap(pages) {
  const map = new Map();
  for (const p of pages) {
    const withSlash = (p.route === '/' ? SITE_BASE + '/' : SITE_BASE + '/' + p.pathSegs.join('/') + '/');
    const noSlash = SITE_BASE + '/' + p.pathSegs.join('/');
    map.set(withSlash, p.route);
    map.set(noSlash, p.route);
  }
  map.set(SITE_BASE + '/', '/');
  map.set(SITE_BASE, '/');
  return map;
}

// ---- Asset download queue ---------------------------------------------------
const assetQueue = new Map(); // localRel -> absUrl
const downloaded = new Set();

function enqueueAsset(urlObj) {
  const rel = mirrorRelPath(urlObj);
  if (!rel || rel.endsWith('/')) return null;
  if (!assetQueue.has(rel)) assetQueue.set(rel, urlObj.href);
  return '/wp-mirror/' + rel;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// XAMPP/Apache on Windows resets reused keep-alive sockets under bursts, so
// force a fresh connection and retry a few times.
async function fetchRetry(url, opts = {}, tries = 4) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        ...opts,
        headers: { Connection: 'close', ...(opts.headers || {}) },
      });
      return res;
    } catch (e) {
      lastErr = e;
      await sleep(120 * (i + 1));
    }
  }
  throw lastErr;
}

async function fetchBuffer(url) {
  const res = await fetchRetry(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// Rewrite url(...) and @import inside a CSS text; enqueue referenced assets.
function rewriteCss(cssText, cssAbsUrl) {
  const replaceRef = (ref) => {
    const clean = ref.trim().replace(/^['"]/, '').replace(/['"]$/, '');
    if (!clean || clean.startsWith('data:') || clean.startsWith('#')) return ref;
    let abs;
    try { abs = new URL(clean, cssAbsUrl); } catch { return ref; }
    if (!isInternal(abs)) return ref;
    const local = enqueueAsset(abs);
    return local ? ref.replace(clean, local) : ref;
  };
  cssText = cssText.replace(/url\(\s*(['"]?[^)'"]+['"]?)\s*\)/gi, (m, g1) => `url(${replaceRef(g1)})`);
  cssText = cssText.replace(/@import\s+(['"])([^'"]+)\1/gi, (m, q, g2) => `@import ${q}${replaceRef(g2)}${q}`);
  return cssText;
}

async function processQueue() {
  let processed = 0;
  while (assetQueue.size > 0) {
    const [rel, url] = assetQueue.entries().next().value;
    assetQueue.delete(rel);
    if (downloaded.has(rel)) continue;
    downloaded.add(rel);
    const dest = path.join(MIRROR_DIR, rel);
    if (!process.env.RECAPTURE_ASSETS && fs.existsSync(dest)) { continue; } // already mirrored
    try {
      const buf = await fetchBuffer(url);
      if (/\.css(\?|#|$)/i.test(url)) {
        const rewritten = rewriteCss(buf.toString('utf8'), url);
        ensureDir(dest);
        fs.writeFileSync(dest, rewritten, 'utf8');
      } else {
        ensureDir(dest);
        fs.writeFileSync(dest, buf);
      }
      processed++;
      if (processed % 25 === 0) console.log(`  ...mirrored ${processed} assets (queue ${assetQueue.size})`);
    } catch (e) {
      console.warn(`  ! asset failed: ${url} (${e.message})`);
    }
  }
  return processed;
}

// ---- URL rewriting for a page DOM -------------------------------------------
function rewriteAttrUrl(raw, linkMap) {
  if (!raw) return raw;
  const val = raw.trim();
  if (!val || val.startsWith('data:') || val.startsWith('#') || val.startsWith('mailto:') || val.startsWith('tel:') || val.startsWith('javascript:')) return raw;
  let abs;
  try { abs = new URL(val, BASE_URL + '/'); } catch { return raw; }
  if (!isInternal(abs)) return raw;
  if (looksStatic(abs)) return enqueueAsset(abs) || raw;
  // internal page link -> SPA route
  const key = abs.pathname.replace(/\/+$/, '') || SITE_BASE;
  return linkMap.get(abs.pathname) || linkMap.get(key) || linkMap.get(key + '/') || abs.pathname.replace(SITE_BASE, '') || '/';
}

function rewriteSrcset(raw, linkMap) {
  return raw.split(',').map((part) => {
    const seg = part.trim();
    if (!seg) return '';
    const sp = seg.split(/\s+/);
    sp[0] = rewriteAttrUrl(sp[0], linkMap);
    return sp.join(' ');
  }).filter(Boolean).join(', ');
}

function rewriteStyleText(text, baseAbs = BASE_URL + '/') {
  return text.replace(/url\(\s*(['"]?[^)'"]+['"]?)\s*\)/gi, (m, g1) => {
    const clean = g1.trim().replace(/^['"]/, '').replace(/['"]$/, '');
    if (!clean || clean.startsWith('data:')) return m;
    let abs; try { abs = new URL(clean, baseAbs); } catch { return m; }
    if (!isInternal(abs)) return m;
    const local = enqueueAsset(abs);
    return local ? `url(${local})` : m;
  });
}

// ---- Per-page capture -------------------------------------------------------
async function capturePage(page, linkMap) {
  const res = await fetchRetry(page.url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html, { decodeEntities: false });

  const title = ($('title').first().text() || page.title).trim();
  const metaDescription = $('meta[name="description"]').attr('content') || '';
  const bodyClass = $('body').attr('class') || '';

  // Head stylesheet links (in order) + inline <style> blocks.
  const css = [];
  $('head link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href');
    const local = rewriteAttrUrl(href, linkMap);
    if (local) css.push(local);
  });
  const headStyles = [];
  $('head style').each((_, el) => {
    const t = $(el).html();
    if (t && t.trim()) headStyles.push(rewriteStyleText(t));
  });

  // All scripts in document order: external files are mirrored, inline config
  // scripts (elementorFrontendConfig, eael settings, etc.) are kept so the app
  // can replay them to initialise widgets. JSON-LD / template scripts skipped.
  const js = []; // external-only list (kept for back-compat / preloading)
  const scripts = [];
  $('script').each((_, el) => {
    const $el = $(el);
    const src = $el.attr('src');
    const type = ($el.attr('type') || '').toLowerCase();
    if (src) {
      let abs; try { abs = new URL(src, BASE_URL + '/'); } catch { return; }
      if (isInternal(abs) && looksStatic(abs)) {
        const local = enqueueAsset(abs);
        if (local) { js.push(local); scripts.push({ t: 's', u: local, id: $el.attr('id') || '' }); }
      } else if (abs && abs.origin !== SITE_ORIGIN) {
        scripts.push({ t: 's', u: abs.href, id: $el.attr('id') || '' });
      }
      return;
    }
    // inline
    if (type && !['', 'text/javascript', 'application/javascript', 'module'].includes(type)) return; // skip ld+json, html templates
    let code = $el.html() || '';
    if (!code.trim()) return;
    // localise any absolute asset URLs referenced in inline JS
    code = code.split(BASE_URL + '/').join('/wp-mirror/');
    scripts.push({ t: 'i', c: code, id: $el.attr('id') || '' });
  });

  // Work on the body content wrapper.
  const $wrap = $('#page').length ? $('#page') : $('body');
  // Rewrite all URL-bearing attributes inside head-carried styles already done;
  // now rewrite the content subtree.
  $wrap.find('[href]').each((_, el) => {
    const v = $(el).attr('href');
    $(el).attr('href', rewriteAttrUrl(v, linkMap));
  });
  $wrap.find('[src]').each((_, el) => {
    $(el).attr('src', rewriteAttrUrl($(el).attr('src'), linkMap));
  });
  ['data-src', 'data-bg', 'data-background', 'poster', 'data-large_image'].forEach((attr) => {
    $wrap.find(`[${attr}]`).each((_, el) => {
      $(el).attr(attr, rewriteAttrUrl($(el).attr(attr), linkMap));
    });
  });
  $wrap.find('[srcset]').each((_, el) => {
    $(el).attr('srcset', rewriteSrcset($(el).attr('srcset'), linkMap));
  });
  $wrap.find('[data-srcset]').each((_, el) => {
    $(el).attr('data-srcset', rewriteSrcset($(el).attr('data-srcset'), linkMap));
  });
  $wrap.find('[style]').each((_, el) => {
    $(el).attr('style', rewriteStyleText($(el).attr('style')));
  });
  // Body-level <style> blocks (Elementor per-container CSS) — rewrite url()s, keep inline.
  $wrap.find('style').each((_, el) => {
    const t = $(el).html();
    if (t) $(el).html(rewriteStyleText(t));
  });
  // Drop scripts from content (loaded globally + re-init by the app).
  $wrap.find('script').remove();

  const contentHtml = $wrap.html() || '';

  return {
    id: page.id,
    slug: page.slug,
    route: page.route,
    title,
    metaDescription,
    bodyClass,
    css,
    js,
    scripts,
    headStyles,
    contentHtml,
  };
}

// ---- Main -------------------------------------------------------------------
async function main() {
  fs.mkdirSync(MIRROR_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(MANIFEST_OUT), { recursive: true });

  const { pages } = loadPages();
  const linkMap = buildLinkMap(pages);
  console.log(`Capturing ${pages.length} pages from ${BASE_URL} ...`);

  const manifestPages = [];
  for (const page of pages) {
    process.stdout.write(`- [${page.id}] ${page.title}  ->  ${page.route}\n`);
    try {
      const cap = await capturePage(page, linkMap);
      manifestPages.push(cap);
    } catch (e) {
      console.warn(`  ! page failed: ${page.url} (${e.message})`);
    }
  }

  console.log('Downloading mirrored assets...');
  const n = await processQueue();
  console.log(`Mirrored ${n} assets total.`);

  const frontPage = manifestPages.find((p) => p.id === FRONT_PAGE_ID);
  const manifest = {
    generatedAt: new Date().toISOString(),
    base: BASE_URL,
    frontRoute: '/',
    // Global resources (from the front page) are loaded once by the shell.
    globalCss: frontPage ? frontPage.css : [],
    globalJs: frontPage ? frontPage.js : [],
    pages: manifestPages,
  };
  fs.writeFileSync(MANIFEST_OUT, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Wrote manifest with ${manifestPages.length} pages -> ${MANIFEST_OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
