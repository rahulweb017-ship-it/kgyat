import React, { useState } from 'react';
import { submitContactForm } from './contact.js';

const css = `
.kgyat-cf-wrapper {
  width: 100%;
  box-sizing: border-box;
  font-family: 'IBM Plex Sans', sans-serif;
}
.kgyat-cf-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 36px 32px;
  box-shadow: 0 15px 35px -5px rgba(0, 52, 107, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}
.kgyat-cf-header {
  margin-bottom: 24px;
}
.kgyat-cf-eyebrow {
  color: #CF3367;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
  display: block;
}
.kgyat-cf-title {
  color: #1e293b;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.3;
}
.kgyat-cf-desc {
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}
.kgyat-cf-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0;
}
.kgyat-cf-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (max-width: 640px) {
  .kgyat-cf-row {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .kgyat-cf-card {
    padding: 24px 20px;
  }
}
.kgyat-cf-field {
  display: flex;
  flex-direction: column;
}
.kgyat-cf-label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.kgyat-cf-required {
  color: #CF3367;
}
.kgyat-cf-input,
.kgyat-cf-textarea {
  width: 100%;
  box-sizing: border-box;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 16px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 15px;
  color: #1e293b;
  transition: all 0.2s ease;
}
.kgyat-cf-input::placeholder,
.kgyat-cf-textarea::placeholder {
  color: #94a3b8;
}
.kgyat-cf-input:focus,
.kgyat-cf-textarea:focus {
  outline: none;
  background: #ffffff;
  border-color: #CF3367;
  box-shadow: 0 0 0 3px rgba(207, 51, 103, 0.15);
}
.kgyat-cf-textarea {
  min-height: 110px;
  resize: vertical;
}
.kgyat-cf-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #CF3367 0%, #95347C 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(207, 51, 103, 0.25);
  margin-top: 6px;
  width: 100%;
}
.kgyat-cf-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(207, 51, 103, 0.35);
  filter: brightness(1.05);
}
.kgyat-cf-submit:active:not(:disabled) {
  transform: translateY(0);
}
.kgyat-cf-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.kgyat-cf-status {
  margin-top: 14px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}
.kgyat-cf-status.ok {
  background: rgba(22, 163, 74, 0.1);
  border: 1px solid #86efac;
  color: #166534;
}
.kgyat-cf-status.err {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid #fca5a5;
  color: #991b1b;
}
.kgyat-cf-status.sending {
  background: rgba(0, 52, 107, 0.08);
  border: 1px solid #93c5fd;
  color: #00346B;
}
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
    setStatus({ type: 'sending', text: 'Sending your message...' });
    try {
      const res = await submitContactForm({ page: page || 'Contact us', fields });
      setStatus({ type: 'ok', text: res.message || 'Thank you! Your message has been received. Our team will contact you shortly.' });
      form.reset();
    } catch (err) {
      setStatus({ type: 'err', text: err.message || 'Sorry, something went wrong. Please try again or email us directly.' });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="kgyat-cf-wrapper">
      <style>{css}</style>
      <div className="kgyat-cf-card">
        <div className="kgyat-cf-header">
          <span className="kgyat-cf-eyebrow">Quick Inquiry</span>
          <h3 className="kgyat-cf-title">Send Us a Message</h3>
          <p className="kgyat-cf-desc">
            Fill out the form below and our engineering and business development team will respond promptly.
          </p>
        </div>

        <form className="kgyat-cf-form" onSubmit={onSubmit} noValidate={false}>
          <div className="kgyat-cf-row">
            <div className="kgyat-cf-field">
              <label className="kgyat-cf-label" htmlFor="kcf-first">
                First Name <span className="kgyat-cf-required">*</span>
              </label>
              <input id="kcf-first" name="first-name" type="text" placeholder="John" required className="kgyat-cf-input" />
            </div>
            <div className="kgyat-cf-field">
              <label className="kgyat-cf-label" htmlFor="kcf-last">
                Last Name <span className="kgyat-cf-required">*</span>
              </label>
              <input id="kcf-last" name="last-name" type="text" placeholder="Doe" required className="kgyat-cf-input" />
            </div>
          </div>

          <div className="kgyat-cf-row">
            <div className="kgyat-cf-field">
              <label className="kgyat-cf-label" htmlFor="kcf-email">
                Email Address <span className="kgyat-cf-required">*</span>
              </label>
              <input id="kcf-email" name="your-email" type="email" placeholder="john@example.com" required className="kgyat-cf-input" />
            </div>
            <div className="kgyat-cf-field">
              <label className="kgyat-cf-label" htmlFor="kcf-phone">
                Phone Number
              </label>
              <input id="kcf-phone" name="phone" type="tel" placeholder="+91 98765 43210" className="kgyat-cf-input" />
            </div>
          </div>

          <div className="kgyat-cf-field">
            <label className="kgyat-cf-label" htmlFor="kcf-message">
              Your Message <span className="kgyat-cf-required">*</span>
            </label>
            <textarea
              id="kcf-message"
              name="message"
              rows="4"
              placeholder="Tell us about your project, inquiries, or collaboration ideas..."
              required
              className="kgyat-cf-textarea"
            />
          </div>

          <button className="kgyat-cf-submit" type="submit" disabled={sending}>
            {sending ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Sending...
              </>
            ) : (
              <>
                <span>Send Message</span>
                <i className="fas fa-paper-plane"></i>
              </>
            )}
          </button>

          {status && (
            <div className={`kgyat-cf-status ${status.type}`}>
              {status.type === 'ok' && <i className="fas fa-check-circle" style={{ fontSize: '16px' }}></i>}
              {status.type === 'err' && <i className="fas fa-exclamation-circle" style={{ fontSize: '16px' }}></i>}
              {status.type === 'sending' && <i className="fas fa-info-circle" style={{ fontSize: '16px' }}></i>}
              <span>{status.text}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
