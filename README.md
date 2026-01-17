# XBorg Technical Challenge

## Project Overview
A full-stack application with Google OAuth authentication, user profile management, and JWT-based session handling.

## Features
- Google OAuth 2.0 authentication
- User profile creation, reading, and updating
- JWT token-based authorization
- Persistent sessions
- TypeScript throughout

## Tech Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: NestJS, TypeScript
- **Database**: SQLite with TypeORM
- **Authentication**: Google OAuth, JWT

## Setup Instructions

### Prerequisites
- Node.js 20+
- Google OAuth credentials

### Backend Setup
1. Navigate to backend directory:
   \\\ash
   cd backend
   \\\
2. Install dependencies:
   \\\ash
   npm install
   \\\
3. Copy environment file:
   \\\ash
   cp .env.example .env
   \\\
4. Update \.env\ with your Google OAuth credentials
5. Start development server:
   \\\ash
   npm run start:dev
   \\\

### Frontend Setup
1. Navigate to frontend directory:
   \\\ash
   cd frontend
   \\\
2. Install dependencies:
   \\\ash
   npm install
   \\\
3. Start development server:
   \\\ash
   npm run dev
   \\\

## API Endpoints

### Authentication
- \GET /auth/login/google\ - Initiate Google OAuth login
- \GET /auth/validate/google\ - Validate Google OAuth callback

### User Profile
- \GET /user/profile\ - Get user profile (requires JWT)
- \PUT /user/profile\ - Update user profile (requires JWT)

## Project Structure
\\\
xborg-tech-challenge/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── user/          # User profile module
│   │   └── app.module.ts  # Main application module
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── auth/          # Authentication pages
│   │   ├── profile/       # Profile page
│   │   └── layout.tsx     # Root layout
│   ├── components/        # React components
│   ├── package.json
│   └── tsconfig.json
└── README.md
\\\

## Environment Variables
See \.env.example\ for required variables:
- \GOOGLE_CLIENT_ID\
- \GOOGLE_CLIENT_SECRET\
- \JWT_SECRET\
- \DATABASE_PATH\

## Testing
\\\ash
# Backend tests
cd backend
npm test

# Frontend tests  
cd frontend
npm test
\\\

## License
MIT
