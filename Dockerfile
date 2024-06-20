FROM imbios/bun-node:1-20.12-alpine AS base
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY . .

ENV IS_DOCKER true

RUN bun run build:next -- --no-lint
RUN bun run build:wss

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/ws-server.mjs ./.next/ws-server.mjs
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/package.json ./

CMD [ "bun", "docker" ]