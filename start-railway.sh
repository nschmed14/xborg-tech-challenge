#!/bin/bash
# Railway provides DATABASE_URL for PostgreSQL

# Generate JWT secret if not set
if [ -z "$JWT_SECRET" ]; then
  echo "WARNING: JWT_SECRET not set. Using a default for development."
  export JWT_SECRET=development-secret-change-in-production
fi

# Check for Google OAuth credentials
if [ -z "$GOOGLE_CLIENT_ID" ] || [ -z "$GOOGLE_CLIENT_SECRET" ]; then
  echo "ERROR: Google OAuth credentials not configured!"
  echo "Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Railway environment variables"
  exit 1
fi

# Log database info (without password)
if [ -n "$DATABASE_URL" ]; then
  DB_INFO=$(echo "$DATABASE_URL" | sed 's/:[^:]*@/:****@/')
  echo "Database configured: $DB_INFO"
else
  echo "WARNING: DATABASE_URL not set! Using SQLite fallback."
fi

# Reset database if RESET_DB is true
if [ "$RESET_DB" = "true" ]; then
  echo "⚠️  RESET_DB=true - Dropping and recreating database schema..."
  export TYPEORM_SYNCHRONIZE=true
  # We'll rely on TypeORM's synchronize to recreate the schema
  echo "Database will be reset on application startup"
fi

echo "Starting application..."
echo "Environment: ${NODE_ENV:-development}"
echo "Port: ${PORT:-3001}"
echo "Frontend URL: ${FRONTEND_URL}"

# Start the app with error handling
node dist/main.js || {
  echo "ERROR: Application failed to start!"
  echo "Checking dist/main.js exists..."
  ls -la dist/ || echo "dist/ directory not found!"
  exit 1
}
