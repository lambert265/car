import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const email = requestUrl.searchParams.get('email');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || '/account';

  // If it's an email verification link, redirect to verify page with code
  if (type === 'email_verification' || (code && email)) {
    return NextResponse.redirect(
      new URL(`/verify?email=${encodeURIComponent(email || '')}&code=${encodeURIComponent(code || '')}`, requestUrl.origin)
    );
  }

  // Handle OAuth callback
  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/sign-in?error=auth_failed', requestUrl.origin));
    }
  }

  // Redirect to the next URL or account page
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
