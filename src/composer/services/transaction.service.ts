import { Transaction } from "@/types";
import { TransactionRepository } from "../repositories/transaction.repository";
import { AccountRepository } from "../repositories/account.repository";

/**
 * Transaction Service
 * Business logic for transaction operations
 */
export class TransactionService {
  /**
   * Get all transactions
   */
  static async getAllTransactions(): Promise<Transaction[]> {
    return TransactionRepository.getAllTransactions();
  }

  /**
   * Get transactions for an account
   */
  static async getAccountTransactions(accountId: string): Promise<Transaction[]> {
    return TransactionRepository.getTransactionsByAccountId(accountId);
  }

  /**
   * Create a new transaction and update account balance
   */
  static async createTransaction(
    accountId: string,
    type: Transaction["type"],
    amount: number,
    description: string,
    category: string
  ): Promise<Transaction> {
    // Validate account exists
    const account = await AccountRepository.getAccountById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }

    // Create transaction
    const transaction = await TransactionRepository.createTransaction({
      accountId,
      type,
      amount,
      description,
      category,
      date: new Date(),
      status: "completed",
    });

    // Update account balance
    let newBalance = account.balance;
    if (type === "income") {
      newBalance += amount;
    } else if (type === "expense") {
      newBalance -= amount;
    }

    await AccountRepository.updateAccount(accountId, { balance: newBalance });

    return transaction;
  }

  /**
   * Get monthly statistics
   */
  static async getMonthlyStats(accountId: string): Promise<{
    income: number;
    expenses: number;
    net: number;
  }> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transactions = await TransactionRepository.getTransactionsByDateRange(startOfMonth, endOfMonth);
    const accountTransactions = transactions.filter((txn) => txn.accountId === accountId);

    const income = accountTransactions
      .filter((txn) => txn.type === "income")
      .reduce((sum, txn) => sum + txn.amount, 0);

    const expenses = accountTransactions
      .filter((txn) => txn.type === "expense")
      .reduce((sum, txn) => sum + txn.amount, 0);

    return {
      income,
      expenses,
      net: income - expenses,
    };
  }
}
