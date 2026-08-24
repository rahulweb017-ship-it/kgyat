// Injects the WordPress/Elementor CSS, inline <style> blocks and scripts that a
// captured page depends on, deduping across SPA navigations so shared assets load
// once. Elementor CSS is scoped by .elementor-{postId} / body classes, so keeping
// previously loaded page CSS around does not bleed between pages.

const loadedCss = new Set();
const loadedStyleHashes = new Set();
const loadedScriptUrls = new Set();

function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return h >>> 0;
}

export function ensureCss(hrefs) {
  for (const href of hrefs) {
    if (!href || loadedCss.has(href)) continue;
    loadedCss.add(href);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

export function ensureHeadStyles(styles) {
  for (const css of styles) {
    if (!css) continue;
    const h = hashString(css);
    if (loadedStyleHashes.has(h)) continue;
    loadedStyleHashes.add(h);
    const el = document.createElement('style');
    el.setAttribute('data-kgyat-inline', String(h));
    el.textContent = css;
    document.head.appendChild(el);
  }
}

function appendExternal(url, id) {
  return new Promise((resolve) => {
    const el = document.createElement('script');
    el.src = url;
    el.async = false; // preserve execution order
    if (id) el.id = id;
    el.onload = () => resolve();
    el.onerror = () => resolve();
    document.body.appendChild(el);
  });
}

function runInline(code, id) {
  try {
    const el = document.createElement('script');
    if (id) el.id = id;
    el.text = code; // executes synchronously on append
    document.body.appendChild(el);
  } catch (e) {
    // Non-fatal: a single inline config failing shouldn't break the page.
    console.warn('[kgyat] inline script error', id || '', e);
  }
}

// Runs a page's script list in order. External libraries load once; inline
// config/widget scripts are replayed each visit so widgets re-initialise.
export async function runScripts(scripts) {
  for (const s of scripts) {
    if (s.t === 's') {
      if (loadedScriptUrls.has(s.u)) continue;
      loadedScriptUrls.add(s.u);
      await appendExternal(s.u, s.id);
    } else if (s.t === 'i') {
      runInline(s.c, s.id);
    }
  }
}

// Elementor ships a lazy-load rule that forces `background-image:none !important`
// on the 4th+ top-level containers (and all descendants) until its scroll
// observer adds `.e-lazyloaded`. That observer doesn't fire reliably during SPA
// navigation, so we mark containers loaded ourselves to reveal backgrounds and
// gradient buttons. Also clears entrance-animation invisibility.
export function revealLazyContent(root = document) {
  try {
    root.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)').forEach((el) => el.classList.add('e-lazyloaded'));
  } catch (e) {}
  try {
    root.querySelectorAll('.elementor-invisible').forEach((el) => el.classList.remove('elementor-invisible'));
  } catch (e) {}
}

// Best-effort re-initialisation of interactive widgets after content is injected.
export function reinitWidgets() {
  revealLazyContent(document);
  const w = window;
  try { w.elementorFrontend && w.elementorFrontend.init && w.elementorFrontend.init(); } catch (e) {}
  try {
    if (w.jQuery) {
      const $ = w.jQuery;
      // Elementor emits this to (re)bind element handlers.
      try { w.elementorFrontend && $(w).trigger('elementor/frontend/init'); } catch (e) {}
      // Max Mega Menu
      try { if ($.fn.maxmegamenu) $('.mega-menu').maxmegamenu(); } catch (e) {}
      // Essential Addons / others listen on document ready.
      try { $(document).trigger('ready'); } catch (e) {}
    }
  } catch (e) {}
  // Smart Slider 3 self-initialises via inline scripts we replay; nudge if present.
  try { w.N2R && w.N2R(['documentReady', 'nextend-frontend'], function () {}); } catch (e) {}
}
