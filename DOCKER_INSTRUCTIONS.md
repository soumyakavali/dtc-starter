# 🐳 Docker Setup & File Reference for BioTill Agri

If files without extensions (like `Dockerfile`) are filtered out during ZIP export, all Docker configurations are preserved in `.txt` files in this repository.

---

## 📁 Included Backup Files

| Original File Path | Backup `.txt` File Path | Rename Instruction |
|-------------------|-------------------------|--------------------|
| `apps/backend/Dockerfile` | `apps/backend/Dockerfile.txt` | Rename `Dockerfile.txt` $\to$ `Dockerfile` |
| `apps/storefront/Dockerfile` | `apps/storefront/Dockerfile.txt` | Rename `Dockerfile.txt` $\to$ `Dockerfile` |
| `docker-compose.yml` | `docker-compose.yml.txt` | Rename `docker-compose.yml.txt` $\to$ `docker-compose.yml` |

---

## 📄 File Contents Reference

### 1. `apps/backend/Dockerfile`
```dockerfile
FROM node:20-alpine AS base

# Install build dependencies
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy root workspace configurations
COPY package.json turbo.json package-lock.json* ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/storefront/package.json ./apps/storefront/

# Install dependencies
RUN npm install

# Copy source code
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

EXPOSE 9000

ENV NODE_ENV=development
ENV PORT=9000

CMD ["sh", "-c", "npx medusa db:migrate && npm run dev"]
```

---

### 2. `apps/storefront/Dockerfile`
```dockerfile
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy root workspace configurations
COPY package.json turbo.json package-lock.json* ./
COPY apps/storefront/package.json ./apps/storefront/
COPY apps/backend/package.json ./apps/backend/

# Install dependencies
RUN npm install

# Copy storefront source
COPY apps/storefront ./apps/storefront

WORKDIR /app/apps/storefront

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "dev"]
```

---

### 3. `docker-compose.yml`
```yaml
networks:
  biotill-net:
    driver: bridge

services:
  postgres:
    image: postgres:16-alpine
    container_name: biotill-postgres
    restart: unless-stopped
    networks:
      - biotill-net
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-medusa-biotill}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d medusa-biotill"]
      interval: 5s
      timeout: 5s
      retries: 10
      start_period: 5s

  redis:
    image: redis:7-alpine
    container_name: biotill-redis
    restart: unless-stopped
    networks:
      - biotill-net
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: .
      dockerfile: apps/backend/Dockerfile
    container_name: biotill-backend
    restart: unless-stopped
    networks:
      - biotill-net
    ports:
      - "9000:9000"
    environment:
      DATABASE_URL: postgres://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-postgres}@postgres:5432/${POSTGRES_DB:-medusa-biotill}?sslmode=disable
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET:-biotill_super_secure_jwt_secret_key_2026}
      COOKIE_SECRET: ${COOKIE_SECRET:-biotill_super_secure_cookie_secret_key_2026}
      STORE_CORS: http://localhost:3000,http://127.0.0.1:3000
      ADMIN_CORS: http://localhost:9000,http://localhost:7001,http://localhost:5173
      AUTH_CORS: http://localhost:3000,http://localhost:9000,http://127.0.0.1:3000
      PORT: 9000
      NODE_ENV: development
    command: sh -c "npx medusa db:migrate && npm run dev"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  storefront:
    build:
      context: .
      dockerfile: apps/storefront/Dockerfile
    container_name: biotill-storefront
    restart: unless-stopped
    networks:
      - biotill-net
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
      NEXT_PUBLIC_BASE_URL: http://localhost:3000
      MEDUSA_BACKEND_URL: http://backend:9000
      NEXT_PUBLIC_MEDUSA_BACKEND_URL: http://localhost:9000
      NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: ${NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY:-pk_01J_dummy_biotill_key}
      NEXT_PUBLIC_DEFAULT_REGION: in
      NODE_ENV: development
    depends_on:
      - backend

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
```

---

## 🚀 Quick Execution
```bash
# 1. Start all containers
docker compose up --build

# 2. In a separate terminal, seed products and Karnataka region:
docker compose exec backend npm run seed
```
