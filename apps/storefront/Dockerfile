# =============================================================================
# BIOTILL AGRI - Next.js 15 Storefront Dockerfile (Production Multi-Stage Build)
# =============================================================================

# 1. Base Stage
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 2. Dependencies Stage
FROM base AS deps
WORKDIR /app
COPY package.json turbo.json package-lock.json* ./
COPY apps/storefront/package.json ./apps/storefront/
COPY apps/backend/package.json* ./apps/backend/
RUN npm install

# 3. Builder Stage
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json turbo.json ./
COPY apps/storefront ./apps/storefront

# Build-time environment variables
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=""
ARG NEXT_PUBLIC_BASE_URL=http://localhost:3000
ARG NEXT_PUBLIC_DEFAULT_REGION=in
ARG MEDUSA_BACKEND_URL=http://localhost:9000

ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=${NEXT_PUBLIC_MEDUSA_BACKEND_URL}
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_DEFAULT_REGION=${NEXT_PUBLIC_DEFAULT_REGION}
ENV MEDUSA_BACKEND_URL=${MEDUSA_BACKEND_URL}
ENV NODE_ENV=production

WORKDIR /app/apps/storefront
RUN npm run build

# 4. Production Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Non-root security user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy dependencies and build artifacts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/storefront/package.json ./apps/storefront/package.json
COPY --from=builder /app/apps/storefront/public ./apps/storefront/public
COPY --from=builder /app/apps/storefront/.next ./apps/storefront/.next
COPY --from=builder /app/apps/storefront/next.config.js ./apps/storefront/next.config.js
COPY --from=builder /app/apps/storefront/check-env-variables.js ./apps/storefront/check-env-variables.js

USER nextjs

WORKDIR /app/apps/storefront

EXPOSE 3000

CMD ["npm", "run", "start"]
