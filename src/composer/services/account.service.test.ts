/**
 * Unit Test Template — AccountService
 *
 * Pattern: mock the repository, test service logic in isolation.
 * Copy this file as a starting point for any new service test.
 */
import { AccountService } from "./account.service";
import { AccountRepository } from "../repositories/account.repository";
import type { Account } from "@/types";

// ── Mock the entire repository ───────────────────────────────────────────────
jest.mock("../repositories/account.repository");
const MockAccountRepository = AccountRepository as jest.Mocked<typeof AccountRepository>;

// ── Fixtures ─────────────────────────────────────────────────────────────────
const makeAccount = (overrides: Partial<Account> = {}): Account => ({
  id: "acc_001",
  name: "Test Account",
  type: "checking",
  balance: 1000,
  currency: "USD",
  isActive: true,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
  ...overrides,
});

// ── Tests ────────────────────────────────────────────────────────────────────
describe("AccountService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getTotalBalance", () => {
    it("returns sum of all account balances", async () => {
      MockAccountRepository.getAllAccounts.mockResolvedValue([
        makeAccount({ balance: 1000 }),
        makeAccount({ id: "acc_002", balance: 2500 }),
      ]);

      const total = await AccountService.getTotalBalance();
      expect(total).toBe(3500);
    });

    it("returns 0 when there are no accounts", async () => {
      MockAccountRepository.getAllAccounts.mockResolvedValue([]);
      const total = await AccountService.getTotalBalance();
      expect(total).toBe(0);
    });
  });

  describe("getAccountsWithStats", () => {
    it("returns accounts with computed stats", async () => {
      const accounts = [
        makeAccount({ id: "acc_001", balance: 1000, isActive: true }),
        makeAccount({ id: "acc_002", balance: 3000, isActive: true }),
        makeAccount({ id: "acc_003", balance: 0, isActive: false }),
      ];
      MockAccountRepository.getAllAccounts.mockResolvedValue(accounts);

      const result = await AccountService.getAccountsWithStats();

      expect(result.totalBalance).toBe(4000);
      expect(result.activeAccounts).toBe(2);
      expect(result.averageBalance).toBeCloseTo(4000 / 3);
    });
  });

  describe("createAccount", () => {
    it("delegates creation to repository with defaults", async () => {
      const created = makeAccount({ name: "New Account", type: "savings" });
      MockAccountRepository.createAccount.mockResolvedValue(created);

      const result = await AccountService.createAccount("New Account", "savings");

      expect(MockAccountRepository.createAccount).toHaveBeenCalledTimes(1);
      const callArg = MockAccountRepository.createAccount.mock.calls[0][0];
      expect(callArg.name).toBe("New Account");
      expect(callArg.balance).toBe(0);
      expect(result).toEqual(created);
    });

    it("passes initialBalance to repository", async () => {
      const created = makeAccount({ balance: 500 });
      MockAccountRepository.createAccount.mockResolvedValue(created);

      await AccountService.createAccount("Savings", "savings", 500);

      const callArg = MockAccountRepository.createAccount.mock.calls[0][0];
      expect(callArg.balance).toBe(500);
    });
  });

  describe("getAccountById", () => {
    it("returns account when found", async () => {
      const account = makeAccount();
      MockAccountRepository.getAccountById.mockResolvedValue(account);

      const result = await AccountService.getAccountById("acc_001");
      expect(result).toEqual(account);
    });

    it("returns null when not found", async () => {
      MockAccountRepository.getAccountById.mockResolvedValue(null);
      const result = await AccountService.getAccountById("nonexistent");
      expect(result).toBeNull();
    });
  });

  describe("updateAccount", () => {
    it("delegates update to repository", async () => {
      const updated = makeAccount({ name: "Renamed" });
      MockAccountRepository.updateAccount.mockResolvedValue(updated);

      const result = await AccountService.updateAccount("acc_001", { name: "Renamed" });
      expect(MockAccountRepository.updateAccount).toHaveBeenCalledWith("acc_001", { name: "Renamed" });
      expect(result.name).toBe("Renamed");
    });
  });

  describe("deleteAccount", () => {
    it("calls repository delete", async () => {
      MockAccountRepository.deleteAccount.mockResolvedValue(undefined);
      await AccountService.deleteAccount("acc_001");
      expect(MockAccountRepository.deleteAccount).toHaveBeenCalledWith("acc_001");
    });
  });
});
