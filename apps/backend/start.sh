#!/bin/sh
set -e

echo "========================================================"
echo "🌾 Starting BIOTILL AGRI PRIVATE LIMITED Backend"
echo "========================================================"

echo "⏳ 1. Checking Database Connectivity..."
node ./src/scripts/wait-for-db.js || sleep 3

echo "📦 2. Running Database Migrations..."
npx medusa db:migrate

echo "🌱 3. Auto-Seeding BioTill 10 Bio-Products & Karnataka Region..."
npx medusa exec ./src/migration-scripts/initial-data-seed.ts || echo "⚠️ Seed already applied or completed."

echo "👤 4. Ensuring Admin User (admin@biotill.in)..."
npx medusa user -e admin@biotill.in -p supersecret || echo "⚠️ Admin user already configured."

echo "🚀 5. Launching Medusa Backend Development Server on Port 9000..."
exec npm run dev
