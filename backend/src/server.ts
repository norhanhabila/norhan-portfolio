import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isLocalhost = /^https?:\/\/localhost(:\d+)?$/.test(origin) || /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
    const isProdFrontend = origin === process.env.FRONTEND_URL;
    const isRenderOrVercel = /\.onrender\.com$/.test(origin) || /\.vercel\.app$/.test(origin);

    if (isLocalhost || isProdFrontend || isRenderOrVercel) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  console.log('====================================');
  console.log(`NEW CONTACT SUBMISSION AT: ${new Date().toISOString()}`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Subject: ${subject || 'No Subject'}`);
  console.log(`Message:\n${message}`);
  console.log('====================================');

  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // 1. Try sending via Resend HTTP API (Port 443 - NEVER blocked by Render/AWS)
  if (resendApiKey && resendApiKey !== 'your-resend-api-key') {
    try {
      console.log('📬 Sending email via Resend API (HTTP)...');
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev', // Resend free tier sending domain
          to: process.env.TO_EMAIL || 'norhan.habila@gmail.com',
          reply_to: email,
          subject: `Portfolio Contact: ${subject || 'No Subject'}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #ffe5ec; border-radius: 8px;">
              <h2 style="color: #d6687e; border-bottom: 2px solid #ffeef2; padding-bottom: 10px; font-family: Georgia, serif;">New Portfolio Contact</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #d6687e;">${email}</a></p>
              <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
              <div style="background-color: #fffafb; padding: 15px; border-radius: 6px; border: 1px solid #ffe5ec; margin-top: 20px;">
                <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
              </div>
              <p style="font-size: 10px; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
                Sent from Norhan Habila's Full-Stack Portfolio App via Resend HTTP API.
              </p>
            </div>
          `
        })
      });

      const data = await response.json() as any;
      if (response.ok) {
        console.log('✅ Email successfully sent via Resend API');
        return res.status(200).json({
          success: true,
          message: `Thank you for reaching out, ${name}! Your message has been sent to Norhan's inbox. She will get back to you shortly.`
        });
      } else {
        console.error('❌ Resend API returned error:', data);
        throw new Error(data.message || 'Resend failed');
      }
    } catch (apiError: any) {
      console.warn('⚠️ HTTP Mail API failed, falling back to SMTP...', apiError.message);
      // Let it fall back to standard SMTP/Simulation logic below
    }
  }

  // 2. Fallback to Local Simulation Mode if no SMTP credentials set
  if (!smtpUser || smtpUser === 'your-email@gmail.com' || !smtpPass || smtpPass === 'your-16-character-app-password') {
    console.warn('⚠️ SMTP/Resend credentials not configured in backend/.env. Simulating mail delivery.');
    return res.status(200).json({
      success: true,
      message: `[Simulation Mode] Thank you for reaching out, ${name}! Your message was logged in the console. (To send actual emails, configure Resend API or SMTP credentials in backend/.env).`
    });
  }

  // 3. Fallback to Standard SMTP (Nodemailer)
  try {
    const transportOptions = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      family: 4, // Force IPv4
    };

    const transporter = nodemailer.createTransport(transportOptions as any);

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      to: process.env.TO_EMAIL || 'norhan.habila@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'No Subject'}`,
      text: `You received a new message from your portfolio contact form:

Name: ${name}
Email: ${email}
Subject: ${subject || 'No Subject'}

Message:
${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #ffe5ec; border-radius: 8px;">
          <h2 style="color: #d6687e; border-bottom: 2px solid #ffeef2; padding-bottom: 10px; font-family: Georgia, serif;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #d6687e;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
          <div style="background-color: #fffafb; padding: 15px; border-radius: 6px; border: 1px solid #ffe5ec; margin-top: 20px;">
            <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
          </div>
          <p style="font-size: 10px; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
            Sent from Norhan Habila's Full-Stack Portfolio App.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email successfully sent to ' + (process.env.TO_EMAIL || 'norhan.habila@gmail.com'));

    return res.status(200).json({
      success: true,
      message: `Thank you for reaching out, ${name}! Your message has been sent to Norhan's inbox. She will get back to you shortly.`
    });
  } catch (error: any) {
    console.error('❌ Failed to send email via SMTP:', error);
    return res.status(500).json({
      error: 'Failed to send message. Please ensure your backend SMTP configurations in .env are correct.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});