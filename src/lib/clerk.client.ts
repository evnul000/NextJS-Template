/**
 * FinanceHub - Clerk Client Module
 *
 * Import from here in Client Components ("use client") and the root layout.
 *
 * NEVER import "@clerk/nextjs/server" from this file.
 * For Server Components and API routes, use "@/lib/clerk.server" instead.
 *
 * NOTE: @clerk/nextjs v7 replaced <SignedIn> and <SignedOut> with <Show>.
 * Use the re-exports below which wrap Show for convenience:
 *
 *   <SignedIn>...</SignedIn>   →  <Show when="signed-in">...</Show>
 *   <SignedOut>...</SignedOut> →  <Show when="signed-out">...</Show>
 */

"use client";

import React from "react";
import { Show } from "@clerk/nextjs";

// Client-side hooks
export {
  useAuth as useClerkAuth,
  useUser as useClerkUser,
  useClerk,
  useSession,
} from "@clerk/nextjs";

// UI Components
export {
  ClerkProvider,
  SignIn,
  SignUp,
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
  UserProfile,
  Show,
} from "@clerk/nextjs";

/**
 * Convenience wrapper: renders children only when user IS signed in.
 * Replaces the removed <SignedIn> component from @clerk/nextjs v5 and below.
 *
 * @example
 * <SignedIn><UserButton /></SignedIn>
 */
export function SignedIn({ children }: { children: React.ReactNode }) {
  return React.createElement(Show, { when: "signed-in" as const }, children);
}

/**
 * Convenience wrapper: renders children only when user is NOT signed in.
 * Replaces the removed <SignedOut> component from @clerk/nextjs v5 and below.
 *
 * @example
 * <SignedOut><SignInButton /></SignedOut>
 */
export function SignedOut({ children }: { children: React.ReactNode }) {
  return React.createElement(Show, { when: "signed-out" as const }, children);
}

/**
 * Clerk appearance config applied to <ClerkProvider>.
 *
 * Controls all Clerk-managed UI — SignIn, SignUp, UserButton,
 * and the dark "Configure your application" dev widget.
 *
 * Edit the variables below to theme Clerk to match your brand.
 * Full reference: https://clerk.com/docs/customization/overview
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#2563eb",
    colorBackground: "#ffffff",
    colorText: "#111827",
    colorTextSecondary: "#6b7280",
    colorInputBackground: "#f9fafb",
    colorInputText: "#111827",
    borderRadius: "0.5rem",
    fontFamily: "inherit",
  },
  elements: {
    card: "shadow-xl border border-gray-200",
    formButtonPrimary:
      "bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors",
    avatarBox: "ring-2 ring-blue-600/20",
    devBrowser:
      "!bg-gray-900 !text-white !border-gray-700 !rounded-xl !shadow-2xl",
  },
} as const;
