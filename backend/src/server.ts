import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend connection (standard Vite dev server runs on port 5173/5174/4173)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed domains
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

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Contact endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Log submission locally to console
  console.log('====================================');
  console.log(`NEW CONTACT SUBMISSION AT: ${new Date().toISOString()}`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Subject: ${subject || 'No Subject'}`);
  console.log(`Message:\n${message}`);
  console.log('====================================');

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // Check if SMTP is configured (fallback to log-only simulation if details are missing/default)
  if (!smtpUser || smtpUser === 'your-email@gmail.com' || !smtpPass || smtpPass === 'your-16-character-app-password') {
    console.warn('⚠️ SMTP credentials not configured in backend/.env. Simulating mail delivery.');
    return res.status(200).json({
      success: true,
      message: `[Simulation Mode] Thank you for reaching out, ${name}! Your message was logged in the console. (To send actual emails, configure SMTP credentials in the backend/.env file).`
    });
  }

  try {
    // Create Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465', // true for 465, false for 587/25
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Gmail requires the "from" to match authenticated user
      to: process.env.TO_EMAIL || 'norhan.habila@gmail.com',
      replyTo: email, // Direct replies back to the sender
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
          <p style="font-size: 10px; color: #888; margin-top: 30px; border-t: 1px solid #eee; padding-top: 10px;">
            Sent from Norhan Habila's Full-Stack Portfolio App.
          </p>
        </div>
      `
    };

    // Send email
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
