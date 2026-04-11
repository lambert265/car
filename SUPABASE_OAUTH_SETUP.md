# Supabase OAuth Configuration Guide

## 1. Authorized Redirect URLs

Go to: https://supabase.com/dashboard/project/hlhedxnifxeaqysahvzf/auth/url-configuration

### Add these URLs:

#### Local Development:
```
http://localhost:3000
http://localhost:3000/auth/callback
http://localhost:3000/sign-in
http://localhost:3000/account
http://localhost:3000/verify
```

#### Production (Vercel):
```
https://car-sandy-pi.vercel.app
https://car-sandy-pi.vercel.app/auth/callback
https://car-sandy-pi.vercel.app/sign-in
https://car-sandy-pi.vercel.app/account
https://car-sandy-pi.vercel.app/verify
https://*.vercel.app/auth/callback
```

## 2. Site URL Configuration

**Site URL**: `https://car-sandy-pi.vercel.app`

## 3. OAuth Provider Setup

### For Google OAuth:
1. Go to: https://supabase.com/dashboard/project/hlhedxnifxeaqysahvzf/auth/providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Authorized redirect URI for Google Console:
   ```
   https://hlhedxnifxeaqysahvzf.supabase.co/auth/v1/callback
   ```

### For GitHub OAuth:
1. Enable GitHub provider in Supabase
2. Add GitHub OAuth App credentials
3. Authorization callback URL for GitHub:
   ```
   https://hlhedxnifxeaqysahvzf.supabase.co/auth/v1/callback
   ```

## 4. Email Templates

Go to: https://supabase.com/dashboard/project/hlhedxnifxeaqysahvzf/auth/templates

Update the email templates to use your custom verification flow:

### Confirm Signup Template:
```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your email:</p>
<p><a href="{{ .SiteURL }}/auth/callback?type=email_verification&token={{ .Token }}">Confirm your email</a></p>
```

### Magic Link Template:
```html
<h2>Magic Link</h2>
<p>Follow this link to login:</p>
<p><a href="{{ .SiteURL }}/auth/callback?token={{ .Token }}&type=magiclink&next=/account">Log In</a></p>
```

## 5. Environment Variables

Make sure these are set in Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=https://hlhedxnifxeaqysahvzf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=https://car-sandy-pi.vercel.app
```

## 6. Testing OAuth Flow

### Local:
1. Start dev server: `npm run dev`
2. Go to sign-in page
3. Click OAuth provider button
4. Should redirect to: `http://localhost:3000/auth/callback?code=...`
5. Then redirect to: `/account`

### Production:
1. Deploy to Vercel
2. Test OAuth flow
3. Should redirect to: `https://car-sandy-pi.vercel.app/auth/callback?code=...`
4. Then redirect to: `/account`

## 7. Email Verification Flow

1. User signs up
2. Receives email with link: `/auth/callback?type=email_verification&email=...&code=...`
3. Callback route redirects to: `/verify?email=...&code=...`
4. User sees pre-filled verification form
5. After verification, redirects to `/sign-in`

## Troubleshooting

- If OAuth fails, check browser console for errors
- Verify redirect URLs match exactly (no trailing slashes)
- Check Supabase logs: https://supabase.com/dashboard/project/hlhedxnifxeaqysahvzf/logs/explorer
- Ensure environment variables are set in Vercel
