#!/bin/bash
echo "=== Testing Deployed Application ==="
echo ""

BACKEND_URL="https://xborg-tech-challenge-production.up.railway.app"
FRONTEND_URL="https://xborg-tech-challenge-rose.vercel.app"

echo "1. Testing Backend Health:"
curl -s "$BACKEND_URL/health" && echo " ✅" || echo " ❌"

echo -e "\n2. Testing OAuth Endpoint:"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/auth/login/google")
if [ "$STATUS" = "302" ] || [ "$STATUS" = "200" ]; then
    echo " ✅ Returns $STATUS (likely redirecting to Google)"
else
    echo " ❌ Returns $STATUS"
fi

echo -e "\n3. Testing Frontend:"
curl -s -o /dev/null -w "Frontend Status: %{http_code}\n" "$FRONTEND_URL"

echo -e "\n4. Testing CORS (frontend to backend):"
curl -s -X OPTIONS "$BACKEND_URL/auth/login/google" \
  -H "Origin: $FRONTEND_URL" \
  -H "Access-Control-Request-Method: GET" \
  --head | grep -i "access-control"

echo -e "\n=== OAuth Configuration Check ==="
echo "Make sure these URLs match exactly in Google Cloud Console:"
echo "Redirect URI: $BACKEND_URL/auth/validate/google"
echo "JavaScript Origin: $FRONTEND_URL"
