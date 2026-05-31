/**
 * Transaction Type
 */
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

/**
 * Account Type
 */
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

/**
 * User Type
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Dashboard Statistics
 */
export interface DashboardStats {
  totalAccounts: number;
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  transactionCount: number;
}

/**
 * API Response Type
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
