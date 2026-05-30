# FinanceHub - SaaS Financial Platform

A modern, full-featured financial SaaS application built with Next.js 14+, TypeScript, Tailwind CSS, SCSS, and Shadcn UI components. Designed for managing financial facilities with a professional dashboard interface.

## Features

- 🎯 **Modern Dashboard** - Comprehensive financial overview with key metrics
- 💰 **Account Management** - Manage multiple financial accounts
- 📊 **Transaction Tracking** - Real-time transaction monitoring and history
- 📈 **Analytics & Reports** - Detailed financial reports and insights
- 🔐 **Type-Safe** - Full TypeScript support throughout the application
- 🎨 **Beautiful UI** - Shadcn UI components with Tailwind CSS styling
- 📱 **Responsive Design** - Works seamlessly across all devices
- ⚡ **High Performance** - Next.js with Turbopack for fast builds

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [SCSS](https://sass-lang.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Package Manager**: npm
- **Development Server**: Hot module reloading enabled

## Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── globals.css              # Global Tailwind styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Dashboard home page
├── src/
│   ├── components/
│   │   ├── dashboard/           # Dashboard-specific components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── stat-card.tsx
│   │   └── ui/                  # Reusable UI components (Shadcn-inspired)
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── lib/
│   │   └── utils.ts             # Utility functions (cn, classname merger)
│   └── styles/
│       └── dashboard.scss       # Custom SCSS styles
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── next.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

The application will automatically reload as you make changes.

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module reloading.

### Build
```bash
npm run build
```
Creates an optimized production build.

### Production
```bash
npm start
```
Runs the production build.

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality.

## Component Library

### UI Components

- **Button** - Primary action button with multiple variants
- **Card** - Container component for content sections
- **Badge** - Status indicator badges
- **Input** - Text input field with styling

### Dashboard Components

- **Sidebar** - Navigation sidebar with menu items
- **DashboardHeader** - Page header with title and actions
- **StatCard** - Key metric display card with trends

## Styling

The project uses a combination of:

1. **Tailwind CSS** - For utility-first styling and responsive design
2. **SCSS Modules** - For custom component-specific styles in `src/styles/dashboard.scss`
3. **CSS Variables** - For theming and consistent design tokens

### CSS Architecture

- Global styles: `app/globals.css`
- Component styles: Individual component files
- Custom SCSS: `src/styles/dashboard.scss`

## TypeScript Configuration

Full TypeScript support with:
- Strict mode enabled
- Path aliases (`@/*` → `./src/*`)
- React 18+ JSX syntax
- Complete type definitions for Next.js

## Development Best Practices

1. **Component Organization** - Place components in `src/components/` with appropriate subdirectories
2. **Type Safety** - Always define prop types and use TypeScript interfaces
3. **Styling** - Use Tailwind classes first, then SCSS for complex styling
4. **Imports** - Use the `@/` alias for cleaner, more maintainable imports

Example:
```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your application will be live on a Vercel URL

### Other Hosting Platforms

The application can be deployed to any platform that supports Node.js:
- AWS
- Google Cloud Platform
- Azure
- DigitalOcean
- etc.

## Environment Variables

Create a `.env.local` file for local environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
# Add more variables as needed
```

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Shadcn UI Components](https://ui.shadcn.com/)
- [React Documentation](https://react.dev/)

## Extensions & Tools

Recommended VS Code extensions:
- ESLint - Code quality checking
- Tailwind CSS IntelliSense - CSS class suggestions
- TypeScript Vue Plugin - Enhanced TypeScript support
- Prettier - Code formatter

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Commit your changes
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
