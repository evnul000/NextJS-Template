/**
 * FinanceHub - Clerk Server Module
 *
 * Import from here in:
 *  - Server Components
 *  - API Routes
 *  - Middleware
 *
 * NEVER import this file from a Client Component ("use client").
 * For client-side Clerk utilities, use "@/lib/clerk.client" instead.
 */

export { auth as getServerAuth, currentUser } from "@clerk/nextjs/server";

/**
 * Server-side helper: throws a NextResponse 401 if the user is not signed in.
 * Use at the top of any API route handler.
 *
 * @example
 * export async function GET() {
 *   const { userId } = await requireAuth()
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

/**
 * Routes that are publicly accessible without authentication.
 * Used by middleware.ts — edit this list to add/remove public routes.
 */
export const PUBLIC_ROUTES = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/health",
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];
