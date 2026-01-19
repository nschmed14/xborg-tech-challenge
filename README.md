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
- Google OAuth credentials (optional for test account)

### Backend Setup
1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file and edit values as needed:

   ```bash
   cp .env.example .env
   # edit .env and set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET, etc.
   ```

4. Start the development server:

   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file and edit if you need to override the API URL:

   ```bash
   cp .env.example .env
   # If your backend runs on a non-default port set NEXT_PUBLIC_API_URL accordingly
   ```

4. Start the development server (default Next dev port is 3000; if that port is in use it will pick another port, e.g. 3002):

   ```bash
   npm run dev
   # or to force a specific port: PORT=3002 npm run dev
   ```

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
We include example env files for both services:

- [backend/.env.example](backend/.env.example) — copy to `backend/.env` and set values
- [frontend/.env.example](frontend/.env.example) — copy to `frontend/.env` (sets `NEXT_PUBLIC_API_URL`)

Important variables:

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — OAuth credentials (optional for test login)
- `JWT_SECRET` — Use a strong secret in production
- `DATABASE_PATH` — SQLite file location for local dev

## Testing
Run backend tests (if implemented):

```bash
cd backend
npm test
```

Run frontend tests (if implemented):

```bash
cd frontend
npm test
```

## Submission
Create a private GitHub repository with the project and include:

- This repository contents
- `backend/.env.example` and `frontend/.env.example`
- A short deployment/testing note in the README describing how to run the app locally and any caveats (ports, OAuth setup)

Optional: include a short write-up of design decisions and security notes.

## License
MIT
