import type { Account } from "@/types";

/**
 * AccountRepository
 * Data access layer for account operations
 * Replace mock data with database queries
 */

// Mock data - REPLACE WITH DATABASE QUERIES
const mockAccounts: Account[] = [
  {
    id: "acc_001",
    name: "Checking Account",
    type: "checking",
    balance: 5000,
    currency: "USD",
    isActive: true,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "acc_002",
    name: "Savings Account",
    type: "savings",
    balance: 25000,
    currency: "USD",
    isActive: true,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "acc_003",
    name: "Investment Account",
    type: "investment",
    balance: 50000,
    currency: "USD",
    isActive: true,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
];

export class AccountRepository {
  /**
   * Get all accounts
   */
  static async getAllAccounts(): Promise<Account[]> {
    // TODO: Replace with database query
    // return await db.account.findMany();
    return mockAccounts;
  }

  /**
   * Get account by ID
   */
  static async getAccountById(id: string): Promise<Account | null> {
    // TODO: Replace with database query
    // return await db.account.findUnique({ where: { id } });
    return mockAccounts.find((acc) => acc.id === id) || null;
  }

  /**
   * Create account
   */
  static async createAccount(account: Account): Promise<Account> {
    // TODO: Replace with database query
    // return await db.account.create({ data: account });
    mockAccounts.push(account);
    return account;
  }

  /**
   * Update account
   */
  static async updateAccount(id: string, data: Partial<Account>): Promise<Account> {
    // TODO: Replace with database query
    // return await db.account.update({ where: { id }, data });
    const account = mockAccounts.find((acc) => acc.id === id);
    if (!account) throw new Error("Account not found");

    const updated = { ...account, ...data, updatedAt: new Date() };
    const index = mockAccounts.indexOf(account);
    mockAccounts[index] = updated;
    return updated;
  }

  /**
   * Delete account
   */
  static async deleteAccount(id: string): Promise<void> {
    // TODO: Replace with database query
    // return await db.account.delete({ where: { id } });
    const index = mockAccounts.findIndex((acc) => acc.id === id);
    if (index === -1) throw new Error("Account not found");

    mockAccounts.splice(index, 1);
  }
}
