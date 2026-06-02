# Clerk Integration Guide — FinanceHub

## Architecture Overview

All Clerk facilities are centralized in **one file**:

```
src/lib/clerk.ts          ← Single source of truth for all Clerk config
```

Nothing in your app imports from `@clerk/nextjs` directly. Every component, route, and middleware imports from `@/lib/clerk` instead. This means:

- **One place to configure** auth behavior, branding, and routing
- **One place to swap** auth providers if you ever move away from Clerk
- **Project leader can edit** appearance, public routes, and token logic without touching component files

---

## What Lives in `src/lib/clerk.ts`

| Export | Use in | Purpose |
|--------|--------|---------|
| `useClerkAuth()` | Client Components | Is the user signed in? Auth state |
| `useClerkUser()` | Client Components | Current user's profile data |
| `getServerAuth()` | Server Components | Get userId server-side |
| `requireAuth()` | API Routes | Throw 401 if not signed in |
| `getAuthToken()` | Utilities | Get raw JWT for external calls |
| `clerkAppearance` | `layout.tsx` | Theme all Clerk UI + dark dev widget |
| `PUBLIC_ROUTES` | `middleware.ts` | Which routes skip auth |
| `isPublicRoute()` | Middleware | Programmatic route checking |
| `SignIn`, `SignUp` | Auth pages | Hosted Clerk UI components |
| `UserButton` | Nav | User avatar + sign out menu |
| `SignedIn`, `SignedOut` | Anywhere | Conditional rendering by auth state |

---

## The Dark "Configure Your Application" Widget

This appears in development mode automatically when Clerk is set up. It's the black panel shown in the bottom-right corner. It's **controlled by Clerk's dashboard** — not your code.

The appearance of the widget itself is styled via `clerkAppearance.elements.devBrowser` in `src/lib/clerk.ts`:

```ts
elements: {
  devBrowser: "!bg-gray-900 !text-white !border-gray-700 !rounded-xl !shadow-2xl",
}
```

The widget lets your project leader:
- Add SSO connections (GitHub, Google, etc.)
- Set up B2B / organization auth
- Enable MFA
- Configure webhooks
- Manage users

It only appears in development (`NODE_ENV=development`) and disappears in production automatically.

---

## Quick Start

### 1. Get Clerk Keys

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Copy your **Publishable Key** and **Secret Key**

### 2. Set Environment Variables

```bash
cp .env.local.example .env.local
# Fill in your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY
```

### 3. Run the App

```bash
npm install
npm run dev
```

The Clerk dev widget will appear in the bottom-right — click **"Configure your application"** to set up auth providers, SSO, and MFA without touching code.

---

## Protecting Routes

Edit `PUBLIC_ROUTES` in `src/lib/clerk.ts` to control which routes are accessible without login:

```ts
export const PUBLIC_ROUTES = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/health",
  // Add more public routes here, e.g.:
  // "/pricing",
  // "/blog(.*)",
] as const;
```

The middleware reads this list automatically — no other files need changing.

---

## Using Auth in Components

### Client Component
```tsx
import { useClerkAuth, useClerkUser, UserButton, SignedIn, SignedOut } from "@/lib/clerk"

export function NavBar() {
  const { isSignedIn } = useClerkAuth()
  const { user } = useClerkUser()

  return (
    <nav>
      <SignedIn>
        <span>Hello, {user?.firstName}</span>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <a href="/sign-in">Sign In</a>
      </SignedOut>
    </nav>
  )
}
```

### Server Component
```tsx
import { getServerAuth, currentUser } from "@/lib/clerk"

export default async function DashboardPage() {
  const { userId } = await getServerAuth()
  const user = await currentUser()

  return <h1>Welcome, {user?.firstName}</h1>
}
```

### API Route
```ts
import { requireAuth } from "@/lib/clerk"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { userId } = await requireAuth() // throws 401 if not signed in
    // ... your logic
    return NextResponse.json({ success: true, data: { userId } })
  } catch (error) {
    if (error instanceof NextResponse) return error // pass the 401 through
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
```

### API Calls (auto-authenticated via ApiProvider)
```tsx
// No token management needed — ApiProvider injects the JWT automatically
import { useAPI } from "@/lib/api-provider"

export function AccountList() {
  const api = useAPI()

  const load = async () => {
    const { data } = await api.accounts.getAll() // Bearer token sent automatically
  }
}
```

---

## Theming Clerk Components

Edit the `clerkAppearance` object in `src/lib/clerk.ts`:

```ts
export const clerkAppearance = {
  variables: {
    colorPrimary: "#2563eb",   // ← change to your brand color
    borderRadius: "0.5rem",    // ← change border radius
    fontFamily: "inherit",
  },
  elements: {
    formButtonPrimary: "...",  // ← Tailwind classes for the sign-in button
  },
}
```

Full reference: https://clerk.com/docs/customization/overview
