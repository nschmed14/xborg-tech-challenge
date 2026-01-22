# Google OAuth Configuration Guide

## Issue: Stuck on "Completing authentication..." page

If you're stuck on the callback page after clicking "Sign in with Google", it means Google doesn't recognize the callback URL.

## Solution: Configure Redirect URIs in Google Console

You need to add the backend callback URL to your Google OAuth app's authorized redirect URIs:

### Steps:

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/

2. **Select your project** (the one with your Google OAuth credentials)

3. **Navigate to OAuth 2.0 Credentials:**
   - Left menu → APIs & Services → Credentials
   - Find your OAuth 2.0 Client ID credential
   - Click to edit it

4. **Add Redirect URI:**
   - Under "Authorized redirect URIs", add:
   ```
   https://xborg-tech-challenge-production.up.railway.app/auth/validate/google
   ```

5. **Save the changes**

6. **Wait a few minutes** for changes to propagate

7. **Try signing in again**

## For Local Development:

Also add this for local testing:
```
http://localhost:3001/auth/validate/google
```

## Current Configuration:

- **Backend Callback URL:** `https://xborg-tech-challenge-production.up.railway.app/auth/validate/google`
- **Frontend Callback Handler:** `https://xborg-tech-challenge-rose.vercel.app/auth/callback`
- **OAuth Scope:** `email`, `profile`

## Testing Flow:

1. Frontend: Click "Sign in with Google"
2. Frontend redirects to: `https://xborg-tech-challenge-production.up.railway.app/auth/login/google`
3. Backend redirects to: Google OAuth page
4. User authenticates with Google
5. Google redirects to: `https://xborg-tech-challenge-production.up.railway.app/auth/validate/google`
6. Backend validates and redirects to: `https://xborg-tech-challenge-rose.vercel.app/auth/callback?token=...&user=...`
7. Frontend stores token and redirects to: `/profile`

## Troubleshooting:

If you're still stuck:

1. **Check browser console** (F12 → Console tab) for error messages
2. **Check backend logs** on Railway to see if the callback is being reached
3. **Verify Google Console settings** are saved (sometimes takes a minute to propagate)
4. **Clear browser cookies** and try again (sometimes stale auth cookies cause issues)

## Alternative: Use Test Login

For development/testing, you can use the test login button on the sign-in page:
- This doesn't require Google OAuth
- Creates a test user automatically
- Useful for testing the flow without Google setup

