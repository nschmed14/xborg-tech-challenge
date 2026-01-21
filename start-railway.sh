#!/bin/bash
# Railway provides DATABASE_URL for PostgreSQL

# Generate JWT secret if not set
if [ -z "$JWT_SECRET" ]; then
  echo "WARNING: JWT_SECRET not set. Using a default for development."
  export JWT_SECRET=development-secret-change-in-production
fi

# Log database info (without password)
if [ -n "$DATABASE_URL" ]; then
  DB_INFO=$(echo "$DATABASE_URL" | sed 's/:[^:]*@/:****@/')
  echo "Database configured: $DB_INFO"
else
  echo "WARNING: DATABASE_URL not set!"
fi

# Reset database if RESET_DB is true
if [ "$RESET_DB" = "true" ]; then
  echo "⚠️  RESET_DB=true - Dropping and recreating database schema..."
  export TYPEORM_SYNCHRONIZE=true
  # We'll rely on TypeORM's synchronize to recreate the schema
  echo "Database will be reset on application startup"
fi

echo "Starting application..."
node dist/main.js
