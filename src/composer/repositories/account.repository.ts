import { Account } from "@/types";

/**
 * Account Repository
 * Handles all account-related data operations
 */
export class AccountRepository {
  /**
   * Mock data - replace with actual database calls
   */
  private static mockAccounts: Account[] = [
    {
      id: "acc_001",
      name: "Checking Account",
      type: "checking",
      balance: 5000,
      currency: "USD",
      isActive: true,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-05-31"),
    },
    {
      id: "acc_002",
      name: "Savings Account",
      type: "savings",
      balance: 25000,
      currency: "USD",
      isActive: true,
      createdAt: new Date("2024-02-20"),
      updatedAt: new Date("2024-05-31"),
    },
  ];

  /**
   * Get all accounts
   */
  static async getAllAccounts(): Promise<Account[]> {
    // TODO: Replace with actual database query
    return this.mockAccounts;
  }

  /**
   * Get account by ID
   */
  static async getAccountById(id: string): Promise<Account | null> {
    // TODO: Replace with actual database query
    return this.mockAccounts.find((acc) => acc.id === id) || null;
  }

  /**
   * Create new account
   */
  static async createAccount(account: Omit<Account, "id" | "createdAt" | "updatedAt">): Promise<Account> {
    // TODO: Replace with actual database insert
    const newAccount: Account = {
      ...account,
      id: `acc_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mockAccounts.push(newAccount);
    return newAccount;
  }

  /**
   * Update account
   */
  static async updateAccount(id: string, updates: Partial<Account>): Promise<Account | null> {
    // TODO: Replace with actual database update
    const account = this.mockAccounts.find((acc) => acc.id === id);
    if (!account) return null;

    const updated = {
      ...account,
      ...updates,
      updatedAt: new Date(),
    };
    const index = this.mockAccounts.findIndex((acc) => acc.id === id);
    this.mockAccounts[index] = updated;
    return updated;
  }

  /**
   * Delete account
   */
  static async deleteAccount(id: string): Promise<boolean> {
    // TODO: Replace with actual database delete
    const index = this.mockAccounts.findIndex((acc) => acc.id === id);
    if (index === -1) return false;
    this.mockAccounts.splice(index, 1);
    return true;
  }
}
