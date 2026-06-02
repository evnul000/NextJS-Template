# Getting Started with FinanceHub SaaS Template v2.0

Welcome! This is a production-ready SaaS template built with Next.js 14 LTS. Follow these steps to get up and running.

## 🚀 5-Minute Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Explore the Template

- **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Accounts**: [http://localhost:3000/accounts](http://localhost:3000/accounts)
- **Transactions**: [http://localhost:3000/transactions](http://localhost:3000/transactions)
- **Reports**: [http://localhost:3000/reports](http://localhost:3000/reports)

## 📋 What's Included

### ✅ Ready-to-Use Pages
- **Dashboard** - Financial overview with stats
- **Accounts** - Manage multiple accounts
- **Transactions** - Track and filter transactions
- **Reports** - Analytics and insights
- **Auth** - Login page template
- **Settings** - User preferences

### ✅ Professional Features
- Centralized API client (`API.accounts.getAll()`)
- TypeScript with strict mode
- ESLint code quality
- Jest unit testing
- Docker deployment ready
- GitHub Actions CI/CD

### ✅ Developer Tools
- `npm run lint` - Check code quality
- `npm run type-check` - Validate TypeScript
- `npm test` - Run tests
- `npm run build` - Production build
- `npm run docker:build` - Build Docker image

## 🔧 Development Setup

### Using the API Client

All components should use the centralized API client:

```typescript
"use client"
import { API } from "@/lib/api-client";
import { useEffect, useState } from "react";

export function AccountsList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await API.accounts.getAll();
      if (response.success) {
        setAccounts(response.data);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <div>
      {accounts.map(account => (
        <div key={account.id}>{account.name}</div>
      ))}
    </div>
  );
}
```

### Adding New Features

**1. Create a Service** (`src/composer/services/new-feature.service.ts`)
```typescript
export class NewFeatureService {
  static async doSomething() {
    // Business logic here
  }
}
```

**2. Create a Repository** (`src/composer/repositories/new-feature.repository.ts`)
```typescript
export class NewFeatureRepository {
  static async fetchData() {
    // Data access here
  }
}
```

**3. Add API Route** (`app/api/new-feature/route.ts`)
```typescript
import { NewFeatureService } from "@/composer/services/new-feature.service";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await NewFeatureService.doSomething();
  return NextResponse.json({ success: true, data });
}
```

**4. Use in Component**
```typescript
const response = await API.newFeature.fetch();
```

## 🐳 Docker Deployment

### Build Docker Image
```bash
npm run docker:build
```

### Run with Docker Compose
```bash
docker-compose up
```

This starts:
- Next.js app on http://localhost:3000
- PostgreSQL database on localhost:5432

### Environment Variables
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

## 📝 Project Structure

```
src/
├── composer/              # Business logic
│   ├── services/         # High-level operations
│   └── repositories/     # Data access layer
├── types/                # TypeScript interfaces
├── components/           # React components
├── lib/
│   ├── api-client.ts    # Centralized API module
│   └── utils.ts
└── styles/              # SCSS stylesheets

app/
├── api/                 # REST API routes
├── dashboard/           # Page routes
├── accounts/
├── transactions/
├── reports/
└── layout.tsx
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Writing Tests

Example: `src/components/my-component.test.tsx`
```typescript
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./my-component";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

## 🔍 Code Quality

### Lint Code
```bash
npm run lint
```

### Auto-Fix Issues
```bash
npm run lint:fix
```

### Type Check
```bash
npm run type-check
```

### Full Validation
```bash
npm run validate
```

Runs: lint → type-check → build (all in sequence)

## 📦 Production Build

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```bash
npm run docker:build
docker run -p 3000:3000 financehub:latest
```

### Traditional Hosting
```bash
npm run build
npm start
```

## 📚 API Routes Reference

### Accounts
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create account
- `GET /api/accounts/:id` - Get specific account

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/account/:id` - Get account transactions

## 🔑 Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://...
NEXT_PUBLIC_AUTH_PROVIDER=clerk
AUTH_SECRET=...
```

See `.env.example` for all available variables.

## 🆘 Troubleshooting

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Type Errors
```bash
npm run type-check
```

### Test Failures
```bash
npm run test:coverage
```

## 📖 Learning Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Next Steps

1. ✅ Template is ready
2. Replace mock data with real database (Supabase, PostgreSQL, etc.)
3. Add authentication (Clerk, NextAuth, etc.)
4. Customize pages and components
5. Add more features using the template pattern
6. Deploy to production

## 📞 Support

- Check [README.md](README.md) for architecture details
- Review example implementations in `app/` folder
- Check test files for usage patterns
- See [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md) for full feature list

---

**Happy coding! 🚀**

For detailed information, see the main [README.md](README.md) and check [.github/copilot-instructions.md](.github/copilot-instructions.md) for development guidelines.
