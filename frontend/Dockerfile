# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM base AS builder
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_MEDIA_BASE_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_MEDIA_BASE_URL=${NEXT_PUBLIC_MEDIA_BASE_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
