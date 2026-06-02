/**
 * FinanceHub — Centralized Clerk Module
 *
 * This is the single source of truth for every Clerk-related facility.
 * Import from here instead of @clerk/nextjs directly — this keeps auth
 * logic centralized so your project leader can swap, extend, or configure
 * Clerk in one file without touching the rest of the codebase.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Client Components  →  useClerkAuth() / useClerkUser()      │
 * │  Server Components  →  getServerAuth()                      │
 * │  API Routes         →  requireAuth()                        │
 * │  Layout             →  clerkAppearance  (dark widget)       │
 * │  Middleware         →  isPublicRoute()                      │
 * └─────────────────────────────────────────────────────────────┘
 *
 * Usage examples:
 *
 *   // Client Component
 *   import { useClerkAuth, useClerkUser } from "@/lib/clerk"
 *   const { isSignedIn } = useClerkAuth()
 *   const { user } = useClerkUser()
 *
 *   // Server Component
 *   import { getServerAuth } from "@/lib/clerk"
 *   const { userId } = await getServerAuth()
 *
 *   // API Route (throws 401 if not signed in)
 *   import { requireAuth } from "@/lib/clerk"
 *   const { userId } = await requireAuth()
 *
 *   // Get a JWT token for backend calls
 *   import { getAuthToken } from "@/lib/clerk"
 *   const token = await getAuthToken()
 */

// ─── Re-exports: Server-side helpers ─────────────────────────────────────────
// Server Components and API routes import from here, not @clerk/nextjs/server
export { auth as getServerAuth, currentUser } from "@clerk/nextjs/server";

// ─── Re-exports: Client-side hooks & components ───────────────────────────────
// Client Components import from here, not @clerk/nextjs directly
export {
  useAuth as useClerkAuth,
  useUser as useClerkUser,
  useClerk,
  useSession,
  SignIn,
  SignUp,
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
  ClerkProvider,
} from "@clerk/nextjs";

// ─── Auth Token Helper ────────────────────────────────────────────────────────

/**
 * Returns the active Clerk session JWT for use in Authorization headers.
 * Call this inside ApiProvider's getAuthHeaders (see api-provider.tsx).
 *
 * Returns null when called server-side or when the user is not signed in.
 */
export async function getAuthToken(): Promise<string | null> {
  // Only works client-side — guard against SSR
  if (typeof window === "undefined") return null;

  try {
    // __clerk_db_jwt is the session token Clerk stores in the browser.
    // window.Clerk is injected by ClerkProvider.
    const session = (window as Window & { Clerk?: { session?: { getToken: () => Promise<string | null> } } }).Clerk?.session;
    if (!session) return null;
    return await session.getToken();
  } catch {
    return null;
  }
}

/**
 * Server-side helper: throws a NextResponse 401 JSON error if the user
 * is not signed in. Use at the top of any API route handler.
 *
 * @example
 * export async function GET() {
 *   const { userId } = await requireAuth()
 *   // userId is guaranteed to be a string here
 * }
 */
export async function requireAuth(): Promise<{ userId: string }> {
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) {
    const { NextResponse } = await import("next/server");
    throw NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  return { userId };
}

// ─── Appearance Config ────────────────────────────────────────────────────────

/**
 * Clerk appearance config applied to <ClerkProvider>.
 *
 * This controls the look of all Clerk-managed UI (SignIn, SignUp, UserButton,
 * and the dev-mode "Configure your application" dark widget).
 *
 * Edit the variables below to theme Clerk components to match your brand.
 * Full reference: https://clerk.com/docs/customization/overview
 */
export const clerkAppearance = {
  /**
   * Variables cascade to every Clerk component.
   * Adjust colors, fonts, border radius, etc. here.
   */
  variables: {
    colorPrimary: "#2563eb",          // blue-600 — matches FinanceHub brand
    colorBackground: "#ffffff",
    colorText: "#111827",             // gray-900
    colorTextSecondary: "#6b7280",    // gray-500
    colorInputBackground: "#f9fafb",  // gray-50
    colorInputText: "#111827",
    borderRadius: "0.5rem",
    fontFamily: "inherit",
  },
  elements: {
    /** Card that wraps SignIn / SignUp */
    card: "shadow-xl border border-gray-200",
    /** Primary action button */
    formButtonPrimary:
      "bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors",
    /** The UserButton avatar ring */
    avatarBox: "ring-2 ring-blue-600/20",
    /** Dev-mode widget — kept dark so it doesn't blend with light pages */
    devBrowser:
      "!bg-gray-900 !text-white !border-gray-700 !rounded-xl !shadow-2xl",
  },
} as const;

// ─── Route helpers (used in middleware) ──────────────────────────────────────

/**
 * Routes that are publicly accessible without authentication.
 * Used by middleware.ts — keep this list in sync with your app's routes.
 */
export const PUBLIC_ROUTES = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/health",
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

/**
 * Returns true if the given pathname matches a public route pattern.
 * Used in middleware to decide whether to redirect unauthenticated users.
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((pattern) => {
    // Simple wildcard: /sign-in(.*) → matches /sign-in, /sign-in/factor-one, etc.
    const regex = new RegExp(`^${pattern.replace("(.*)", ".*")}$`);
    return regex.test(pathname);
  });
}
