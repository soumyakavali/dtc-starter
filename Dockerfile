# =============================================================================
# BIOTILL AGRI - Next.js 15 Storefront Root Dockerfile
# Context: Root Monorepo Directory
# =============================================================================

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
WORKDIR /app/apps/storefront
COPY apps/storefront/package.json apps/storefront/package-lock.json* ./
RUN npm install

FROM base AS builder
WORKDIR /app/apps/storefront
COPY --from=deps /app/apps/storefront/node_modules ./node_modules
COPY apps/storefront ./

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
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/storefront/public ./public
COPY --from=builder /app/apps/storefront/package.json ./package.json
COPY --from=builder /app/apps/storefront/node_modules ./node_modules
COPY --from=builder /app/apps/storefront/.next ./.next
COPY --from=builder /app/apps/storefront/next.config.js ./next.config.js
COPY --from=builder /app/apps/storefront/check-env-variables.js ./check-env-variables.js

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
