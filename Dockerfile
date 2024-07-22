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

ARG TRACK_OWNER_PKEY
ARG OASIS_CONTRACT_ADDRESS
ARG NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS
ARG NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN
ARG NEXT_PUBLIC_THIRDWEB_CLIENT_ID
ARG THIRDWEB_SECRET_KEY
ARG THIRDWEB_ADMIN_PRIVATE_KEY
ARG DATABASE_URL
ARG RESEND_API_KEY
ARG UMAMI_WEBSITE_ID

ENV TRACK_OWNER_PKEY=${TRACK_OWNER_PKEY}
ENV OASIS_CONTRACT_ADDRESS=${OASIS_CONTRACT_ADDRESS}
ENV NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS=${NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS}
ENV NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=${NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN}
ENV NEXT_PUBLIC_THIRDWEB_CLIENT_ID=${NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
ENV THIRDWEB_SECRET_KEY=${THIRDWEB_SECRET_KEY}
ENV THIRDWEB_ADMIN_PRIVATE_KEY=${THIRDWEB_ADMIN_PRIVATE_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV UMAMI_WEBSITE_ID=${UMAMI_WEBSITE_ID}

ENV IS_DOCKER=true

RUN npm run build -- --no-lint

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ARG PORT=3000
ENV PORT=$PORT
ENV SKIP_ENV_VALIDATION=true

EXPOSE $PORT

CMD node server.js
