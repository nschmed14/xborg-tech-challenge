#!/bin/bash
echo "=== Debug Test ==="

# Kill any existing processes
pkill -f "node dist/main" 2>/dev/null || true
sleep 2

# Build
echo "1. Building..."
npm run build

# Start
echo "2. Starting backend..."
npm start > backend.log 2>&1 &
BACKEND_PID=$!

echo "3. Waiting for startup..."
sleep 5

# Check if it's running
if ps -p $BACKEND_PID > /dev/null; then
  echo "Backend is running (PID: $BACKEND_PID)"
  
  echo "4. Testing endpoints..."
  echo "   Root endpoint:"
  curl -v http://localhost:3001/ 2>&1 | grep -E "(< HTTP|> GET|< {)"
  echo ""
  
  echo "   Health endpoint:"
  curl -v http://localhost:3001/health 2>&1 | grep -E "(< HTTP|> GET|< {)"
  echo ""
  
  echo "5. Checking logs..."
  tail -20 backend.log
  
  echo "6. Stopping backend..."
  kill $BACKEND_PID
else
  echo "Backend failed to start. Check backend.log:"
  cat backend.log
fi

echo "=== Debug Complete ==="
