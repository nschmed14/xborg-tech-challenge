# XBorg Technical Challenge

Live app: https://xborg-tech-challenge-rose.vercel.app  
API: https://xborg-tech-challenge-production.up.railway.app

## What this does
- Google OAuth 2.0 sign-in with JWT session
- Profile view/edit (full name, links, motivation, challenge URL)
- Authenticated API with NestJS + TypeORM

## Tech
- Frontend: Next.js (app router), React, TypeScript
- Backend: NestJS, TypeORM
- Auth: Google OAuth, JWT in HTTP-only cookie
- DB: Railway Postgres in production; SQLite for local dev

## Quick start (local)

Backend (NestJS):
```bash
cd /workspaces/xborg-tech-challenge
npm install
cp .env.example .env
# fill GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / JWT_SECRET
npm run start:dev
```

Frontend (Next.js):
```bash
cd /workspaces/xborg-tech-challenge/frontend
npm install
cp .env.example .env
# set NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev
```

## Environment variables

Backend (.env):
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- JWT_SECRET
- DATABASE_URL (Railway Postgres) or DATABASE_PATH (SQLite local)
- FRONTEND_URL (e.g., https://xborg-tech-challenge-rose.vercel.app)
- PORT (defaults 3001)

Frontend (.env):
- NEXT_PUBLIC_API_URL (e.g., https://xborg-tech-challenge-production.up.railway.app)

## API

Auth
- GET /auth/login/google – start OAuth
- GET /auth/validate/google – OAuth callback
- POST /auth/test-login – test account

User
- GET /user/profile – get current user
- PUT /user/profile – update current user

## Deploy

Backend (Railway):
1) Connect repo on Railway.  
2) Set env vars: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET, DATABASE_URL, FRONTEND_URL, PORT=3001, NODE_ENV=production.  
3) Deploy (Dockerfile in root is used automatically).

Frontend (Vercel):
1) Import repo, set root to frontend.  
2) Env: NEXT_PUBLIC_API_URL=https://xborg-tech-challenge-production.up.railway.app.  
3) Build command npm run build, output .next.  
4) Deploy.

## Project structure (excerpt)
- src/... – NestJS backend
- frontend/app/... – Next.js app router pages
- frontend/contexts/AuthContext.tsx – auth state
- frontend/lib/api.ts – API client

## Testing
- Backend: npm run test
- Frontend: cd frontend && npm run test (if present)

## Notes
- Production uses hard redirect to /profile after OAuth callback for reliability.
- CORS is configured for Vercel frontend, Railway backend, and localhost:3000.
