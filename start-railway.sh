#!/bin/bash
# Create database directory if it doesn't exist
mkdir -p /tmp/data

# Set database path for Railway (persistent storage)
export DATABASE_PATH=/tmp/data/database.sqlite

# Generate JWT secret if not set
if [ -z "$JWT_SECRET" ]; then
  echo "WARNING: JWT_SECRET not set. Using a default for development."
  export JWT_SECRET=development-secret-change-in-production
fi

# Start the application
node dist/main.js
