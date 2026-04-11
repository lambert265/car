import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail, generateVerificationCode } from '@/lib/email';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
const createClient = () => createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createClient();
    const verificationCode = generateVerificationCode();
    
    // Store verification code in database with expiry
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    const { error: dbError } = await supabase
      .from('verification_codes')
      .insert({
        email,
        code: verificationCode,
        expires_at: expiresAt.toISOString(),
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to create verification code' }, { status: 500 });
    }

    // Send email
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?type=email_verification&email=${encodeURIComponent(email)}&code=${verificationCode}`;
    
    await sendVerificationEmail({
      email,
      verificationCode,
      verificationLink,
    });

    return NextResponse.json({ success: true, message: 'Verification email sent' });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
