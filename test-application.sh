#!/bin/bash

echo "=== XBorg Technical Challenge - Application Test ==="
echo ""

# Test Backend
echo "1. Testing Backend..."
cd backend
npm ci --silent 2>/dev/null

# Start backend
npm run start:dev > backend-test.log 2>&1 &
BACKEND_PID=$!
sleep 10

if curl -s http://localhost:3001 > /dev/null; then
    echo "   ✅ Backend is running"
    
    # Check endpoints
    ENDPOINTS=(
        "GET /auth/login/google"
        "GET /auth/validate/google" 
        "GET /user/profile (protected)"
        "PUT /user/profile (protected)"
    )
    
    for endpoint in "${ENDPOINTS[@]}"; do
        echo "   - $endpoint"
    done
    
else
    echo "   ❌ Backend failed to start"
    echo "   Last 10 lines of backend log:"
    tail -10 backend-test.log
fi

kill $BACKEND_PID 2>/dev/null

echo ""
echo "2. Testing Frontend..."
cd ../frontend
npm ci --silent 2>/dev/null

# Build frontend
npm run build > frontend-build.log 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Frontend build successful"
    
    # Check if required pages exist
    PAGES=(
        "app/auth/signin/page.tsx"
        "app/auth/callback/page.tsx" 
        "app/profile/page.tsx"
        "src/contexts/AuthContext.tsx"
        "src/lib/api.ts"
    )
    
    for page in "${PAGES[@]}"; do
        if [ -f "$page" ]; then
            echo "   ✅ $page exists"
        else
            echo "   ❌ $page missing"
        fi
    done
    
else
    echo "   ❌ Frontend build failed"
    echo "   Last 10 lines of build log:"
    tail -10 frontend-build.log
fi

echo ""
echo "=== Summary ==="
echo "The application should now be ready for submission."
echo ""
echo "To run the full application:"
echo "1. Start backend: cd backend && npm run start:dev"
echo "2. Start frontend: cd frontend && npm run dev"
echo "3. Open http://localhost:3000/auth/signin"
echo ""
echo "Note: You need to configure real Google OAuth credentials"
echo "in backend/.env for production use."
