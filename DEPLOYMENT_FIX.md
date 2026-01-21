# Google OAuth Deployment Fix

## Issue
Google OAuth sign-in fails on deployed application with "redirect_uri_mismatch" or similar error.

## Root Cause
The Google Cloud Console OAuth 2.0 credentials don't have the deployed backend callback URL in the authorized redirect URIs list.

## Solution Steps

### 1. Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID
4. Click the **Edit** button (pencil icon)
5. Under **Authorized redirect URIs**, add:
   ```
   https://xborg-tech-challenge-production.up.railway.app/auth/validate/google
   ```
6. Also ensure you have these for development:
   ```
   http://localhost:3001/auth/validate/google
   http://localhost:3000/auth/callback
   ```
7. Click **SAVE**

### 2. Verify Railway Environment Variables

Make sure Railway has these environment variables configured:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://xborg-tech-challenge-production.up.railway.app/auth/validate/google
FRONTEND_URL=https://xborg-tech-challenge-rose.vercel.app
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DATABASE_PATH=./database.sqlite
PORT=3001
NODE_ENV=production
```

### 3. Verify Vercel Environment Variables

Make sure Vercel has this environment variable:

```env
NEXT_PUBLIC_API_URL=https://xborg-tech-challenge-production.up.railway.app
```

### 4. Test the Fix

1. Visit: https://xborg-tech-challenge-rose.vercel.app
2. Click "Sign in with Google"
3. You should be redirected to Google's consent screen
4. After authorizing, you'll be redirected back to your app with a JWT token
5. You should land on the profile page

### 5. Common Issues

**Issue: Still getting redirect_uri_mismatch**
- Make sure the URL in Google Console matches EXACTLY (including https://, no trailing slash)
- Wait a few minutes after saving in Google Console (changes can take time to propagate)

**Issue: CORS errors**
- Check that FRONTEND_URL is set correctly in Railway
- Make sure your backend's CORS configuration allows the Vercel domain

**Issue: JWT token errors**
- Verify JWT_SECRET is set in Railway and is a strong secret
- Check that the token is being properly stored in the frontend

**Issue: Database errors**
- Railway might be using a temporary filesystem
- Consider using Railway's PostgreSQL addon instead of SQLite for production
- Or ensure DATABASE_PATH points to a persistent volume

## Verification Commands

Test the backend health:
```bash
curl https://xborg-tech-challenge-production.up.railway.app/auth/status
```

Expected response:
```json
{
  "googleOAuthConfigured": true,
  "hasClientID": true,
  "clientIDLength": 72,
  "callbackURL": "https://xborg-tech-challenge-production.up.railway.app/auth/validate/google",
  "frontendURL": "https://xborg-tech-challenge-rose.vercel.app"
}
```

## Alternative: Using Test Login

If you don't want to configure Google OAuth, you can use the test login endpoint:

1. The frontend already has a "Sign in with Test Account" button
2. This creates a test user without requiring Google OAuth
3. Useful for demonstrating the app without full OAuth setup

## Security Notes

- Keep your GOOGLE_CLIENT_SECRET secure and never commit it to git
- Use a strong JWT_SECRET in production
- Consider adding rate limiting to prevent abuse
- Add proper error handling for production environments
