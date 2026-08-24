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
    ensureCss([...(manifest.globalCss || []), ...(page.css || [])]);
    ensureHeadStyles(page.headStyles || []);
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
