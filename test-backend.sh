#!/bin/bash
echo "=== Testing Backend ==="

# Build first
echo "1. Building project..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

echo "2. Starting backend in background..."
npm start &
BACKEND_PID=$!

echo "3. Waiting for backend to start (5 seconds)..."
sleep 5

echo "4. Testing endpoints:"
echo "   a) Health check (/health):"
curl -s http://localhost:3001/health | jq . 2>/dev/null || curl -s http://localhost:3001/health
echo ""
echo "   b) Root endpoint (/):"
curl -s http://localhost:3001/ | jq . 2>/dev/null || curl -s http://localhost:3001/
echo ""
echo "   c) Test login (POST /auth/test-login):"
curl -s -X POST http://localhost:3001/auth/test-login | jq -r '.access_token | "Token: " + .[0:50] + "..."' 2>/dev/null || curl -s -X POST http://localhost:3001/auth/test-login
echo ""
echo "   d) Google login (GET /auth/login/google):"
curl -s -I http://localhost:3001/auth/login/google | head -1
echo ""

echo "5. Testing with JWT token:"
TOKEN=$(curl -s -X POST http://localhost:3001/auth/test-login | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
if [ -n "$TOKEN" ]; then
  echo "   e) Get profile with JWT:"
  curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3001/user/profile | jq . 2>/dev/null || curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3001/user/profile
  echo ""
fi

echo "6. Stopping backend..."
kill $BACKEND_PID 2>/dev/null
wait $BACKEND_PID 2>/dev/null

echo "=== Test Complete ==="
