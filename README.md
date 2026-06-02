# FinanceHub — Next.js 14 LTS SaaS Template

<<<<<<< HEAD
A production-ready financial SaaS template built with **Next.js 14 LTS**, TypeScript, Tailwind CSS, SCSS, and Shadcn UI.
=======
A modern, full-featured financial SaaS application built with Next.js 15+ LTS, TypeScript, Tailwind CSS, SCSS, and Shadcn UI components. Designed for managing financial facilities with a professional dashboard interface.
>>>>>>> 841d2c0fda65303e2009828c5ea583725894cdfa

---

## Architecture Overview

```
app/                     ← Next.js App Router (pages + API routes)
  api/                   ← All REST endpoints
    accounts/            ← CRUD for accounts
    transactions/        ← CRUD for transactions
    health/              ← Docker/k8s health check
src/
  lib/
    api-client.ts        ← Centralized API Module (use this everywhere)
  composer/              ← Business logic layer
    services/            ← High-level domain operations
    repositories/        ← Data access (swap mock → DB here)
  types/                 ← Shared TypeScript interfaces
  components/
    ui/                  ← Reusable UI primitives
    dashboard/           ← Dashboard-specific components
  styles/                ← SCSS + global CSS
```

<<<<<<< HEAD
### Layer diagram

```
Browser / Page Component
        ↓
  API  (src/lib/api-client.ts)   ← Single interface, like Clerk
        ↓
  Next.js API Route  (app/api/)
        ↓
  Service  (src/composer/services/)
        ↓
  Repository  (src/composer/repositories/)
        ↓
  Database / External API  (swap mock data here)
```

---

## Centralized API Module

All API calls go through **`src/lib/api-client.ts`** — a single typed interface, similar to how Clerk exposes its SDK.

```ts
import { API } from "@/lib/api-client"

// Accounts
const { data } = await API.accounts.getAll()
const account   = await API.accounts.getById("acc_001")
const created   = await API.accounts.create({ name: "Savings", type: "savings" })
await API.accounts.update("acc_001", { balance: 9000 })
await API.accounts.delete("acc_001")

// Transactions
const txs = await API.transactions.getAll()
const acc = await API.transactions.getByAccountId("acc_001")

// Dashboard
const stats = await API.dashboard.getStats()
```

Every call returns `ApiResponse<T>`:
```ts
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  statusCode?: number
}
```

---

## Getting Started

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local
# edit .env.local

# 3. Develop
npm run dev          # → http://localhost:3000
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier format |
| `npm run type-check` | TypeScript check (`tsc --noEmit`) |
| `npm test` | Jest unit tests |
| `npm run test:watch` | Jest watch mode |
| `npm run test:coverage` | Jest with coverage report |
| `npm run test:ci` | CI-optimised test run |
| `npm run validate` | lint + type-check + test + build |
| `npm run docker:up` | Start with Docker Compose |
| `npm run docker:build` | Build Docker image |

---

## Docker Deployment

The Dockerfile uses a **4-stage build** that enforces quality gates:

```
Stage 1 (deps)      — npm ci (all deps)
Stage 2 (validate)  — lint + type-check + tests must pass ✓
Stage 3 (builder)   — next build
Stage 4 (runner)    — minimal production image
```

```bash
# Build & run locally
docker-compose up -d

# Or manually
docker build -t financehub:latest .
docker run -p 3000:3000 --env-file .env.local financehub:latest
```

Health check endpoint: `GET /api/health`

---

## Composer Pattern

The Composer directory is your business logic layer. It is intentionally kept **framework-agnostic** — no Next.js imports, pure TypeScript.

### Adding a new domain (e.g. Invoices)

1. Create `src/composer/repositories/invoice.repository.ts`  
2. Create `src/composer/services/invoice.service.ts`  
3. Create `src/composer/services/invoice.service.test.ts`  
4. Export both from `src/composer/index.ts`  
5. Add API routes in `app/api/invoices/`  
6. Add to `API` object in `src/lib/api-client.ts`

### Connecting a real database

Replace the mock arrays in `src/composer/repositories/*.repository.ts` with your ORM calls:

```ts
// Before (mock)
return mockAccounts.find(a => a.id === id) ?? null

// After (Prisma example)
return db.account.findUnique({ where: { id } })
```

---

## Testing

Tests live alongside the source files (`*.test.ts` / `*.test.tsx`).

```bash
npm test                 # run all tests
npm run test:coverage    # with HTML coverage report (open coverage/index.html)
```

### Test patterns included

| File | Pattern |
|---|---|
| `src/lib/api-client.test.ts` | HTTP mock (jest.fn on fetch), tests all resource modules |
| `src/composer/services/account.service.test.ts` | Repository mock, tests service logic in isolation |
| `src/composer/services/transaction.service.test.ts` | Same pattern for transactions |
| `src/components/ui/button.test.tsx` | React component rendering + interactions |

---

## Linting & Formatting

```bash
npm run lint        # ESLint
npm run lint:fix    # ESLint + auto-fix
npm run format      # Prettier
npm run format:check
```

Rules defined in `.eslintrc.json` and `.prettierrc`.

---
=======
- **Framework**: [Next.js 15+](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [SCSS](https://sass-lang.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Package Manager**: npm
- **Development Server**: Hot module reloading enabled
>>>>>>> 841d2c0fda65303e2009828c5ea583725894cdfa

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── accounts/           GET, POST, PATCH, DELETE
│   │   ├── transactions/       GET, POST
│   │   └── health/             GET (health check)
│   ├── dashboard/
│   ├── accounts/
│   ├── transactions/
│   ├── reports/
│   ├── settings/
│   └── auth/
├── src/
│   ├── lib/
│   │   ├── api-client.ts       ← Centralized API Module
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts            ← All shared types
│   ├── composer/
│   │   ├── index.ts
│   │   ├── services/
│   │   └── repositories/
│   ├── components/
│   │   ├── ui/
│   │   └── dashboard/
│   └── styles/
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── jest.setup.js
├── Dockerfile                  ← 4-stage build
├── docker-compose.yml
└── tsconfig.json
```

---

## Deployment

### Vercel (recommended)

Push to GitHub → import in Vercel → deploy. No config needed.

### Docker / any Node.js host

```bash
docker-compose up -d
```

See `Dockerfile` for full multi-stage build with lint/test gates.

---

## Roadmap / TODO

- [ ] Replace mock repository data with a real database (Prisma + PostgreSQL recommended)
- [ ] Add authentication (Clerk or NextAuth)
- [ ] Add Stripe subscriptions
- [ ] Add end-to-end tests (Playwright)
- [ ] Add CI/CD pipeline (GitHub Actions)
