import React, { useState } from 'react';
import { submitContactForm } from './contact.js';

// Native React contact form for the Contact page, styled to match the original
// WPForms "Contact Us" form (ID 5556) as it appeared in the site's design:
// grey card (#E9E9E9, 20px radius), Roboto 500 14px labels (#2E3B4B),
// 10px-radius fields, purple button (#95347C) with pink hover (#CF3367).
const css = `
.kgyat-cf-card{background:#E9E9E9;border-radius:20px;padding:0 20px 20px 20px;margin-top:-25px;font-family:'Roboto',Sans-serif;}
.kgyat-cf-card form{margin:0;}
.kgyat-cf-row{display:flex;gap:16px;flex-wrap:wrap;}
.kgyat-cf-field{flex:1 1 200px;margin-bottom:16px;}
.kgyat-cf-field label{display:block;font-family:'Roboto',Sans-serif;font-weight:500;font-size:14px;color:#2E3B4B;margin:0 0 5px;}
.kgyat-cf-field input,.kgyat-cf-field textarea{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,0.15);border-radius:10px;padding:10px 20px;font-family:'Roboto',Sans-serif;font-size:15px;color:rgba(0,0,0,0.7);background:#fff;}
.kgyat-cf-field input:focus,.kgyat-cf-field textarea:focus{outline:none;border-color:#95347C;}
.kgyat-cf-field textarea{min-height:110px;resize:vertical;}
.kgyat-cf-submit{display:inline-block;background:#95347C;color:#fff;border:none;border-radius:3px;padding:12px 28px;font-family:'Roboto',Sans-serif;font-size:15px;font-weight:500;cursor:pointer;transition:background .3s;}
.kgyat-cf-submit:hover{background:#CF3367;}
.kgyat-cf-submit:disabled{opacity:.6;cursor:default;}
.kgyat-cf-status{margin-top:12px;font-size:14px;font-family:'Roboto',Sans-serif;}
@media(max-width:767px){.kgyat-cf-card{margin:-30px 0 -50px;}}
`;

export default function ContactForm({ page }) {
  const [status, setStatus] = useState(null); // {type:'sending'|'ok'|'err', text}
  const [sending, setSending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const fields = {
      'first-name': form.elements['first-name'].value.trim(),
      'last-name': form.elements['last-name'].value.trim(),
      'your-email': form.elements['your-email'].value.trim(),
      'phone': form.elements['phone'].value.trim(),
      'message': form.elements['message'].value.trim(),
    };
    setSending(true);
    setStatus({ type: 'sending', text: 'Sending…' });
    try {
      const res = await submitContactForm({ page: page || 'Contact us', fields });
      setStatus({ type: 'ok', text: res.message || 'Thank you. Your message has been received.' });
      form.reset();
    } catch (err) {
      setStatus({ type: 'err', text: err.message || 'Sorry, something went wrong. Please try again.' });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="kgyat-cf-card">
      <style>{css}</style>
      <form onSubmit={onSubmit} noValidate={false}>
        <div className="kgyat-cf-row">
          <div className="kgyat-cf-field">
            <label htmlFor="kcf-first">First Name</label>
            <input id="kcf-first" name="first-name" type="text" required />
          </div>
          <div className="kgyat-cf-field">
            <label htmlFor="kcf-last">Last Name</label>
            <input id="kcf-last" name="last-name" type="text" required />
          </div>
        </div>
        <div className="kgyat-cf-field">
          <label htmlFor="kcf-email">Email</label>
          <input id="kcf-email" name="your-email" type="email" required />
        </div>
        <div className="kgyat-cf-field">
          <label htmlFor="kcf-phone">Phone</label>
          <input id="kcf-phone" name="phone" type="tel" />
        </div>
        <div className="kgyat-cf-field">
          <label htmlFor="kcf-message">Message</label>
          <textarea id="kcf-message" name="message" required />
        </div>
        <button className="kgyat-cf-submit" type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Submit'}
        </button>
        {status && (
          <div className="kgyat-cf-status" style={{ color: status.type === 'err' ? '#b32d2e' : status.type === 'ok' ? '#1a7f37' : '#555' }}>
            {status.text}
          </div>
        )}
      </form>
    </div>
  );
}
