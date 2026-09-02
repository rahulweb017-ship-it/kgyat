import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import manifest from './manifest.json';
import { ensureCss, ensureHeadStyles, runScripts, reinitWidgets, revealLazyContent } from './resourceManager.js';
import { submitContactForm } from './contact.js';
import ContactForm from './ContactForm.jsx';

// Elementor container id of the (empty) right-hand column on the Contact page,
// where the original site showed its enquiry form.
const CONTACT_FORM_HOST = '.elementor-element-75cc4fe';

// route -> page lookup (normalise trailing slashes)
const norm = (p) => {
  if (!p) return '/';
  const q = p.replace(/\/+$/, '');
  return q === '' ? '/' : q;
};
const pageByRoute = new Map(manifest.pages.map((p) => [norm(p.route), p]));

function findPage(pathname) {
  return pageByRoute.get(norm(pathname)) || null;
}

// Intercept internal <a> clicks so navigation stays within the SPA.
function useLinkInterceptor(navigate, containerRef) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      if (a.target && a.target !== '' && a.target !== '_self') return;
      if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href.startsWith('#')) return; // in-page anchor
      // internal SPA route
      if (findPage(href) || href.startsWith('/')) {
        e.preventDefault();
        navigate(norm(href) === '/' ? '/' : href);
      }
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, [navigate, containerRef]);
}

// Wire captured contact / lead forms to the Node backend.
function bindForms(container, pageTitle) {
  const forms = container.querySelectorAll('form.wpcf7-form, form.wpforms-form, form');
  forms.forEach((form) => {
    if (form.dataset.kgyatBound) return;
    // skip search forms
    if (form.getAttribute('role') === 'search' || form.querySelector('input[type="search"]')) return;
    // only bind forms that look like contact/lead forms
    const hasEmail = form.querySelector('input[type="email"], input[name*="email" i]');
    if (!hasEmail) return;
    form.dataset.kgyatBound = '1';
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const fd = new FormData(form);
      const fields = {};
      for (const [k, v] of fd.entries()) if (typeof v === 'string') fields[k] = v;
      let statusEl = form.querySelector('.wpcf7-response-output') || form.querySelector('.kgyat-form-status');
      if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.className = 'kgyat-form-status';
        statusEl.style.marginTop = '12px';
        form.appendChild(statusEl);
      }
      statusEl.textContent = 'Sending…';
      statusEl.style.color = '#555';
      try {
        const res = await submitContactForm({ page: pageTitle, fields });
        statusEl.textContent = res.message || 'Thank you. Your message has been sent.';
        statusEl.style.color = '#1a7f37';
        form.reset();
      } catch (err) {
        statusEl.textContent = err.message || 'Sorry, something went wrong. Please try again.';
        statusEl.style.color = '#b32d2e';
      }
    });
  });
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [contactHost, setContactHost] = useState(null);

  useLinkInterceptor(navigate, containerRef);

  useEffect(() => {
    const page = findPage(location.pathname);
    const container = containerRef.current;
    if (!container) return;

    if (!page) {
      document.title = 'Not found — Kgyat';
      container.innerHTML =
        '<div style="max-width:720px;margin:120px auto;font-family:sans-serif;text-align:center">' +
        '<h1>Page not found</h1><p><a href="/">Return home</a></p></div>';
      return;
    }

    document.title = page.title || 'Kgyat';
    if (page.metaDescription) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
      m.setAttribute('content', page.metaDescription);
    }

    // Styles first (avoid FOUC), then content, then scripts.
    const kgyatGlobalCustomStyles = `
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');

      *:not(i):not(.fa):not(.fas):not(.far):not(.fab):not([class*="fa-"]) {
        font-family: 'IBM Plex Sans', sans-serif !important;
      }

      .fa, .fas, .far, i.fa, i.fas, i.far {
        font-family: "Font Awesome 5 Free" !important;
      }
      .fab, i.fab {
        font-family: "Font Awesome 5 Brands" !important;
      }

      body, p, span, div, a, li, h1, h2, h3, h4, h5, h6, input, textarea, button, select {
        line-height: 1.3 !important;
      }

      h1, .elementor-heading-title.elementor-size-default h1, h1.elementor-heading-title {
        font-size: 44px !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        margin-bottom: 15px !important;
      }

      h2.elementor-heading-title,
      .elementor-heading-title.elementor-size-default h2,
      .kgyat-heading-h2 {
        font-size: 32px !important;
        color: #272727 !important;
        font-weight: 700 !important;
      }

      /* Dark background sections heading color override to white */
      .elementor-element-c42bd73 h1, .elementor-element-c42bd73 h2, .elementor-element-c42bd73 h3, .elementor-element-c42bd73 .elementor-heading-title,
      .elementor-element-0b0c7b8 h1, .elementor-element-0b0c7b8 h2, .elementor-element-0b0c7b8 h3, .elementor-element-0b0c7b8 .elementor-heading-title,
      .elementor-element-b9d0a09 h1, .elementor-element-b9d0a09 h2, .elementor-element-b9d0a09 h3, .elementor-element-b9d0a09 .elementor-heading-title,
      .elementor-element-e38546e h1, .elementor-element-e38546e h2, .elementor-element-e38546e h3, .elementor-element-e38546e .elementor-heading-title,
      .elementor-element-e3c092b h1, .elementor-element-e3c092b h2, .elementor-element-e3c092b h3, .elementor-element-e3c092b .elementor-heading-title {
        color: #ffffff !important;
      }

      .kgyat-title-wrapper {
        display: flex !important;
        flex-direction: column !important;
        gap: 10px !important;
        margin-bottom: 15px !important;
        margin-top: 0px !important;
        padding-top: 0px !important;
        text-align: left !important;
        align-items: flex-start !important;
      }
      .kgyat-title-wrapper .kgyat-top-label {
        margin-bottom: 0px !important;
      }
      .kgyat-title-wrapper h2,
      .kgyat-title-wrapper h1 {
        margin-top: 0px !important;
        padding-top: 0px !important;
        margin-bottom: 0px !important;
      }

      .kgyat-top-label,
      .elementor-element-4bd9455 h2,
      .elementor-element-4bd9455 .elementor-heading-title {
        font-size: 16px !important;
        color: #CF3367 !important;
        text-transform: none !important;
        letter-spacing: 1.5px !important;
        font-weight: 600 !important;
        margin-bottom: 10px !important;
      }

      .kgyat-heading-h2,
      h2.elementor-heading-title,
      .kgyat-top-label + h2,
      .kgyat-top-label + h1,
      .elementor-element-4bd9455 + .elementor-element-fc11c1c {
        margin-top: 0px !important;
        padding-top: 0px !important;
      }

      /* Objective Section Height Override to reveal background machinery image */
      .elementor-element-e3c092b {
        min-height: 450px !important;
      }
    `;
    ensureCss([...(manifest.globalCss || []), ...(page.css || [])]);
    ensureHeadStyles([...(page.headStyles || []), kgyatGlobalCustomStyles]);
    document.body.className = page.bodyClass || '';
    container.innerHTML = page.contentHtml || '';
    // Reveal Elementor lazy backgrounds/gradients immediately (don't wait for JS).
    revealLazyContent(container);

    // Mount the native React contact form into the contact page's right column
    // (the container is empty in the captured markup; the portal renders into it).
    const host = container.querySelector(CONTACT_FORM_HOST);
    setContactHost(host ? host : null);

    let cancelled = false;
    runScripts(page.scripts || []).then(() => {
      if (cancelled) return;
      reinitWidgets();
      bindForms(container, page.title);
      // Elementor sometimes needs a second nudge once images/lazy elements settle.
      setTimeout(() => { if (!cancelled) { reinitWidgets(); revealLazyContent(container); } }, 300);
    });

    window.scrollTo(0, 0);
    return () => { cancelled = true; setContactHost(null); };
  }, [location.pathname]);

  // The #page wrapper mirrors the original WordPress markup so theme CSS targeting
  // #page / .site still applies. React only manages this node's innerHTML.
  return (
    <>
      <div id="page" className="hfeed site" ref={containerRef} />
      {contactHost && createPortal(<ContactForm page="Contact us" />, contactHost)}
    </>
  );
}
