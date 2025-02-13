# 1. Install dependencies only when needed
FROM oven/bun:latest AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lockb ./
RUN bun i --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM node:20.14.0-alpine AS base

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Combine ARG declarations
ARG TRACK_OWNER_PKEY \
  OASIS_CONTRACT_ADDRESS \
  NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS \
  NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID \
  DYNAMIC_ENVIRONMENT_ID \
  DYNAMIC_API_BASE_URL \
  DATABASE_URL \
  RESEND_API_KEY \
  UMAMI_WEBSITE_ID

# Set all ENVs in one command
ENV TRACK_OWNER_PKEY=${TRACK_OWNER_PKEY} \
  OASIS_CONTRACT_ADDRESS=${OASIS_CONTRACT_ADDRESS} \
  NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS=${NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS} \
  NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=${NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID} \
  DYNAMIC_ENVIRONMENT_ID=${DYNAMIC_ENVIRONMENT_ID} \
  DYNAMIC_API_BASE_URL=${DYNAMIC_API_BASE_URL} \
  DATABASE_URL=${DATABASE_URL} \
  RESEND_API_KEY=${RESEND_API_KEY} \
  UMAMI_WEBSITE_ID=${UMAMI_WEBSITE_ID} \
  IS_DOCKER=true

RUN npm run build -- --no-lint

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  SKIP_ENV_VALIDATION=true

RUN addgroup -g 1001 -S nodejs && \
  adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ARG PORT=3000
ENV PORT=$PORT

EXPOSE $PORT

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD [ "wget", "-qO-", "http://localhost:$PORT/health" ]

CMD node server.js
