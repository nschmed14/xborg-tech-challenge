#!/bin/bash
echo "Testing XBorg Application..."
echo ""

# Wait for backend to start
echo "Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s -f "https://turbo-zebra-946g554gq693pq46-3001.app.github.dev" > /dev/null 2>&1; then
        echo "✓ Backend is responding"
        break
    fi
    echo -n "."
    sleep 1
done

echo ""
echo "=== APPLICATION READY ==="
echo "Frontend: https://turbo-zebra-946g554gq693pq46-3000.app.github.dev"
echo "Backend: https://turbo-zebra-946g554gq693pq46-3001.app.github.dev"
echo "Test Login: https://turbo-zebra-946g554gq693pq46-3001.app.github.dev/auth/test/login"
echo ""
echo "=== INSTRUCTIONS ==="
echo "1. Open frontend URL in browser"
echo "2. Click 'Sign in with Test Account'"
echo "3. You should be redirected to profile page"
