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
