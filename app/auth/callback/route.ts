import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const email = requestUrl.searchParams.get('email');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || '/account';
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, error_description);
    return NextResponse.redirect(
      new URL(`/sign-in?error=${encodeURIComponent(error_description || error)}`, requestUrl.origin)
    );
  }

  // If it's an email verification link, redirect to verify page with code
  if (type === 'email_verification' || (code && email && !type)) {
    return NextResponse.redirect(
      new URL(`/verify?email=${encodeURIComponent(email || '')}&code=${encodeURIComponent(code || '')}`, requestUrl.origin)
    );
  }

  // Handle OAuth callback (Google, GitHub, etc.)
  if (code) {
    try {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError);
        return NextResponse.redirect(
          new URL('/sign-in?error=auth_failed', requestUrl.origin)
        );
      }
    } catch (error) {
      console.error('Error in auth callback:', error);
      return NextResponse.redirect(
        new URL('/sign-in?error=auth_failed', requestUrl.origin)
      );
    }
  }

  // Redirect to the next URL or account page
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
