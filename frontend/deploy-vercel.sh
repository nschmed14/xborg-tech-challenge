#!/bin/bash
cd /workspaces/xborg-tech-challenge/frontend

# Install Vercel CLI if not installed
npm install -g vercel 2>/dev/null || echo "Vercel CLI already installed"

# Login to Vercel (if not already)
# vercel login

# Pull environment
vercel env pull .env.production.local

# Check current env
echo "Current environment:"
cat .env.production.local 2>/dev/null || echo "No .env.production.local"

# Deploy
echo "Deploying to Vercel..."
vercel --prod
