#!/bin/sh
set -e

echo "=========================================================="
echo "🌾 Starting BIOTILL AGRI PRIVATE LIMITED Local Full-Stack"
echo "=========================================================="

# Check if docker is available and requested
if [ "$1" = "--docker" ] || [ "$1" = "-d" ] || command -v docker >/dev/null 2>&1 && [ "$1" != "--local" ]; then
  echo "🐳 Launching via Docker Compose (Postgres, Redis, Backend & Storefront)..."
  docker compose up --build
else
  echo "💻 Launching locally with Node.js..."
  echo "1. Installing root dependencies..."
  npm install

  echo "2. Running Backend Migrations & Seed..."
  cd apps/backend
  npx medusa db:migrate
  npm run seed || true
  npx medusa user -e admin@biotill.in -p supersecret || true
  cd ../..

  echo "3. Starting Backend & Storefront concurrently..."
  npm run dev
fi
