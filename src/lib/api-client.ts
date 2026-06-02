/**
 * FinanceHub — Centralized API Client
 *
 * Two ways to use this module:
 *
 * ── Option A (Provider pattern, recommended) ───────────────────────────────
 * Mirrors Clerk: wrap <ApiProvider> once in layout.tsx, then call useAPI()
 * anywhere. Auth headers, base URL, etc. are configured once at the root.
 *
 *   // app/layout.tsx
 *   import { ApiProvider } from "@/lib/api-provider"
 *   <ApiProvider baseUrl={process.env.NEXT_PUBLIC_API_URL ?? ""}>
 *     {children}
 *   </ApiProvider>
 *
 *   // any component
 *   import { useAPI } from "@/lib/api-provider"
 *   const api = useAPI()
 *   const { data } = await api.accounts.getAll()
 *
 * ── Option B (Direct import, for Server Components & API routes) ───────────
 *   import { API } from "@/lib/api-client"
 *   const { data } = await API.accounts.getAll()
 */

import type { Account, Transaction, User, DashboardStats } from "@/types";

// ─────────────────────────────────────────────
// Core Types
// ─────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

export interface ApiConfig {
  baseUrl?: string;
  getAuthHeaders?: () => Promise<HeadersInit> | HeadersInit;
}

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

// ─────────────────────────────────────────────
// Core fetch wrapper (config-aware)
// ─────────────────────────────────────────────

function handleError(error: unknown): ApiError {
  if (error instanceof Error) return { message: error.message, statusCode: 500 };
  return { message: "An unexpected error occurred", statusCode: 500 };
}

async function makeRequest<T>(
  endpoint: string,
  options: RequestInit,
  config: ApiConfig
): Promise<ApiResponse<T>> {
  try {
    const authHeaders = config.getAuthHeaders
      ? await config.getAuthHeaders()
      : {};

    const url = `${config.baseUrl ?? ""}${endpoint}`;
    const response = await fetch(url, {
      headers: { ...defaultHeaders, ...authHeaders, ...(options.headers ?? {}) },
      ...options,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error ?? "Request failed",
        statusCode: response.status,
      };
    }

    return { ...data, statusCode: response.status };
  } catch (err) {
    const { message, statusCode } = handleError(err);
    return { success: false, error: message, statusCode };
  }
}

// ─────────────────────────────────────────────
// Factory — builds a fully-typed API client
// ─────────────────────────────────────────────

export function buildApiClient(config: ApiConfig = {}) {
  const get = <T>(ep: string, init?: RequestInit) =>
    makeRequest<T>(ep, { method: "GET", ...init }, config);

  const post = <T>(ep: string, body: unknown, init?: RequestInit) =>
    makeRequest<T>(ep, { method: "POST", body: JSON.stringify(body), ...init }, config);

  const patch = <T>(ep: string, body: unknown, init?: RequestInit) =>
    makeRequest<T>(ep, { method: "PATCH", body: JSON.stringify(body), ...init }, config);

  const del = <T>(ep: string, init?: RequestInit) =>
    makeRequest<T>(ep, { method: "DELETE", ...init }, config);

  return {
    accounts: {
      getAll: () => get<{ accounts: Account[]; totalBalance: number }>("/api/accounts"),
      getById: (id: string) => get<Account>(`/api/accounts/${id}`),
      create: (data: { name: string; type: Account["type"]; initialBalance?: number }) =>
        post<Account>("/api/accounts", data),
      update: (id: string, data: Partial<Omit<Account, "id" | "createdAt">>) =>
        patch<Account>(`/api/accounts/${id}`, data),
      delete: (id: string) => del<void>(`/api/accounts/${id}`),
    },
    transactions: {
      getAll: () => get<Transaction[]>("/api/transactions"),
      getByAccountId: (accountId: string) =>
        get<Transaction[]>(`/api/transactions/account/${accountId}`),
      create: (data: {
        accountId: string;
        type: Transaction["type"];
        amount: number;
        description: string;
        category: string;
      }) => post<Transaction>("/api/transactions", data),
      update: (id: string, data: Partial<Omit<Transaction, "id" | "createdAt">>) =>
        patch<Transaction>(`/api/transactions/${id}`, data),
      delete: (id: string) => del<void>(`/api/transactions/${id}`),
    },
    users: {
      me: () => get<User>("/api/users/me"),
      updateMe: (data: Partial<Omit<User, "id" | "createdAt">>) =>
        patch<User>("/api/users/me", data),
    },
    dashboard: {
      getStats: () => get<DashboardStats>("/api/dashboard/stats"),
    },
  } as const;
}

// ─────────────────────────────────────────────
// Static singleton — use in Server Components & API routes
// ─────────────────────────────────────────────

/** Pre-built client with default config. Use `useAPI()` in Client Components. */
export const API = buildApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
});

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  return fetch(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });
}

export type ApiClient = ReturnType<typeof buildApiClient>;
