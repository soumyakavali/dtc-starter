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

RUN chmod +x start.sh

EXPOSE 9000

ENV NODE_ENV=development
ENV PORT=9000

CMD ["./start.sh"]
