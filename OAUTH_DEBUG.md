# OAuth Flow Debugging Guide

## If you're stuck on "Completing authentication..."

This means the browser is waiting for the redirect but it's not happening. Follow these steps:

### Step 1: Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Look for any error messages (shown in red)
4. Take note of any errors and share them

### Step 2: Check Network Tab
1. Open Developer Tools (F12)
2. Go to the **Network** tab
3. Click "Sign in with Google" again
4. Look for these network requests in order:
   - `login/google` → Should be 302 redirect to accounts.google.com
   - A request to `accounts.google.com` for Google login page
   - After you log in with Google, you should see a redirect back
   - The final request should be to `/auth/callback?token=...&user=...`

### Step 3: Check if it's a Google OAuth Console Issue

**Current Configuration:**
- **Redirect URI**: `https://xborg-tech-challenge-production.up.railway.app/auth/validate/google`
- **JavaScript Origins**: 
  - `http://localhost:3000`
  - `https://xborg-tech-challenge-rose.vercel.app`

If you see an error like "redirect_uri_mismatch", it means Google doesn't recognize the callback URL. Double-check in Google Console that the URI is **exactly** as shown above.

### Step 4: Test the Backend Directly

The backend callback endpoint can be tested by manually calling it (this helps verify the backend part works):

```bash
# Check OAuth configuration
curl https://xborg-tech-challenge-production.up.railway.app/auth/status

# Check OAuth debug info
curl https://xborg-tech-challenge-production.up.railway.app/auth/debug/oauth

# Try test login (doesn't require Google)
curl -X POST https://xborg-tech-challenge-production.up.railway.app/auth/test-login
```

### Step 5: Alternative - Use Test Login

If Google OAuth isn't working, you can test the callback mechanism using the test login:

1. Go to https://xborg-tech-challenge-rose.vercel.app/auth/signin
2. Click "Sign in with Test Account"
3. If this works, the issue is definitely with Google OAuth configuration
4. If this also fails, the issue is with the token/callback mechanism

### Common Issues & Solutions

#### Issue: "Invalid OAuth Callback"
- **Cause**: Redirect URI in Google Console doesn't match exactly
- **Solution**: Go to Google Console and verify the URI matches character-for-character

#### Issue: "Redirect URI Mismatch"
- **Cause**: Same as above
- **Solution**: Check for typos or extra slashes

#### Issue: "Test Login works but Google OAuth doesn't"
- **Cause**: Google OAuth not properly configured
- **Solution**: Check Google Console settings

#### Issue: "Nothing happens on the callback page"
- **Cause**: Frontend callback page not receiving token
- **Solution**: Check browser console for errors (Step 1)

### What Should Happen

1. **Click "Sign in with Google"**
   - Page shows loading spinner
   - URL changes to: `login/google`

2. **Redirected to Google**
   - Browser navigates to Google auth page
   - You see Google login form

3. **Log in with Google**
   - Enter your Google credentials
   - Google asks for permission

4. **Approve permission**
   - Browser redirects to callback
   - Shows "Completing authentication..." briefly

5. **Redirected to Profile**
   - URL becomes `/profile`
   - You see your email and profile

### Debug Endpoints

These endpoints help diagnose issues:

```bash
# View OAuth configuration
GET /auth/status

# Detailed OAuth setup info
GET /auth/debug/oauth

# Create test user (no Google needed)
POST /auth/test-login

# Check if backend is running
GET /health
```

### Getting More Help

If you're still stuck, please provide:
1. **Browser console errors** (F12 → Console)
2. **Network tab screenshots** (F12 → Network)
3. **Which step fails** (Google page, callback, profile)
4. **Error message** if any appears

### Quick Checklist

- [ ] Google Console has the redirect URI configured
- [ ] Frontend URL is in "Authorized JavaScript origins"
- [ ] Backend is responding to `/auth/status` endpoint
- [ ] Test login works (validates frontend callback mechanism)
- [ ] No errors in browser console
- [ ] Network tab shows redirect requests in sequence

