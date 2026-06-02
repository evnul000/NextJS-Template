/**
 * FinanceHub API Provider
 *
 * Mirrors the Clerk pattern exactly:
 *   1. Wrap <ApiProvider> once in app/layout.tsx
 *   2. Use the `useAPI()` hook anywhere in the app — no config repeated
 *
 * Clerk integration:
 *   The provider automatically wires Clerk's JWT token into every request's
 *   Authorization header. No manual token handling needed in components.
 *
 * Usage in layout.tsx:
 *   import { ApiProvider } from "@/lib/api-provider"
 *   <ApiProvider>
 *     {children}
 *   </ApiProvider>
 *
 * Usage in any component:
 *   import { useAPI } from "@/lib/api-provider"
 *   const api = useAPI()
 *   const { data } = await api.accounts.getAll()
 */

"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useSession } from "@clerk/nextjs";
import { buildApiClient } from "./api-client";
import type { ApiClient } from "./api-client";

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

const ApiContext = createContext<ApiClient | null>(null);

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────

export interface ApiProviderProps {
  children: React.ReactNode;
  /** Base URL for all API calls. Defaults to "" (same-origin). */
  baseUrl?: string;
}

export function ApiProvider({ children, baseUrl = "" }: ApiProviderProps) {
  // useSession gives us access to getToken() — Clerk injects this automatically
  const { session } = useSession();

  /**
   * getAuthHeaders is called before every API request.
   * It fetches a fresh Clerk JWT and attaches it as a Bearer token.
   * If the user is not signed in, no Authorization header is sent.
   */
  const getAuthHeaders = useMemo(
    () => async (): Promise<HeadersInit> => {
      if (!session) return {};
      const token = await session.getToken();
      if (!token) return {};
      return { Authorization: `Bearer ${token}` };
    },
    [session]
  );

  // Re-build client only when baseUrl or session changes
  const client = useMemo(
    () => buildApiClient({ baseUrl, getAuthHeaders }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseUrl, session?.id]
  );

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

/**
 * Returns the configured API client with Clerk auth headers pre-wired.
 * Must be used inside <ApiProvider>.
 *
 * @example
 * const api = useAPI()
 * const { data } = await api.accounts.getAll()
 */
export function useAPI(): ApiClient {
  const ctx = useContext(ApiContext);
  if (!ctx) {
    throw new Error(
      "[FinanceHub] useAPI() must be used inside <ApiProvider>.\n" +
        "Add <ApiProvider> to your root layout (app/layout.tsx)."
    );
  }
  return ctx;
}
