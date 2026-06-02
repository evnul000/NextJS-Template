# ─── Stage 1: Install dependencies ────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
# Install ALL deps so the build stage has access to devDeps (tsc, etc.)
RUN npm ci

# ─── Stage 2: Run linting, type-checking, and tests ───────────────────────────
FROM deps AS validate
WORKDIR /app
COPY . .
RUN npm run lint
RUN npm run type-check
RUN npm run test:ci

# ─── Stage 3: Build the Next.js app ───────────────────────────────────────────
FROM validate AS builder
WORKDIR /app
RUN npm run build

# ─── Stage 4: Production image ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
