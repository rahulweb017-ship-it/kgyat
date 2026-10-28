import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, 'dist');
const MANIFEST_PATH = path.resolve(__dirname, 'src', 'manifest.json');
const CUSTOM_STYLES_PATH = path.resolve(__dirname, 'src', 'customStyles.js');

function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString();
}

async function prerender() {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Template index.html not found in dist. Run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  const { kgyatGlobalCustomStyles } = await import('./src/customStyles.js');

  console.log(`Starting prerender for ${manifest.pages.length} pages...`);

  let count = 0;
  for (const page of manifest.pages) {
    const route = page.route || '/';
    const cleanRoute = route.replace(/^\/+|\/+$/g, '');

    // Prepare Head Injections
    const title = page.title || 'Kgyat';
    const metaDesc = page.metaDescription
      ? `<meta name="description" content="${page.metaDescription.replace(/"/g, '&quot;')}" />`
      : '';

    const globalCssLinks = (manifest.globalCss || [])
      .map((href) => `<link rel="stylesheet" href="${href}" />`)
      .join('\n    ');

    const pageCssLinks = (page.css || [])
      .map((href) => `<link rel="stylesheet" href="${href}" />`)
      .join('\n    ');

    const pageHeadStyles = (page.headStyles || [])
      .map((css) => `<style data-kgyat-inline="${hashString(css)}">\n${css}\n</style>`)
      .join('\n    ');

    const customStylesBlock = `<style id="kgyat-custom-styles">\n${kgyatGlobalCustomStyles}\n</style>`;

    const headInjections = [
      metaDesc,
      globalCssLinks,
      pageCssLinks,
      pageHeadStyles,
      customStylesBlock,
    ]
      .filter(Boolean)
      .join('\n    ');

    // Build Page HTML
    let html = templateHtml;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

    // Inject Head Styles
    html = html.replace('</head>', `  ${headInjections}\n  </head>`);

    // Set Body Class
    if (page.bodyClass) {
      html = html.replace('<body', `<body class="${page.bodyClass}"`);
    }

    // Inject Pre-rendered Content inside #root
    const content = page.contentHtml || '';
    const prerenderedBody = `<div id="page" class="hfeed site">${content}</div>`;
    html = html.replace('<div id="root"></div>', `<div id="root">${prerenderedBody}</div>`);

    // Target Output Path
    let outFile;
    if (!cleanRoute) {
      // Home page
      outFile = path.join(DIST, 'index.html');
    } else {
      const outDir = path.join(DIST, cleanRoute);
      fs.mkdirSync(outDir, { recursive: true });
      outFile = path.join(outDir, 'index.html');
    }

    fs.writeFileSync(outFile, html, 'utf-8');
    count++;
  }

  console.log(`Successfully prerendered ${count} pages into client/dist!`);
}

prerender().catch((err) => {
  console.error('Prerender error:', err);
  process.exit(1);
});
