# FinanceHub - Next.js 14 LTS Template

A modern, production-ready SaaS financial platform template built with **Next.js 14 LTS**, TypeScript, React 18+, Tailwind CSS, and Shadcn UI.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Running Development Server

```bash
npm run dev
```

Navigate to http://localhost:3000

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
FinanceHub/
├── app/                              # Next.js App Router
│   ├── api/                          # API Routes
│   │   ├── accounts/                 # Account endpoints
│   │   │   ├── route.ts              # GET /api/accounts, POST /api/accounts
│   │   │   └── [id]/route.ts         # GET /api/accounts/:id
│   │   └── transactions/             # Transaction endpoints
│   │       ├── route.ts              # GET /api/transactions, POST /api/transactions
│   │       └── account/[accountId]/route.ts
│   ├── dashboard/                    # Dashboard pages
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Main dashboard
│   ├── auth/                         # Authentication pages
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Login page
│   ├── settings/                     # Settings pages
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Settings page
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Global styles
│   └── page.tsx                      # Home page
│
├── src/
│   ├── composer/                     # Business Logic Layer
│   │   ├── services/                 # Business logic services
│   │   │   ├── account.service.ts
│   │   │   └── transaction.service.ts
│   │   ├── repositories/             # Data access layer
│   │   │   ├── account.repository.ts
│   │   │   └── transaction.repository.ts
│   │   └── index.ts                  # Central exports
│   │
│   ├── components/
│   │   ├── dashboard/                # Dashboard components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── stat-card.tsx
│   │   └── ui/                       # Reusable UI components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   │
│   ├── types/                        # TypeScript type definitions
│   │   └── index.ts                  # All types exported here
│   │
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   │
│   └── styles/
│       └── dashboard.scss            # Custom SCSS styles
│
├── public/                           # Static files
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

## 🏗️ Architecture Overview

### **Composer Pattern** (Business Logic Layer)

The template uses a **Composer Pattern** for clean separation of concerns:

- **Services** (`src/composer/services/`): High-level business logic
  - `AccountService`: Manages account operations
  - `TransactionService`: Manages transactions and financial calculations

- **Repositories** (`src/composer/repositories/`): Data access layer
  - `AccountRepository`: CRUD operations for accounts
  - `TransactionRepository`: CRUD operations for transactions

### **API Routes** (Server-Side)

RESTful API endpoints organized by resource:

```
GET    /api/accounts                    # Get all accounts
POST   /api/accounts                    # Create account
GET    /api/accounts/:id                # Get specific account

GET    /api/transactions                # Get all transactions
POST   /api/transactions                # Create transaction
GET    /api/transactions/account/:id    # Get account transactions
```

### **Page Routes** (Client-Side)

Organized by feature:

- `/` - Landing page
- `/dashboard` - Main dashboard with overview
- `/auth` - Login page
- `/settings` - User settings and preferences

## 🧩 Core Types

All types are defined in `src/types/index.ts`:

```typescript
interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Transaction {
  id: string;
  accountId: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  description: string;
  category: string;
  date: Date;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.x (LTS) | React framework |
| React | 18+ | UI library |
| TypeScript | Latest | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| SCSS | Latest | Component-specific styles |
| Shadcn UI | Latest | Pre-built UI components |
| Node.js | 18+ | Runtime |

## 📝 Code Standards

### TypeScript Configuration

- **Strict Mode**: Enabled
- **Module Resolution**: Bundler
- **Path Aliases**: `@/*` points to `src/`

### File Naming

- Components: `component-name.tsx` (PascalCase)
- Services: `service-name.service.ts` (kebab-case)
- Repositories: `repository-name.repository.ts` (kebab-case)
- Types: `types.ts` or `domain.types.ts`

### Component Pattern

```tsx
"use client"; // Mark as client component if needed

import type { ComponentProps } from "@/types";

interface Props {
  // Props interface
}

export function Component({ ...props }: Props) {
  // Component implementation
  return <div>Component</div>;
}
```

## 🔌 Working with the Composer Layer

### Using Services in API Routes

```typescript
// app/api/accounts/route.ts
import { AccountService } from "@/composer/services/account.service";

export async function GET() {
  const accounts = await AccountService.getAccountsWithStats();
  return Response.json({ success: true, data: accounts });
}
```

### Using Services in Components

```typescript
// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { AccountService } from "@/composer/services/account.service";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    AccountService.getAccountsWithStats().then(setAccounts);
  }, []);

  // Component JSX...
}
```

## 📚 Common Tasks

### Adding a New Service

1. Create `src/composer/services/feature.service.ts`
2. Define service class with static methods
3. Export from `src/composer/index.ts`

### Adding a New Repository

1. Create `src/composer/repositories/feature.repository.ts`
2. Implement CRUD operations
3. Export from `src/composer/index.ts`

### Adding API Endpoints

1. Create route file: `app/api/resource/route.ts`
2. Export GET, POST handlers
3. Use services for business logic
4. Return `ApiResponse<T>` format

### Adding a New Page

1. Create directory: `app/feature/`
2. Add `layout.tsx` and `page.tsx`
3. Use service layer for data fetching
4. Build UI with components

## 🔄 Data Flow

```
UI Components
    ↓
API Routes (/api/*)
    ↓
Services (Composer Layer)
    ↓
Repositories (Data Access)
    ↓
Data Source (Database/Mock)
```

## 🚀 Deployment

### Environment Setup

Create `.env.local`:

```bash
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

### Build & Deploy

```bash
# Production build
npm run build

# Test production locally
npm start

# Deploy to Vercel (recommended)
vercel deploy
```

## 📖 API Response Format

All API responses follow a consistent format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

Example:

```json
{
  "success": true,
  "data": [
    {
      "id": "acc_001",
      "name": "Checking Account",
      "balance": 5000
    }
  ],
  "message": "Accounts retrieved successfully"
}
```

## 🔐 Security Considerations

- [ ] Implement authentication (JWT, OAuth2, etc.)
- [ ] Add request validation and sanitization
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Use environment variables for secrets
- [ ] Implement proper error handling
- [ ] Add input validation schemas (Zod, Yup)

## 📊 Next Steps

1. **Database Integration**: Replace mock repositories with real database queries
2. **Authentication**: Implement user authentication
3. **API Documentation**: Generate API docs with OpenAPI/Swagger
4. **Testing**: Add unit and integration tests
5. **State Management**: Consider Redux or Zustand for complex state
6. **Error Handling**: Implement comprehensive error boundaries
7. **Logging**: Add structured logging (Pino, Winston)
8. **Monitoring**: Set up monitoring and analytics

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Use consistent naming conventions
3. Write JSDoc comments for functions
4. Test changes locally before committing
5. Use meaningful commit messages

## 📄 License

This template is provided as-is for use in your projects.

---

**Last Updated**: May 31, 2026
**Template Version**: 1.0.0
**Next.js Version**: 14.x LTS
