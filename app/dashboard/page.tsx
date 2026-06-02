"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import type { Account, Transaction, DashboardStats } from "@/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch accounts
        const accountsRes = await fetch("/api/accounts");
        const accountsData = await accountsRes.json();

        if (accountsData.success && Array.isArray(accountsData.data.accounts)) {
          setAccounts(accountsData.data.accounts);

          // Calculate stats
          const stats: DashboardStats = {
            totalAccounts: accountsData.data.accounts.length,
            totalBalance: accountsData.data.totalBalance || 0,
            monthlyIncome: 0,
            monthlyExpense: 0,
            transactionCount: 0,
          };
          setStats(stats);
        } else {
          setAccounts([]);
        }

        // Fetch transactions
        const transactionsRes = await fetch("/api/transactions");
        const transactionsData = await transactionsRes.json();

        if (transactionsData.success && Array.isArray(transactionsData.data)) {
          setRecentTransactions(transactionsData.data.slice(0, 5));
        } else {
          setRecentTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your financial overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Accounts</p>
              <p className="text-2xl font-bold mt-2">{stats?.totalAccounts}</p>
            </div>
            <div className="text-3xl text-blue-500">💼</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Balance</p>
              <p className="text-2xl font-bold mt-2">
                ${stats?.totalBalance.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl text-green-500">💰</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Income</p>
              <p className="text-2xl font-bold mt-2">
                ${stats?.monthlyIncome.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl text-emerald-500">📈</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Expenses</p>
              <p className="text-2xl font-bold mt-2">
                ${stats?.monthlyExpense.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl text-orange-500">📊</div>
          </div>
        </Card>
      </div>

      {/* Accounts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => (
            <Card key={account.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{account.type}</p>
                  <p className="text-lg font-semibold mt-1">{account.name}</p>
                  <p className="text-2xl font-bold mt-2">
                    ${account.balance.toLocaleString()}
                  </p>
                </div>
                <div className="text-4xl">
                  {account.type === "checking"
                    ? "🏦"
                    : account.type === "savings"
                      ? "🏧"
                      : "💳"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.type === "income"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-right text-gray-900">
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}
