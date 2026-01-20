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
curl -s http://localhost:3001/health
echo ""
echo "   b) Root endpoint (/):"
curl -s http://localhost:3001/
echo ""
echo "   c) Test login (POST /auth/test-login):"
curl -s -X POST http://localhost:3001/auth/test-login
echo ""
echo "   d) Google login (GET /auth/login/google):"
curl -s http://localhost:3001/auth/login/google
echo ""

echo "5. Stopping backend..."
kill $BACKEND_PID 2>/dev/null
wait $BACKEND_PID 2>/dev/null

echo "=== Test Complete ==="
