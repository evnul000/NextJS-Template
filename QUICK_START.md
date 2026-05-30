# Quick Start Guide

## 🚀 Getting Started with FinanceHub

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- VS Code (recommended)

### Installation & Setup (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:3000
```

You should now see the FinanceHub dashboard! 🎉

### Project Overview

**What You're Looking At:**
- Left sidebar with navigation menu
- Main dashboard with financial metrics
- Recent transactions list
- Quick action cards at the bottom

### Basic Development

#### Making Your First Change

1. Open `app/page.tsx`
2. Find the `StatCard` component
3. Change a title or value
4. Watch the page update automatically

#### Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Dashboard home page |
| `src/components/ui/button.tsx` | Button component |
| `src/components/ui/card.tsx` | Card container component |
| `app/globals.css` | Global Tailwind styles |
| `src/styles/dashboard.scss` | Custom SCSS styles |

### Common Tasks

#### Adding a New UI Component

```tsx
// 1. Create in src/components/ui/my-component.tsx
import { cn } from "@/lib/utils"

export function MyComponent({ className, ...props }) {
  return <div className={cn("base-styles", className)} {...props} />
}

// 2. Use in your page
import { MyComponent } from "@/components/ui/my-component"

export default function Home() {
  return <MyComponent />
}
```

#### Styling with Tailwind

```tsx
// Use utility classes
<div className="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md">
  Styled content
</div>

// Combine multiple utilities with cn()
import { cn } from "@/lib/utils"

<div className={cn(
  "p-4 rounded-lg",
  isActive ? "bg-blue-500 text-white" : "bg-gray-100"
)}>
  Dynamic styles
</div>
```

#### Adding Custom SCSS

```scss
// In src/styles/dashboard.scss
.my-custom-component {
  @include flex-center;
  padding: $spacing-4;
  background-color: $primary-color;
  @include transition(all);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
```

### Project Structure Quick Tour

```
FinanceHub/
├── app/                    # Next.js pages
│   ├── page.tsx           # Dashboard homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── src/components/        # React components
│   ├── dashboard/         # Dashboard components
│   ├── ui/               # Reusable components
│   └── layout.tsx
├── src/lib/              # Utilities
│   └── utils.ts          # Helper functions
└── src/styles/           # SCSS files
    └── dashboard.scss    # Custom styles
```

### Useful Commands

```bash
npm run dev      # 🚀 Start development server
npm run build    # 📦 Build for production
npm run lint     # ✅ Check code quality
npm start        # 🏃 Run production build
```

### VS Code Tips

1. **Quick Component Preview**
   - Hover over component names to see JSDoc
   - Click on components to jump to definition

2. **Tailwind Autocomplete**
   - Type class names and get suggestions
   - See color swatches inline
   - Get responsive breakpoint hints

3. **TypeScript Errors**
   - Problems panel shows issues
   - Red squiggles indicate errors
   - Hover for quick fixes

### Next Steps

1. ✅ Explore the dashboard components
2. ✅ Try modifying some styles
3. ✅ Add a new component to `src/components/ui/`
4. ✅ Create a new page in the `app/` directory
5. ✅ Read the full documentation in `.github/copilot-instructions.md`

### Common Questions

**Q: How do I add a new page?**
A: Create a new folder in `app/` with a `page.tsx` file.

**Q: How do I use Tailwind CSS?**
A: Add class names directly: `className="p-4 bg-blue-50 rounded-lg"`

**Q: Can I use SCSS?**
A: Yes! Create `.scss` files and import them or add to `src/styles/dashboard.scss`

**Q: How do I add a database?**
A: You'll need to set up a backend API or use a service like Supabase/Firebase.

**Q: How do I deploy?**
A: Deploy to Vercel (easiest), AWS, Google Cloud, or any Node.js hosting.

### Getting Help

- 📖 Read [README.md](./README.md) for full documentation
- 📋 Check [.github/copilot-instructions.md](./.github/copilot-instructions.md) for guidelines
- 🔍 Search the codebase for similar implementations
- 💬 Check Next.js and React documentation

---

**Happy coding! 🎉**

Need more help? Check the full documentation or explore the codebase!
