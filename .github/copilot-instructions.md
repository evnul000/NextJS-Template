# FinanceHub - Development Guidelines

## Project Overview

FinanceHub is a modern SaaS financial platform built with Next.js 14+, TypeScript, Tailwind CSS, SCSS, and Shadcn UI components. The application provides comprehensive financial management and transaction tracking capabilities with a professional dashboard interface.

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14+ | Framework |
| TypeScript | Latest | Type safety |
| React | 18+ | UI library |
| Tailwind CSS | 4 | Utility-first styling |
| SCSS | Latest | Component-specific styles |
| Shadcn UI | Latest | UI component library |
| ESLint | Latest | Code quality |

## Project Structure

```
src/
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── stat-card.tsx
│   └── ui/               # Reusable UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/
│   └── utils.ts          # Utility functions
├── styles/
│   └── dashboard.scss    # Custom SCSS styles
└── types/                # TypeScript type definitions (to be added)

app/
├── globals.css           # Global Tailwind styles
├── layout.tsx            # Root layout
└── page.tsx              # Dashboard page
```

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
- **Path Aliases**: Use `@/` for imports (e.g., `@/components/ui/button`)
- **Types**: Always define proper interfaces for props
- **File Naming**: Use kebab-case for files (e.g., `stat-card.tsx`)

### Component Guidelines

#### Structure
```tsx
"use client"  // Mark as client component if needed

import { cn } from "@/lib/utils"
import { ComponentType } from "@/components/ui/component"

interface ComponentProps {
  // Define props
}

export function Component({ ...props }: ComponentProps) {
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
- Example: `cn("px-2 py-1", className)`

## Naming Conventions

### Files
- Components: `component-name.tsx`
- Styles: `component-name.scss`
- Utils: `utils.ts`
- Types: `types.ts`

### Components
- React components: PascalCase (`StatCard`, `DashboardHeader`)
- HTML elements: camelCase
- CSS classes: kebab-case (`stat-card`, `dashboard-header`)

### Variables & Functions
- Constants: UPPER_SNAKE_CASE
- Functions: camelCase
- Interfaces: PascalCase with `Props` suffix (`StatCardProps`)

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

### Adding a New Component
1. Create file in appropriate directory (`src/components/`)
2. Define TypeScript interface for props
3. Implement component with TypeScript
4. Export component from index if needed
5. Import and use in pages

### Adding a New Page
1. Create folder in `app/`
2. Add `page.tsx` for the route
3. Create layout if needed
4. Add TypeScript interfaces for data

### Updating Styles
1. Use Tailwind classes first
2. If complex styling needed, add to `src/styles/dashboard.scss`
3. Follow BEM convention in SCSS
4. Test responsive behavior

### Adding Dependencies
```bash
npm install package-name
npm install -D dev-package-name  # For dev dependencies
```

## Performance & Best Practices

### Next.js Optimization
- Use dynamic imports for heavy components
- Implement proper image optimization
- Leverage React Server Components where possible
- Use Next.js built-in optimizations

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

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [React Best Practices](https://react.dev/learn)

## Support & Questions

For questions about development practices or the codebase, refer to:
1. This guidelines document
2. README.md for project overview
3. Code comments and JSDoc
4. Team documentation

---

**Last Updated**: 2026-05-29
**Version**: 1.0.0
