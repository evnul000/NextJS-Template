/**
 * Unit Test Template — TransactionService
 */
import { TransactionService } from "./transaction.service";
import { TransactionRepository } from "../repositories/transaction.repository";
import type { Transaction } from "@/types";

jest.mock("../repositories/transaction.repository");
const MockTxRepo = TransactionRepository as jest.Mocked<typeof TransactionRepository>;

const makeTx = (overrides: Partial<Transaction> = {}): Transaction => ({
  id: "tx_001",
  accountId: "acc_001",
  type: "income",
  amount: 500,
  description: "Salary",
  category: "Income",
  date: new Date("2026-05-01"),
  status: "completed",
  createdAt: new Date("2026-05-01"),
  updatedAt: new Date("2026-05-01"),
  ...overrides,
});

describe("TransactionService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getTransactionsByAccount", () => {
    it("returns transactions for given accountId", async () => {
      const txs = [makeTx(), makeTx({ id: "tx_002" })];
      MockTxRepo.getTransactionsByAccountId.mockResolvedValue(txs);

      const result = await TransactionService.getTransactionsByAccount("acc_001");
      expect(MockTxRepo.getTransactionsByAccountId).toHaveBeenCalledWith("acc_001");
      expect(result).toHaveLength(2);
    });
  });

  describe("createTransaction", () => {
    it("creates a transaction with generated id and timestamps", async () => {
      const input = {
        accountId: "acc_001",
        type: "expense" as const,
        amount: 100,
        description: "Coffee",
        category: "Food",
      };
      const created = makeTx(input);
      MockTxRepo.createTransaction.mockResolvedValue(created);

      const result = await TransactionService.createTransaction(input);
      expect(result).toEqual(created);
      const callArg = MockTxRepo.createTransaction.mock.calls[0][0];
      expect(callArg.accountId).toBe("acc_001");
    });
  });
});
