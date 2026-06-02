import type { Transaction } from "@/types";

/**
 * TransactionRepository
 * Data access layer for transaction operations
 * Replace mock data with database queries
 */

// Mock data - REPLACE WITH DATABASE QUERIES
const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    accountId: "acc_001",
    type: "expense",
    amount: 50,
    description: "Grocery Store",
    category: "Groceries",
    date: new Date("2026-01-15"),
    status: "completed",
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
  },
  {
    id: "txn_002",
    accountId: "acc_001",
    type: "income",
    amount: 2000,
    description: "Monthly Salary",
    category: "Salary",
    date: new Date("2026-01-01"),
    status: "completed",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "txn_003",
    accountId: "acc_002",
    type: "transfer",
    amount: 500,
    description: "Transfer to Savings",
    category: "Transfer",
    date: new Date("2026-01-10"),
    status: "completed",
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-01-10"),
  },
];

export class TransactionRepository {
  /**
   * Get all transactions
   */
  static async getAllTransactions(): Promise<Transaction[]> {
    // TODO: Replace with database query
    // return await db.transaction.findMany();
    return mockTransactions;
  }

  /**
   * Get transactions for account
   */
  static async getAccountTransactions(accountId: string): Promise<Transaction[]> {
    // TODO: Replace with database query
    // return await db.transaction.findMany({ where: { accountId } });
    return mockTransactions.filter((t) => t.accountId === accountId);
  }

  /**
   * Create transaction
   */
  static async createTransaction(transaction: Transaction): Promise<Transaction> {
    // TODO: Replace with database query
    // return await db.transaction.create({ data: transaction });
    mockTransactions.push(transaction);
    return transaction;
  }

  /**
   * Update transaction
   */
  static async updateTransaction(
    id: string,
    data: Partial<Transaction>
  ): Promise<Transaction> {
    // TODO: Replace with database query
    // return await db.transaction.update({ where: { id }, data });
    const transaction = mockTransactions.find((t) => t.id === id);
    if (!transaction) throw new Error("Transaction not found");

    const updated = { ...transaction, ...data, updatedAt: new Date() };
    const index = mockTransactions.indexOf(transaction);
    mockTransactions[index] = updated;
    return updated;
  }

  /**
   * Delete transaction
   */
  static async deleteTransaction(id: string): Promise<void> {
    // TODO: Replace with database query
    // return await db.transaction.delete({ where: { id } });
    const index = mockTransactions.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Transaction not found");

    mockTransactions.splice(index, 1);
  }
}
