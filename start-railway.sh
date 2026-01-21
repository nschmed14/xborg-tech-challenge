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

# Start the application
node dist/main.js
