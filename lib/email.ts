import { readFileSync } from 'fs';
import { join } from 'path';

interface VerificationEmailData {
  email: string;
  verificationCode: string;
  verificationLink: string;
}

export async function sendVerificationEmail(data: VerificationEmailData) {
  const templatePath = join(process.cwd(), 'emails', 'verification-email.html');
  let htmlTemplate = readFileSync(templatePath, 'utf-8');

  // Replace placeholders
  htmlTemplate = htmlTemplate
    .replace(/\{\{VERIFICATION_CODE\}\}/g, data.verificationCode)
    .replace(/\{\{VERIFICATION_LINK\}\}/g, data.verificationLink);

  // Send email using your preferred service (Resend, SendGrid, AWS SES, etc.)
  // Example with Resend:
  /*
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: 'LUXE Auto Gallery <noreply@luxeautogallery.com>',
    to: data.email,
    subject: 'Verify Your Account - LUXE Auto Gallery',
    html: htmlTemplate,
  });
  */

  return htmlTemplate;
}

// Generate 8-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}
