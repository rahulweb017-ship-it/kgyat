# Kgyat — React + Node Website

A pixel-exact React + Node reproduction of the Kgyat website.
All 53 pages are reproduced with their exact content, fonts, colours, styles,
and images, served through a React single-page app with a Node/Express backend
that also handles the contact form.

**This is a standalone React + Node app. It does not require WordPress, PHP,
or MySQL at runtime.** The capture pipeline (in `capture/`) was used once to
mirror the original site's rendered output into static assets + a JSON manifest;
the deployed app only needs Node.js.

---

## Project structure

```
kgyat-react/
  package.json           # root scripts: build, start
  .env.example           # copy to .env for email settings (optional)

  server/                # Node/Express backend
    index.js             # serves the built app + static assets + /api/contact
    contact.js           # stores submissions + emails via nodemailer (optional)

  client/                # React frontend (Vite + React 18 + React Router)
    dist/                # built output (created by `npm run build`) ← deploy this
    public/wp-mirror/    # static assets (css/js/fonts/images) ← deploy this
    src/
      manifest.json      # per-page content (title, meta, CSS, HTML)
      App.jsx            # SPA router + page renderer + contact form portal
      ContactForm.jsx    # native React contact form
      resourceManager.js # CSS/JS injection + widget re-init
      contact.js         # posts form submissions to the backend
    package.json
    vite.config.js

  capture/               # one-time capture pipeline (not needed in production)
    crawl.mjs
    pages.tsv
```

---

## Deploy to a server

### 1. Upload the folder

Upload the entire `kgyat-react/` folder to your server. You can exclude:
- `capture/` (only needed to re-capture content)
- `client/node_modules/` (reinstalled on server)
- `client/src/` (already built into `client/dist/`)

**Required for production:**
- `server/`
- `client/dist/`
- `client/public/wp-mirror/`
- `package.json`
- `package-lock.json` (if present)

### 2. Install dependencies on the server

```bash
cd kgyat-react
npm install --omit=dev
```

### 3. (Optional) Configure email for the contact form

Copy `.env.example` to `.env` and fill in SMTP settings. Submissions are always
stored in `server/data/submissions.json` even without email configured.

```
PORT=8787
HOST=0.0.0.0
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
CONTACT_TO=you@example.com
CONTACT_FROM=site@example.com
```

### 4. Start the server

```bash
npm start
```

The site is now live on `http://your-server:8787/`.

### 5. (Recommended) Run with a process manager

**PM2** (keeps the app running after logout, restarts on crash):
```bash
npm install -g pm2
pm2 start server/index.js --name kgyat
pm2 save
pm2 startup     # auto-start on boot
```

### 6. (Recommended) Reverse proxy with Nginx

To serve on port 80/443 with a domain name, add an Nginx config:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Build from source (if you need to rebuild)

If you made changes to the React source or want to rebuild on the server:

```bash
npm install              # root deps
npm --prefix client install   # client deps
npm run build            # builds client/ into client/dist/
npm start                # serve on :8787
```

---

## Development mode (hot reload)

```bash
npm run server           # backend/API on :8787 (terminal 1)
npm run client:dev       # Vite dev server on :5173 (terminal 2)
```

Open `http://localhost:5173/` (the dev server proxies `/api` to the backend).

---

## Notes

- Fonts (Roboto, Roboto Slab, Open Sans, Lato, Poppins, Oxanium and others),
  colours, images and layout come from the captured CSS/assets, so the site
  matches the original exactly.
- Interactive widgets (menus, sliders) work because the original scripts are
  captured and re-initialised on navigation.
- The Google Maps embed on the contact page loads live from Google.
- The contact form on the Contact page is a native React component that
  submits to the Node backend (`POST /api/contact`). Submissions are stored
  in `server/data/submissions.json` and optionally emailed via SMTP.
