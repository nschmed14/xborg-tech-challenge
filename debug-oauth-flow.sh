#!/bin/bash
echo "=== Detailed OAuth Flow Debug ==="
echo ""

BACKEND="https://xborg-tech-challenge-production.up.railway.app"
FRONTEND="https://xborg-tech-challenge-rose.vercel.app"

echo "1. Backend Health:"
curl -s "$BACKEND/health" && echo " ✅" || echo " ❌"

echo -e "\n2. OAuth Login Endpoint:"
RESPONSE=$(curl -s -i "$BACKEND/auth/login/google")
echo "HTTP Status: $(echo "$RESPONSE" | head -1)"
echo "Location Header: $(echo "$RESPONSE" | grep -i "location:" | head -1)"

echo -e "\n3. Check Location Header for clues:"
LOCATION=$(echo "$RESPONSE" | grep -i "location:" | head -1 | cut -d' ' -f2-)
if [[ -n "$LOCATION" ]]; then
    echo "Redirecting to: $LOCATION"
    # Extract redirect_uri from URL
    if [[ "$LOCATION" == *"redirect_uri="* ]]; then
        REDIRECT_URI=$(echo "$LOCATION" | grep -o "redirect_uri=[^&]*" | cut -d= -f2)
        echo "Redirect URI in request: $(echo -e $REDIRECT_URI)"
    fi
fi

echo -e "\n4. Common Issues Found:"
echo "   - 'Missing authentication parameters' usually means redirect_uri mismatch"
echo "   - Check EXACT redirect_uri in Google Cloud Console matches Railway callback URL"
echo "   - Make sure OAuth consent screen is PUBLISHED, not just saved"

echo -e "\n5. Test with different browsers:"
echo "   - Try incognito/private mode"
echo "   - Clear cookies for accounts.google.com"
echo "   - Try different browser"

echo -e "\n6. Direct test URL (replace CLIENT_ID):"
echo "   https://accounts.google.com/o/oauth2/v2/auth?"
echo "   client_id=YOUR_CLIENT_ID"
echo "   redirect_uri=https://xborg-tech-challenge-production.up.railway.app/auth/validate/google"
echo "   response_type=code"
echo "   scope=email profile"
echo "   access_type=offline"
echo "   prompt=consent"
