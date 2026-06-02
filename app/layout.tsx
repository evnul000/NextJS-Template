import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, clerkAppearance } from "@/lib/clerk.client";
import { ApiProvider } from "@/lib/api-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinanceHub",
  description: "Modern financial SaaS platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /**
     * ClerkProvider wraps the entire app.
     * appearance is configured in src/lib/clerk.client.ts → clerkAppearance.
     *
     * Redirect URLs are env-var driven (NOT JSX props in @clerk/nextjs v6+):
     *   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     *   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     *   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
     *   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
     *   NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/
     */
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en">
        <body className={inter.className}>
          {/**
           * ApiProvider injects the Clerk JWT into every API call.
           * Components use useAPI() — no manual token management.
           */}
          <ApiProvider baseUrl={process.env.NEXT_PUBLIC_API_URL ?? ""}>
            {children}
          </ApiProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
