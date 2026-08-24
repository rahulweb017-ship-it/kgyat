import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const STORE = path.join(DATA_DIR, 'submissions.json');

function saveSubmission(entry) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  let list = [];
  if (fs.existsSync(STORE)) {
    try { list = JSON.parse(fs.readFileSync(STORE, 'utf8')); } catch (e) { list = []; }
  }
  list.push(entry);
  fs.writeFileSync(STORE, JSON.stringify(list, null, 2), 'utf8');
}

async function sendEmail(entry) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !CONTACT_TO) return { emailed: false, reason: 'SMTP not configured' };

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  const lines = Object.entries(entry.fields).map(([k, v]) => `${k}: ${v}`).join('\n');
  await transporter.sendMail({
    from: CONTACT_FROM || SMTP_USER,
    to: CONTACT_TO,
    subject: `New enquiry from Kgyat website (${entry.page || 'Contact'})`,
    text: `Received ${entry.at}\nPage: ${entry.page}\n\n${lines}`,
  });
  return { emailed: true };
}

export async function handleContact(req, res) {
  try {
    const { fields = {}, page = '' } = req.body || {};
    const cleanFields = {};
    for (const [k, v] of Object.entries(fields)) {
      if (typeof v === 'string' && v.length <= 5000) cleanFields[k] = v.trim();
    }

    const emailVal = Object.entries(cleanFields).find(([k]) => /email/i.test(k))?.[1] || '';
    if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' });
    }
    if (Object.keys(cleanFields).length === 0) {
      return res.status(400).json({ ok: false, message: 'Please fill in the form.' });
    }

    const entry = {
      at: new Date().toISOString(),
      page,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
      fields: cleanFields,
    };
    saveSubmission(entry);

    let emailResult = { emailed: false };
    try { emailResult = await sendEmail(entry); } catch (e) { emailResult = { emailed: false, reason: e.message }; }

    return res.json({
      ok: true,
      emailed: emailResult.emailed,
      message: 'Thank you. Your message has been received.',
    });
  } catch (e) {
    return res.status(500).json({ ok: false, message: 'Server error. Please try again later.' });
  }
}
