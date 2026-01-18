#!/bin/bash
echo "Resetting database..."
rm -f database.sqlite xborg.db
echo "Creating new schema..."
sqlite3 database.sqlite << 'SQL'
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  github_url TEXT,
  resume_url TEXT,
  motivation TEXT,
  challenge_url TEXT,
  google_id TEXT,
  avatar_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
SQL
echo "✅ Database reset complete!"
echo "Start backend with: npm run start:dev"
