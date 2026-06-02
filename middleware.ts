/**
 * FinanceHub Middleware
 *
 * Uses Clerk's clerkMiddleware to protect routes.
 * Public routes are managed in src/lib/clerk.server.ts → PUBLIC_ROUTES.
 */
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { PUBLIC_ROUTES } from "@/lib/clerk.server";

const isPublic = createRouteMatcher(PUBLIC_ROUTES as unknown as string[]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublic(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
