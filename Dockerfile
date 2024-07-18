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

# Mount secrets and read environment variables from them
RUN --mount=type=secret,id=TRACK_OWNER_PKEY \
  --mount=type=secret,id=OASIS_CONTRACT_ADDRESS \
  --mount=type=secret,id=NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS \
  --mount=type=secret,id=NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN \
  --mount=type=secret,id=NEXT_PUBLIC_THIRDWEB_CLIENT_ID \
  --mount=type=secret,id=THIRDWEB_SECRET_KEY \
  --mount=type=secret,id=THIRDWEB_ADMIN_PRIVATE_KEY \
  --mount=type=secret,id=DATABASE_URL \
  --mount=type=secret,id=RESEND_API_KEY \
  --mount=type=secret,id=UMAMI_WEBSITE_ID \
  export TRACK_OWNER_PKEY=$(cat /run/secrets/TRACK_OWNER_PKEY) && \
  export OASIS_CONTRACT_ADDRESS=$(cat /run/secrets/OASIS_CONTRACT_ADDRESS) && \
  export NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS=$(cat /run/secrets/NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS) && \
  export NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=$(cat /run/secrets/NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN) && \
  export NEXT_PUBLIC_THIRDWEB_CLIENT_ID=$(cat /run/secrets/NEXT_PUBLIC_THIRDWEB_CLIENT_ID) && \
  export THIRDWEB_SECRET_KEY=$(cat /run/secrets/THIRDWEB_SECRET_KEY) && \
  export THIRDWEB_ADMIN_PRIVATE_KEY=$(cat /run/secrets/THIRDWEB_ADMIN_PRIVATE_KEY) && \
  export DATABASE_URL=$(cat /run/secrets/DATABASE_URL) && \
  export RESEND_API_KEY=$(cat /run/secrets/RESEND_API_KEY) && \
  export UMAMI_WEBSITE_ID=$(cat /run/secrets/UMAMI_WEBSITE_ID) && \
  npm run build -- --no-lint

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD node server.js
