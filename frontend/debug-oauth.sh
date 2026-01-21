#!/bin/bash
echo "=== Google OAuth Debug ==="
echo ""
echo "1. Environment Variables:"
echo "GOOGLE_CLIENT_ID: $(grep GOOGLE_CLIENT_ID .env | cut -d'=' -f2 | cut -c1-30)..."
echo "GOOGLE_CALLBACK_URL: $(grep GOOGLE_CALLBACK_URL .env | cut -d'=' -f2)"
echo ""
echo "2. Test OAuth URL construction:"
CLIENT_ID=$(grep GOOGLE_CLIENT_ID .env | cut -d'=' -f2)
CALLBACK_URL=$(grep GOOGLE_CALLBACK_URL .env | cut -d'=' -f2)
if [ -n "$CLIENT_ID" ] && [ "$CLIENT_ID" != "your-google-client-id.apps.googleusercontent.com" ]; then
    echo "✅ Client ID looks real"
    echo ""
    echo "3. Constructed OAuth URL:"
    echo "https://accounts.google.com/o/oauth2/v2/auth?"
    echo "  client_id=$CLIENT_ID"
    echo "  redirect_uri=$CALLBACK_URL"
    echo "  response_type=code"
    echo "  scope=email profile"
    echo "  access_type=offline"
    echo "  prompt=consent"
    echo ""
    echo "4. Things to check in Google Cloud Console:"
    echo "   - Go to https://console.cloud.google.com/"
    echo "   - Navigate to: APIs & Services > Credentials"
    echo "   - Find your OAuth 2.0 Client ID"
    echo "   - Check 'Authorized redirect URIs' contains EXACTLY:"
    echo "     $CALLBACK_URL"
    echo "   - Make sure OAuth consent screen is published"
else
    echo "❌ Client ID is still placeholder"
    echo "Please update .env with real Google OAuth credentials"
fi
