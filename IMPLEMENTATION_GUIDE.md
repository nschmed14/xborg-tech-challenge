# XBorg Technical Challenge - OAuth Implementation

A full-stack Google OAuth authentication application built with **NestJS** backend and **Next.js** frontend, demonstrating secure authentication flow with JWT tokens.

## 🎯 Live Deployments

| Component | Platform | URL |
|-----------|----------|-----|
| Backend API | Railway | https://xborg-tech-challenge-production.up.railway.app |
| Frontend Web | Vercel | https://frontend-ten-liard-73.vercel.app |

## ✨ Features

- **Google OAuth 2.0** - Seamless third-party authentication
- **JWT Tokens** - Secure stateless authentication
- **User Profiles** - Create, read, update user information
- **Protected Routes** - Secure backend endpoints
- **Full-Stack Type Safety** - TypeScript throughout
- **Database Persistence** - PostgreSQL with TypeORM
- **Production Ready** - Deployed on Railway & Vercel

## 🏗️ Architecture

### Backend (NestJS)
```
src/
├── auth/          # OAuth & JWT implementation
│   ├── strategies/    # Passport strategies (Google, JWT)
│   ├── guards/        # Route protection
│   └── auth.service.ts
├── user/          # User management
│   ├── user.entity.ts # Database model
│   └── user.service.ts
└── main.ts        # Application entry point
```

### Frontend (Next.js)
```
frontend/app/
├── auth/
│   ├── signin/       # Google sign-in page
│   ├── callback/     # OAuth callback handler
│   └── layout.tsx    # Auth provider
├── profile/         # User profile page
└── page.tsx         # Root redirect
```

## 🔐 Authentication Flow

```
1. User clicks "Sign in with Google"
   ↓
2. Frontend redirects to: /auth/login/google
   ↓
3. Backend uses Passport to redirect to Google
   ↓
4. User authenticates with Google
   ↓
5. Google redirects back to: /auth/validate/google
   ↓
6. Backend creates JWT token & user session
   ↓
7. Backend redirects to frontend callback with token
   ↓
8. Frontend stores JWT in secure cookie
   ↓
9. User can access protected profile page
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (for production)
- Google OAuth credentials (optional for local development)

### Local Development

#### Backend
```bash
# Install dependencies
npm install

# Build
npm run build

# Run development
PORT=3001 GOOGLE_CLIENT_ID=test GOOGLE_CLIENT_SECRET=test npm run start:dev

# Run production build
node dist/main.js
```

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Run development
npm run dev

# Build for production
npm run build
```

### Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL=postgres://user:pass@host/db
# Or use SQLite
DATABASE_PATH=database.sqlite

# OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=https://your-domain.com/auth/validate/google

# JWT
JWT_SECRET=your-secret-key

# Frontend
FRONTEND_URL=https://your-frontend.com
CORS_ORIGIN=https://your-frontend.com

# Server
PORT=3001
NODE_ENV=production
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://xborg-tech-challenge-production.up.railway.app
NEXT_PUBLIC_FRONTEND_URL=https://frontend-ten-liard-73.vercel.app
```

## 📡 API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `GET /` - Available endpoints list
- `GET /auth/login/google` - Initiate Google OAuth
- `GET /auth/validate/google` - OAuth callback (Google redirects here)
- `POST /auth/test-login` - Test JWT generation

### Protected Endpoints (Require JWT)
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

## 🔧 Key Technologies

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - Database ORM
- **Passport.js** - Authentication middleware
- **JWT** - Token-based auth
- **PostgreSQL** - Primary database

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Cookies** - Secure token storage
- **Axios** - HTTP client

## 📊 Database Schema

### User Entity
```typescript
{
  id: UUID
  email: string (unique)
  full_name: string
  avatar_url: string
  google_id: string (nullable)
  github_url: string
  resume_url: string
  motivation: string
  challenge_url: string
  created_at: timestamp
  updated_at: timestamp
}
```

## 🔒 Security Features

✅ **JWT Signing** - Tokens signed with secret key
✅ **CORS Protection** - Restricted to frontend domain
✅ **Secure Cookies** - HttpOnly flag for token storage
✅ **Password Hashing** - Bcrypt for passwords (if used)
✅ **Route Guards** - Protected endpoints require valid JWT
✅ **Environment Variables** - Sensitive data not in code
✅ **HTTPS Only** - All deployments use SSL/TLS

## 📈 Deployment

### Railway (Backend)
- Automatic deployment from GitHub
- PostgreSQL database included
- Health check monitoring
- Environment variables configured

### Vercel (Frontend)
- Automatic deployment from GitHub
- Environment variables pre-configured
- Automatic HTTPS
- Global CDN

## 🧪 Testing

### Health Check
```bash
curl https://xborg-tech-challenge-production.up.railway.app/health
```

### Test Login
```bash
curl -X POST https://xborg-tech-challenge-production.up.railway.app/auth/test-login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'
```

### Protected Endpoint
```bash
curl https://xborg-tech-challenge-production.up.railway.app/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📝 Recent Updates

### [2026-01-21] - Production Release
- ✅ Fixed PostgreSQL compatibility in NestJS config
- ✅ Updated Vercel deployment URL
- ✅ All endpoints tested and working
- ✅ OAuth flow complete and functional
- ✅ Health checks passing on Railway
- ✅ Frontend and backend communicating securely

## 🐛 Troubleshooting

### Backend Health Check Failing
**Issue**: Railway healthcheck fails immediately after deployment
**Solution**: Ensure `DATABASE_URL` environment variable is set correctly

### CORS Errors
**Issue**: Frontend cannot reach backend
**Solution**: Check `CORS_ORIGIN` environment variable matches frontend URL

### OAuth Redirect Loop
**Issue**: Redirects endlessly between frontend and backend
**Solution**: Verify `GOOGLE_CALLBACK_URL` matches the redirect endpoint

### Token Not Persisting
**Issue**: User gets logged out after page refresh
**Solution**: Check that cookies are enabled and using HttpOnly flag

## 📚 Documentation

- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Current deployment status
- [OAUTH_FIX_SUMMARY.md](./OAUTH_FIX_SUMMARY.md) - OAuth implementation details
- [DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md) - Deployment history

## 🤝 Contributing

This is a technical challenge implementation. For modifications:

1. Create a feature branch
2. Make changes
3. Test locally
4. Push to GitHub
5. Deployments will auto-update

## 📄 License

This project is part of the XBorg Technical Challenge.

---

**Status**: ✅ Production Ready
**Last Updated**: January 21, 2026
**Maintainer**: @nschmed14
