/**
 * Sign-In Page
 *
 * Uses Clerk's hosted <SignIn> component, imported from the
 * centralized clerk module (src/lib/clerk.ts).
 *
 * All appearance / branding is configured in clerkAppearance (clerk.ts).
 * Route is public — see PUBLIC_ROUTES in clerk.ts.
 */
import { SignIn } from "@/lib/clerk";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      <SignIn />
    </main>
  );
}
