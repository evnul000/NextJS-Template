import { Account } from "@/types";
import { AccountRepository } from "../repositories/account.repository";

/**
 * Account Service
 * Business logic for account operations
 */
export class AccountService {
  /**
   * Get all user accounts with statistics
   */
  static async getAccountsWithStats(): Promise<Account[]> {
    return AccountRepository.getAllAccounts();
  }

  /**
   * Get total balance across all accounts
   */
  static async getTotalBalance(): Promise<number> {
    const accounts = await AccountRepository.getAllAccounts();
    return accounts.reduce((sum, account) => sum + account.balance, 0);
  }

  /**
   * Get account by ID
   */
  static async getAccountById(id: string): Promise<Account | null> {
    return AccountRepository.getAccountById(id);
  }

  /**
   * Create a new account
   */
  static async createAccount(
    name: string,
    type: Account["type"],
    initialBalance: number = 0
  ): Promise<Account> {
    return AccountRepository.createAccount({
      name,
      type,
      balance: initialBalance,
      currency: "USD",
      isActive: true,
    });
  }

  /**
   * Update account balance
   */
  static async updateAccountBalance(id: string, newBalance: number): Promise<Account | null> {
    return AccountRepository.updateAccount(id, { balance: newBalance });
  }

  /**
   * Close an account
   */
  static async closeAccount(id: string): Promise<Account | null> {
    return AccountRepository.updateAccount(id, { isActive: false });
  }
}
