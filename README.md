# 🚀 FinanceHub — Enterprise SaaS Template

A production-ready financial SaaS template built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, **SCSS**, **Shadcn UI**, and **Clerk Authentication**.

Designed as a scalable foundation for modern SaaS applications with a centralized API layer, Composer architecture, Docker deployment, testing, linting, and CI-ready workflows.

---

## ✨ Features

- ⚡ Next.js 16 App Router
- ⚛️ React 19
- 📘 TypeScript
- 🎨 Tailwind CSS 4
- 🎯 SCSS Support
- 🧩 Shadcn UI Components
- 🔐 Clerk Authentication
- 🌐 Centralized API Module
- 🏗️ Composer Architecture
- 🐳 Docker Deployment
- 🧪 Jest Testing
- 🧹 ESLint & Prettier
- 🚀 CI/CD Ready

---

## 🏛️ Architecture

```text
Browser / React Component
            ↓
Centralized API Module
(src/lib/api-client.ts)
            ↓
Next.js API Routes
(app/api/)
            ↓
Services Layer
(src/composer/services/)
            ↓
Repositories Layer
(src/composer/repositories/)
            ↓
Database / External APIs
```

---

## 📁 Project Structure

```text
app/
src/
public/
Dockerfile
docker-compose.yml
jest.config.js
tsconfig.json
```

---

## 🔐 Authentication

Authentication is powered by Clerk.

Environment Variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🐳 Docker

```bash
docker build -t financehub:latest .
docker-compose up -d
```

---

## 🧪 Testing

```bash
npm test
npm run test:coverage
```

---

## 📦 Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- SCSS
- Shadcn UI
- Clerk
- Docker
- Jest

---

## 🗺️ Roadmap

- 💳 Stripe Billing
- 🗄️ PostgreSQL + Prisma
- 👥 RBAC
- 📊 Audit Logs
- 🎭 Playwright E2E Tests
- 🔄 GitHub Actions

---

## 📄 License

MIT License
