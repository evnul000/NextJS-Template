import { TransactionRepository } from "../repositories/transaction.repository";
import type { Transaction } from "@/types";

/**
 * TransactionService
 * Business logic for transaction operations
 */
export class TransactionService {
  static async getAllTransactions(): Promise<Transaction[]> {
    return TransactionRepository.getAllTransactions();
  }

  static async getTransactionsByAccount(accountId: string): Promise<Transaction[]> {
    return TransactionRepository.getTransactionsByAccountId(accountId);
  }

  static async createTransaction(data: {
    accountId: string;
    type: Transaction["type"];
    amount: number;
    description: string;
    category: string;
  }): Promise<Transaction> {
    return TransactionRepository.createTransaction({
      id: `tx_${Date.now()}`,
      ...data,
      date: new Date(),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async updateTransaction(
    id: string,
    data: Partial<Transaction>
  ): Promise<Transaction> {
    return TransactionRepository.updateTransaction(id, data);
  }

  static async deleteTransaction(id: string): Promise<void> {
    return TransactionRepository.deleteTransaction(id);
  }

  /**
   * Calculate monthly income/expense totals
   */
  static async getMonthlyStats(year: number, month: number) {
    const all = await TransactionRepository.getAllTransactions();
    const inMonth = all.filter((tx) => {
      const d = new Date(tx.date);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });

    const income = inMonth
      .filter((tx) => tx.type === "income" && tx.status === "completed")
      .reduce((s, tx) => s + tx.amount, 0);

    const expense = inMonth
      .filter((tx) => tx.type === "expense" && tx.status === "completed")
      .reduce((s, tx) => s + tx.amount, 0);

    return { income, expense, net: income - expense, count: inMonth.length };
  }
}
