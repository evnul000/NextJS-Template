import { Transaction } from "@/types";

/**
 * Transaction Repository
 * Handles all transaction-related data operations
 */
export class TransactionRepository {
  /**
   * Mock data - replace with actual database calls
   */
  private static mockTransactions: Transaction[] = [
    {
      id: "txn_001",
      accountId: "acc_001",
      type: "expense",
      amount: 150,
      description: "Grocery shopping",
      category: "Food",
      date: new Date("2024-05-30"),
      status: "completed",
      createdAt: new Date("2024-05-30"),
      updatedAt: new Date("2024-05-30"),
    },
    {
      id: "txn_002",
      accountId: "acc_001",
      type: "income",
      amount: 3000,
      description: "Monthly salary",
      category: "Salary",
      date: new Date("2024-05-01"),
      status: "completed",
      createdAt: new Date("2024-05-01"),
      updatedAt: new Date("2024-05-01"),
    },
  ];

  /**
   * Get all transactions
   */
  static async getAllTransactions(): Promise<Transaction[]> {
    // TODO: Replace with actual database query
    return this.mockTransactions;
  }

  /**
   * Get transactions by account ID
   */
  static async getTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    // TODO: Replace with actual database query
    return this.mockTransactions.filter((txn) => txn.accountId === accountId);
  }

  /**
   * Get transaction by ID
   */
  static async getTransactionById(id: string): Promise<Transaction | null> {
    // TODO: Replace with actual database query
    return this.mockTransactions.find((txn) => txn.id === id) || null;
  }

  /**
   * Create new transaction
   */
  static async createTransaction(
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">
  ): Promise<Transaction> {
    // TODO: Replace with actual database insert
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mockTransactions.push(newTransaction);
    return newTransaction;
  }

  /**
   * Update transaction
   */
  static async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction | null> {
    // TODO: Replace with actual database update
    const transaction = this.mockTransactions.find((txn) => txn.id === id);
    if (!transaction) return null;

    const updated = {
      ...transaction,
      ...updates,
      updatedAt: new Date(),
    };
    const index = this.mockTransactions.findIndex((txn) => txn.id === id);
    this.mockTransactions[index] = updated;
    return updated;
  }

  /**
   * Get transactions for a date range
   */
  static async getTransactionsByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    // TODO: Replace with actual database query
    return this.mockTransactions.filter(
      (txn) => txn.date >= startDate && txn.date <= endDate
    );
  }
}
