/**
 * Domain Types — FinanceHub SaaS Template
 *
 * All shared TypeScript interfaces live here.
 * Import with: import type { Account } from "@/types"
 */

// ─────────────────────────────────────────────
// Domain Models
// ─────────────────────────────────────────────

export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  description: string;
  category: string;
  date: Date;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalAccounts: number;
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  transactionCount: number;
}

// ─────────────────────────────────────────────
// API / Transport Types
// ─────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: PaginationMeta;
}

// ─────────────────────────────────────────────
// Utility Types
// ─────────────────────────────────────────────

/** Make certain keys of T required */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Deep partial — useful for update payloads */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Omit id & timestamps for create payloads */
export type CreatePayload<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

/** Omit id & timestamps for update payloads */
export type UpdatePayload<T> = Partial<Omit<T, "id" | "createdAt">>;
