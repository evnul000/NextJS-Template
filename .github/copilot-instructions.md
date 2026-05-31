# FinanceHub - Development Guidelines (Updated v2.0)

## Project Overview

FinanceHub is a modern SaaS financial platform built with **Next.js 14 LTS**, TypeScript, Tailwind CSS, SCSS, and Shadcn UI components. The application provides comprehensive financial management and transaction tracking with a professional dashboard interface and clean architecture patterns.

## 🆕 Key Updates (v2.0)

✅ Upgraded to **Next.js 14 LTS** for stability and long-term support
✅ Implemented **Composer Pattern** for clean architecture
✅ Added **Centralized API Module** with organized routes
✅ Created **Type System** for financial entities
✅ Added **Service & Repository Layers** for business logic separation
✅ Included **Example Pages** for dashboard, auth, and settings
✅ Provided **Page Routes** structure

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.x LTS | Framework |
| TypeScript | Latest | Type safety |
| React | 18+ | UI library |
| Tailwind CSS | 4 | Utility-first styling |
| SCSS | Latest | Component-specific styles |
| Shadcn UI | Latest | UI component library |
| ESLint | Latest | Code quality |

## Project Structure

```
src/
├── composer/                    # ⭐ NEW: Business Logic Layer
│   ├── services/               # High-level business logic
│   │   ├── account.service.ts
│   │   └── transaction.service.ts
│   ├── repositories/           # Data access layer
│   │   ├── account.repository.ts
│   │   └── transaction.repository.ts
│   └── index.ts               # Central exports
├── types/                       # ⭐ NEW: Type definitions
│   └── index.ts               # All types exported here
├── components/
│   ├── dashboard/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── stat-card.tsx
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/
│   └── utils.ts
└── styles/
    └── dashboard.scss

app/
├── api/                         # ⭐ NEW: Centralized API Module
│   ├── accounts/
│   │   ├── route.ts            # GET /api/accounts, POST /api/accounts
│   │   └── [id]/route.ts       # GET /api/accounts/:id
│   └── transactions/
│       ├── route.ts            # GET /api/transactions, POST /api/transactions
│       └── account/[accountId]/route.ts
├── dashboard/                   # ⭐ NEW: Dashboard Pages
│   ├── layout.tsx
│   └── page.tsx
├── auth/                        # ⭐ NEW: Auth Pages
│   ├── layout.tsx
│   └── page.tsx
├── settings/                    # ⭐ NEW: Settings Pages
│   ├── layout.tsx
│   └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx                     # Landing page
```

## Architecture: Composer Pattern

The template uses a **Composer Pattern** for clean separation of concerns:

### Layer 1: Services (`src/composer/services/`)

High-level business logic that coordinates operations:

```typescript
// AccountService: Business logic for account operations
export class AccountService {
  static async getTotalBalance(): Promise<number> {
    const accounts = await AccountRepository.getAllAccounts();
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }
}
```

### Layer 2: Repositories (`src/composer/repositories/`)

Data access layer - handles all database/API calls:

```typescript
// AccountRepository: CRUD operations for accounts
export class AccountRepository {
  static async getAllAccounts(): Promise<Account[]> {
    // TODO: Replace with actual database query
    // return db.accounts.find();
  }
}
```

### Layer 3: Types (`src/types/`)

TypeScript interfaces for type safety:

```typescript
interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Module Structure

### Endpoints Overview

```
GET    /api/accounts                 # Get all accounts
POST   /api/accounts                 # Create account
GET    /api/accounts/:id             # Get specific account

GET    /api/transactions             # Get all transactions
POST   /api/transactions             # Create transaction
GET    /api/transactions/account/:id # Get account transactions
```

### API Response Format

All endpoints return consistent format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### Example API Route

```typescript
// app/api/accounts/route.ts
import { AccountService } from "@/composer/services/account.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await AccountService.getAccountsWithStats();
    return NextResponse.json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch accounts",
    }, { status: 500 });
  }
}
```

## Page Routes

### Dashboard (`/dashboard`)

Main application dashboard with:
- Account overview
- Transaction list
- Financial statistics
- Account cards with balances

### Authentication (`/auth`)

Login page template with:
- Email/password form
- Sign-in logic placeholder
- Styling ready for customization

### Settings (`/settings`)

User settings page with:
- Profile management
- Security settings
- Notification preferences
- Billing information

## Development Setup

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

### Linting
```bash
npm run lint
```

## Code Style & Standards

### TypeScript
- **Strict Mode**: Enabled
- **Path Aliases**: Use `@/` for imports (e.g., `@/composer/services/account.service`)
- **Types**: Always define proper interfaces for props
- **File Naming**: Use kebab-case for files (e.g., `account-service.ts` or `account.service.ts`)

### Component Guidelines

#### Structure
```tsx
"use client"  // Mark as client component if needed

import { ComponentType } from "@/components/ui/component"
import type { MyComponentProps } from "@/types"

interface Props extends MyComponentProps {
  // Additional props
}

export function Component({ ...props }: Props) {
  return (
    // JSX
  )
}
```

#### Component Organization
- Place dashboard components in `src/components/dashboard/`
- Place reusable UI components in `src/components/ui/`
- Use TypeScript interfaces for all props
- Always include JSDoc comments for complex logic

### Service Guidelines

```typescript
/**
 * AccountService
 * Handles all business logic for account operations
 */
export class AccountService {
  /**
   * Get accounts with statistics
   */
  static async getAccountsWithStats(): Promise<Account[]> {
    // Implementation
  }
}
```

### Styling

#### Tailwind CSS
- Use utility classes for all styling
- Follow mobile-first responsive design (sm:, md:, lg:)
- Use color variables from theme
- Avoid inline styles

#### SCSS
- Use for component-specific complex styles
- Follow BEM naming convention
- Define variables and mixins at the top
- Keep SCSS modules in `src/styles/`

#### Class Utilities
- Use the `cn()` utility function to merge Tailwind classes
- Located in `@/lib/utils`

## Naming Conventions

### Files
- Components: `component-name.tsx`
- Services: `service-name.service.ts`
- Repositories: `repository-name.repository.ts`
- Styles: `component-name.scss`
- Utils: `utils.ts`
- Types: `index.ts` or `entity.types.ts`

### Code Entities
- React components: PascalCase (`StatCard`, `DashboardHeader`)
- Service classes: PascalCase (`AccountService`)
- Repository classes: PascalCase (`AccountRepository`)
- Interfaces: PascalCase with descriptive names (`Account`, `Transaction`)
- HTML elements: camelCase
- CSS classes: kebab-case (`stat-card`, `dashboard-header`)

### Variables & Functions
- Constants: UPPER_SNAKE_CASE
- Functions: camelCase
- Interfaces: PascalCase with `Props` suffix for component props (`StatCardProps`)

## Git Workflow

### Branch Naming
- Feature: `feature/brief-description`
- Bug fix: `fix/brief-description`
- Docs: `docs/brief-description`

### Commit Messages
- Format: `[type] description`
- Types: feat, fix, docs, style, refactor, perf, test
- Example: `[feat] add transaction filter component`

## Common Tasks

### Adding a New Service

1. Create file in `src/composer/services/feature.service.ts`
2. Define service class with static methods
3. Import repositories as needed
4. Export from `src/composer/index.ts`
5. Use in API routes or components

### Adding a New Repository

1. Create file in `src/composer/repositories/feature.repository.ts`
2. Define repository class with CRUD methods
3. Add mock data or database query placeholders
4. Export from `src/composer/index.ts`
5. Use in services

### Adding a New API Route

1. Create route file: `app/api/feature/route.ts`
2. Import service: `import { FeatureService } from "@/composer/services/feature.service"`
3. Define GET/POST handlers
4. Use service for business logic
5. Return `ApiResponse<T>` format
6. Add error handling

### Adding a New Page

1. Create folder in `app/feature/`
2. Add `layout.tsx` for metadata and layout
3. Add `page.tsx` for page content
4. Use services for data fetching
5. Build UI with components

### Adding a New Component
1. Create file in appropriate directory (`src/components/`)
2. Define TypeScript interface for props
3. Implement component with TypeScript
4. Export component from component file
5. Import and use in pages

### Adding a New Type

1. Add to `src/types/index.ts` or create `src/types/entity.types.ts`
2. Export from `src/types/index.ts`
3. Use in components, services, and repositories
4. Keep types close to where they're used

## Performance & Best Practices

### Next.js Optimization
- Use dynamic imports for heavy components
- Implement proper image optimization
- Leverage React Server Components where possible
- Use Next.js built-in optimizations

### Architecture Best Practices
- **Separation of Concerns**: Services handle logic, repositories handle data
- **DRY Principle**: Extract reusable services
- **Type Safety**: Use TypeScript strictly
- **Error Handling**: Implement try-catch in services and API routes

### Component Best Practices
- Memoize components when needed (`React.memo`)
- Keep components focused and single-responsibility
- Pass minimal props to avoid unnecessary re-renders
- Use proper TypeScript types

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with accessibility tools

## Testing & QA

### Before Committing
1. Run `npm run lint` to check code quality
2. Test in development server
3. Check responsive design (mobile, tablet, desktop)
4. Verify TypeScript compilation has no errors
5. Test API endpoints with curl or Postman

### Building & Deployment
```bash
# Test production build locally
npm run build
npm start
```

## Useful Commands Quick Reference

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Run production server
npm run lint      # Check code quality
npm install       # Install dependencies
```

## VS Code Extensions (Recommended)

- ESLint (dbaeumer.vscode-eslint)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- TypeScript Vue Plugin (Vue.vscode-typescript-vue-plugin)
- Prettier (esbenp.prettier-vscode)

## Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

### Import Errors
- Verify path aliases in `tsconfig.json`
- Check file names and extensions
- Ensure `@/*` is properly configured

### Styling Issues
- Clear Tailwind cache
- Check for conflicting Tailwind classes
- Verify PostCSS configuration

### API Issues
- Check fetch endpoints match route definitions
- Verify service/repository methods exist
- Check error logs in console
- Test endpoints with curl: `curl http://localhost:3000/api/accounts`

## Migration from v1.0

If upgrading from v1.0:

1. **Update Dependencies**: Run `npm install` to get Next.js 14
2. **New Folder Structure**: Create `src/composer/` directories
3. **Move Logic**: Move business logic to services
4. **Update Imports**: Change imports to use new paths
5. **Test Everything**: Run full test suite

## Additional Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Next.js 14 LTS Announcement](https://nextjs.org/blog/next-14)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [React Best Practices](https://react.dev/learn)

## Support & Questions

For questions about development practices or the codebase, refer to:
1. TEMPLATE_DOCUMENTATION.md - Complete reference
2. QUICK_START_UPDATED.md - Getting started guide
3. README.md - Project overview
4. Code comments and JSDoc
5. Team documentation

---

**Last Updated**: May 31, 2026
**Version**: 2.0.0
**Next.js Version**: 14.x LTS
**Status**: Ready for Production

