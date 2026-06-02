/**
 * Sign-Up Page
 *
 * Uses Clerk's hosted <SignUp> component, imported from the
 * centralized clerk module (src/lib/clerk.ts).
 */
import { SignUp } from "@/lib/clerk";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      <SignUp />
    </main>
  );
}
