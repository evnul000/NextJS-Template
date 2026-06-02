import { AccountRepository } from "../repositories/account.repository";
import type { Account } from "@/types";

/**
 * AccountService
 * High-level business logic for account operations
 */
export class AccountService {
  /**
   * Get total balance across all accounts
   */
  static async getTotalBalance(): Promise<number> {
    const accounts = await AccountRepository.getAllAccounts();
    return accounts.reduce((sum, account) => sum + account.balance, 0);
  }

  /**
   * Get accounts with statistics
   */
  static async getAccountsWithStats() {
    const accounts = await AccountRepository.getAllAccounts();
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const activeAccounts = accounts.filter((acc) => acc.isActive).length;

    return {
      accounts,
      totalBalance,
      activeAccounts,
      averageBalance: totalBalance / (accounts.length || 1),
    };
  }

  /**
   * Create a new account
   */
  static async createAccount(
    name: string,
    type: string,
    initialBalance: number = 0
  ): Promise<Account> {
    return AccountRepository.createAccount({
      id: `acc_${Date.now()}`,
      name,
      type: type as any,
      balance: initialBalance,
      currency: "USD",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Get account by ID
   */
  static async getAccountById(id: string): Promise<Account | null> {
    return AccountRepository.getAccountById(id);
  }

  /**
   * Update account
   */
  static async updateAccount(
    id: string,
    data: Partial<Account>
  ): Promise<Account> {
    return AccountRepository.updateAccount(id, data);
  }

  /**
   * Delete account
   */
  static async deleteAccount(id: string): Promise<void> {
    return AccountRepository.deleteAccount(id);
  }
}
