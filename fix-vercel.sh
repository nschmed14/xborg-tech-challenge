#!/bin/bash
cd /workspaces/xborg-tech-challenge/frontend

# 1. Create correct .env.production
cat > .env.production << 'ENVEOF'
NEXT_PUBLIC_API_URL=https://xborg-tech-challenge-production.up.railway.app
NEXT_PUBLIC_FRONTEND_URL=https://xborg-tech-challenge-rose.vercel.app
ENVEOF

# 2. Update package.json if needed to use .env.production
if ! grep -q "vercel-build" package.json; then
  echo "Updating package.json build script..."
  sed -i 's/"build": "next build"/"build": "next build",\n    "vercel-build": "next build"/' package.json
fi

# 3. Commit and push
git add .env.production package.json
git commit -m "fix: update production environment variables for Railway backend"
git push origin main

echo "✅ Changes pushed. Vercel will auto-deploy with correct API URL."
echo "Check deployment at: https://xborg-tech-challenge-rose.vercel.app"
