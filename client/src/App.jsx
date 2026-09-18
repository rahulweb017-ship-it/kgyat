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

      /* Paragraph Spacing Rule: 15px spacing below paragraph where new paragraph starts */
      .elementor-widget-text-editor p,
      .elementor-text-editor p,
      .entry-content p,
      #page p {
        margin-bottom: 15px !important;
      }
      .elementor-widget-text-editor p:last-child,
      .elementor-text-editor p:last-child {
        margin-bottom: 0px !important;
      }
      .elementor-widget-text-editor p br,
      .elementor-text-editor p br {
        content: "" !important;
        display: block !important;
        margin-bottom: 15px !important;
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

      /* High-Specificity Headings on DARK Background Sections (White #ffffff) */
      /* IP & Recognition Hero Section Center Alignment */
      body #page .elementor-element.elementor-element-6a150cd .elementor-heading-title,
      body #page .elementor-element.elementor-element-6a150cd .elementor-widget-container,
      body #page .elementor-element.elementor-element-6a150cd .elementor-widget-text-editor,
      body #page .elementor-element.elementor-element-6a150cd p,
      body #page .elementor-element.elementor-element-959cc44 .elementor-heading-title,
      body #page .elementor-element.elementor-element-959cc44 h1,
      body #page .elementor-element.elementor-element-959cc44 h2,
      body #page .elementor-element.elementor-element-959cc44 h3 {
        text-align: center !important;
      }
      body #page .elementor-element.elementor-element-35171c7 {
        align-items: center !important;
        margin: 0 auto !important;
      }

      body #page .elementor-element.elementor-element-959cc44 .elementor-heading-title,
      body #page .elementor-element.elementor-element-959cc44 h1,
      body #page .elementor-element.elementor-element-959cc44 h2,
      body #page .elementor-element.elementor-element-959cc44 h3,
      body #page .elementor-element.elementor-element-6a150cd .elementor-heading-title,
      body #page .elementor-element.elementor-element-6a150cd h1,
      body #page .elementor-element.elementor-element-6a150cd h2,
      body #page .elementor-element.elementor-element-6a150cd h3,
      /* Main Heading (Rethinking Combustion...): Kept like before (32px, bold 700, white #ffffff) */
      body #page .elementor-element.elementor-element-aa6e0bc .elementor-heading-title,
      body #page .elementor-element.elementor-element-aa6e0bc h1,
      body #page .elementor-element.elementor-element-aa6e0bc h2,
      body #page .elementor-element.elementor-element-aa6e0bc h3 {
        color: #ffffff !important;
        font-size: 32px !important;
        font-weight: 700 !important;
        margin-bottom: 15px !important;
      }
      /* Subheading Specific Override: Normal font-weight (400), 20px font-size, white color */
      body #page .elementor-element.elementor-element-d97856e .elementor-heading-title,
      body #page .elementor-element.elementor-element-d97856e h1,
      body #page .elementor-element.elementor-element-d97856e h2,
      body #page .elementor-element.elementor-element-d97856e h3 {
        color: #ffffff !important;
        font-size: 20px !important;
        font-weight: 400 !important;
        line-height: 1.4 !important;
        margin-bottom: 20px !important;
      }
      body #page .elementor-element.elementor-element-837f37e .elementor-heading-title,
      body #page .elementor-element.elementor-element-837f37e h1,
      body #page .elementor-element.elementor-element-837f37e h2,
      body #page .elementor-element.elementor-element-837f37e h3,
      body #page .elementor-element.elementor-element-54dda64 .elementor-heading-title,
      body #page .elementor-element.elementor-element-54dda64 h1,
      body #page .elementor-element.elementor-element-54dda64 h2,
      body #page .elementor-element.elementor-element-54dda64 h3,
      body #page .elementor-element.elementor-element-2bd9c57 .elementor-heading-title,
      body #page .elementor-element.elementor-element-2bd9c57 h1,
      body #page .elementor-element.elementor-element-2bd9c57 h2,
      body #page .elementor-element.elementor-element-2bd9c57 h3,
      body #page .elementor-element.elementor-element-8f7ed1e .elementor-heading-title,
      body #page .elementor-element.elementor-element-8f7ed1e h1,
      body #page .elementor-element.elementor-element-8f7ed1e h2,
      body #page .elementor-element.elementor-element-8f7ed1e h3,
      body #page .elementor-element.elementor-element-13903d5 .elementor-heading-title,
      body #page .elementor-element.elementor-element-13903d5 h1,
      body #page .elementor-element.elementor-element-13903d5 h2,
      body #page .elementor-element.elementor-element-13903d5 h3,
      body #page .elementor-element.elementor-element-1ab1f77 .elementor-heading-title,
      body #page .elementor-element.elementor-element-1ab1f77 h1,
      body #page .elementor-element.elementor-element-1ab1f77 h2,
      body #page .elementor-element.elementor-element-1ab1f77 h3,
      body #page .elementor-element.elementor-element-f901494 .elementor-heading-title,
      body #page .elementor-element.elementor-element-f901494 h1,
      body #page .elementor-element.elementor-element-f901494 h2,
      body #page .elementor-element.elementor-element-f901494 h3,
      body #page .elementor-element.elementor-element-76918e2 .elementor-heading-title,
      body #page .elementor-element.elementor-element-76918e2 h1,
      body #page .elementor-element.elementor-element-76918e2 h2,
      body #page .elementor-element.elementor-element-76918e2 h3,
      body #page .elementor-element.elementor-element-ecd1c65 .elementor-heading-title,
      body #page .elementor-element.elementor-element-ecd1c65 h1,
      body #page .elementor-element.elementor-element-ecd1c65 h2,
      body #page .elementor-element.elementor-element-ecd1c65 h3,
      body #page .elementor-element.elementor-element-e2b3f5a .elementor-heading-title,
      body #page .elementor-element.elementor-element-e2b3f5a h1,
      body #page .elementor-element.elementor-element-e2b3f5a h2,
      body #page .elementor-element.elementor-element-e2b3f5a h3,
      body #page .elementor-element.elementor-element-c42bd73 .elementor-heading-title,
      body #page .elementor-element.elementor-element-c42bd73 h1,
      body #page .elementor-element.elementor-element-c42bd73 h2,
      body #page .elementor-element.elementor-element-c42bd73 h3,
      body #page .elementor-element.elementor-element-0b0c7b8 .elementor-heading-title,
      body #page .elementor-element.elementor-element-0b0c7b8 h1,
      body #page .elementor-element.elementor-element-0b0c7b8 h2,
      body #page .elementor-element.elementor-element-0b0c7b8 h3,
      body #page .elementor-element.elementor-element-b9d0a09 .elementor-heading-title,
      body #page .elementor-element.elementor-element-b9d0a09 h1,
      body #page .elementor-element.elementor-element-b9d0a09 h2,
      body #page .elementor-element.elementor-element-b9d0a09 h3,
      body #page .elementor-element.elementor-element-e38546e .elementor-heading-title,
      body #page .elementor-element.elementor-element-e38546e h1,
      body #page .elementor-element.elementor-element-e38546e h2,
      body #page .elementor-element.elementor-element-e38546e h3,
      body #page .elementor-element.elementor-element-e3c092b .elementor-heading-title,
      body #page .elementor-element.elementor-element-e3c092b h1,
      body #page .elementor-element.elementor-element-e3c092b h2,
      body #page .elementor-element.elementor-element-e3c092b h3 {
        color: #ffffff !important;
      }

      /* Headings on LIGHT Background Sections (Dark #272727) */
      body #page .elementor-element.elementor-element-2bf34ee .elementor-heading-title,
      body #page .elementor-element.elementor-element-2bf34ee h1,
      body #page .elementor-element.elementor-element-2bf34ee h2,
      body #page .elementor-element.elementor-element-2bf34ee h3,
      body #page .elementor-element.elementor-element-e190628 .elementor-heading-title,
      body #page .elementor-element.elementor-element-e190628 h1,
      body #page .elementor-element.elementor-element-e190628 h2,
      body #page .elementor-element.elementor-element-e190628 h3,
      body #page .elementor-element.elementor-element-de88c67 .elementor-heading-title,
      body #page .elementor-element.elementor-element-de88c67 h1,
      body #page .elementor-element.elementor-element-de88c67 h2,
      body #page .elementor-element.elementor-element-de88c67 h3,
      body #page .elementor-element.elementor-element-ba98338 .elementor-heading-title,
      body #page .elementor-element.elementor-element-ba98338 h1,
      body #page .elementor-element.elementor-element-ba98338 h2,
      body #page .elementor-element.elementor-element-ba98338 h3,
      body #page .elementor-element.elementor-element-8d093fa .elementor-heading-title,
      body #page .elementor-element.elementor-element-8d093fa h1,
      body #page .elementor-element.elementor-element-8d093fa h2,
      body #page .elementor-element.elementor-element-8d093fa h3,
      body #page .elementor-element.elementor-element-e15e368 .elementor-heading-title,
      body #page .elementor-element.elementor-element-e15e368 h1,
      body #page .elementor-element.elementor-element-e15e368 h2,
      body #page .elementor-element.elementor-element-e15e368 h3,
      body #page .elementor-element.elementor-element-182caec .elementor-heading-title,
      body #page .elementor-element.elementor-element-182caec h1,
      body #page .elementor-element.elementor-element-182caec h2,
      body #page .elementor-element.elementor-element-182caec h3,
      body #page .elementor-element.elementor-element-15f1f5b .elementor-heading-title,
      body #page .elementor-element.elementor-element-15f1f5b h1,
      body #page .elementor-element.elementor-element-15f1f5b h2,
      body #page .elementor-element.elementor-element-15f1f5b h3,
      body #page .elementor-element.elementor-element-42aaa71 .elementor-heading-title,
      body #page .elementor-element.elementor-element-42aaa71 h1,
      body #page .elementor-element.elementor-element-42aaa71 h2,
      body #page .elementor-element.elementor-element-42aaa71 h3,
      body #page .elementor-element.elementor-element-12e1f18 .elementor-heading-title,
      body #page .elementor-element.elementor-element-12e1f18 h1,
      body #page .elementor-element.elementor-element-12e1f18 h2,
      body #page .elementor-element.elementor-element-12e1f18 h3 {
        color: #272727 !important;
      }

      /* Spacing below Detailed Comparetative Analysis Heading */
      .elementor-element-8d093fa,
      .elementor-element-8d093fa > .elementor-widget-container,
      .elementor-element-8d093fa h2,
      .elementor-element-8d093fa .elementor-heading-title {
        margin-bottom: 16px !important;
      }

      /* Interactive Accordion & Toggle Widget Styling */
      .elementor-toggle-item,
      .elementor-accordion-item {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
        margin-bottom: 10px !important;
        padding-bottom: 6px !important;
      }
      .elementor-tab-title {
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        padding: 8px 0 !important;
        transition: color 0.2s ease !important;
        user-select: none !important;
      }
      .elementor-tab-title .elementor-toggle-title,
      .elementor-tab-title a.elementor-toggle-title {
        font-size: 16px !important;
        font-weight: 600 !important;
        color: #CF3367 !important;
        text-decoration: none !important;
      }
      .elementor-tab-title.elementor-active .elementor-toggle-title,
      .elementor-tab-title:hover .elementor-toggle-title {
        color: #A82450 !important;
      }
      .elementor-tab-title .elementor-toggle-icon {
        color: #CF3367 !important;
        font-size: 14px !important;
      }
      .elementor-tab-title.elementor-active .elementor-toggle-icon-closed {
        display: none !important;
      }
      .elementor-tab-title.elementor-active .elementor-toggle-icon-opened {
        display: inline-block !important;
      }
      .elementor-tab-title:not(.elementor-active) .elementor-toggle-icon-closed {
        display: inline-block !important;
      }
      .elementor-tab-title:not(.elementor-active) .elementor-toggle-icon-opened {
        display: none !important;
      }
      .elementor-tab-content {
        padding: 8px 0 12px 24px !important;
        font-size: 15px !important;
        line-height: 1.6 !important;
        color: #444444 !important;
      }
      .elementor-tab-content p {
        margin: 0 !important;
        color: #444444 !important;
        font-size: 15px !important;
      }

      /* Combustion & Emissions Page Image Fixes */
      .elementor-element-311c8d8 img,
      .elementor-element-fd968c4 img,
      .elementor-element-cabfe44 img,
      .elementor-element-873ce83 img {
        border-radius: 14px !important;
        max-width: 100% !important;
        height: auto !important;
        display: block !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
      }

      /* Header Standalone Contact Button & Ecosystem Dropdown Styles */
      .kgyat-header-contact-btn {
        background-color: #CF3367 !important;
        color: #ffffff !important;
        padding: 8px 20px !important;
        border-radius: 4px !important;
        font-weight: 600 !important;
        margin-left: 12px !important;
        transition: all 0.25s ease-in-out !important;
        text-decoration: none !important;
        display: inline-block !important;
        line-height: 1.2 !important;
      }
      .kgyat-header-contact-btn:hover {
        background-color: #A82450 !important;
        color: #ffffff !important;
        box-shadow: 0 4px 14px rgba(207, 51, 103, 0.35) !important;
        transform: translateY(-1px) !important;
      }
      ul.hfe-nav-menu > li.kgyat-header-contact-item {
        margin-left: 10px !important;
        display: flex !important;
        align-items: center !important;
      }
      ul.hfe-nav-menu > li.kgyat-header-contact-item > a:before,
      ul.hfe-nav-menu > li.kgyat-header-contact-item > a:after {
        display: none !important;
      }
      .hfe-nav-menu .sub-menu {
        border-radius: 6px !important;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        padding: 8px 0 !important;
        background-color: #ffffff !important;
      }
      .hfe-nav-menu .sub-menu a.hfe-sub-menu-item {
        padding: 8px 16px !important;
        color: #272727 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        font-size: 14px !important;
        font-weight: 500 !important;
      }
      .hfe-nav-menu .sub-menu a.hfe-sub-menu-item:hover {
        background-color: #f7f7f9 !important;
        color: #CF3367 !important;
      }

      /* Homepage - Align WHAT WE DO / From Core Physics to Future Machines to Left */
      .elementor-element-eb18b0e,
      .elementor-element-eb18b0e .elementor-widget-container,
      .elementor-element-eb18b0e .kgyat-title-wrapper,
      .elementor-element-eb18b0e .kgyat-top-label,
      .elementor-element-eb18b0e .kgyat-heading-h2,
      .elementor-element-eb18b0e .elementor-heading-title {
        text-align: left !important;
      }

      /* Header Navbar Item - Engineering Arm of GYATK Color #CF3367 */
      .elementor-element-4f3358f,
      .elementor-element-4f3358f p,
      .elementor-element-4f3358f .elementor-heading-title,
      .elementor-element-4f3358f .elementor-widget-container {
        color: #CF3367 !important;
        text-transform: none !important;
      }

      /* Homepage Hero Section Label - ENABLING TRANSFORMATIVE KINETICS Color #CF3367 & Uppercase */
      .elementor-element-8ae3dc3 .kgyat-top-label {
        color: #CF3367 !important;
        text-transform: uppercase !important;
      }

      /* Homepage OUR PURPOSE & SERVICES Eyebrow Labels Color #CF3367 */
      .elementor-element-d6e07c4 .kgyat-top-label,
      .elementor-element-cc7d513 .kgyat-top-label {
        color: #CF3367 !important;
      }

      /* About Page - About KGYAT Eyebrow Label Color #CF3367 */
      .elementor-element-4bd9455 .kgyat-top-label,
      .page-id-2434 .elementor-element-4bd9455 .kgyat-top-label {
        color: #CF3367 !important;
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
