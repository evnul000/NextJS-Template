"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Account, Transaction } from "@/types";

interface ReportData {
  accounts: Account[];
  transactions: Transaction[];
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<"month" | "quarter" | "year">("month");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const [accountsRes, transactionsRes] = await Promise.all([
          fetch("/api/accounts"),
          fetch("/api/transactions"),
        ]);

        const accountsData = await accountsRes.json();
        const transactionsData = await transactionsRes.json();

        if (accountsData.success && transactionsData.success) {
          if (Array.isArray(accountsData.data.accounts) && Array.isArray(transactionsData.data)) {
            setReportData({
              accounts: accountsData.data.accounts,
              transactions: transactionsData.data,
            });
          } else {
            setReportData({
              accounts: [],
              transactions: [],
            });
          }
        } else {
          setReportData({
            accounts: [],
            transactions: [],
          });
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <div className="text-center">Loading reports...</div>
      </main>
    );
  }

  if (!reportData) {
    return (
      <main className="p-6">
        <div className="text-center text-red-600">Error loading report data</div>
      </main>
    );
  }

  const incomeTransactions = reportData.transactions.filter((t) => t.type === "income");
  const expenseTransactions = reportData.transactions.filter((t) => t.type === "expense");
  const transferTransactions = reportData.transactions.filter((t) => t.type === "transfer");

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalTransfers = transferTransactions.reduce((sum, t) => sum + t.amount, 0);

  const categoryBreakdown = reportData.transactions.reduce(
    (acc, t) => {
      const existing = acc.find((item) => item.category === t.category);
      if (existing) {
        existing.amount += t.amount;
        existing.count += 1;
      } else {
        acc.push({ category: t.category, amount: t.amount, count: 1 });
      }
      return acc;
    },
    [] as Array<{ category: string; amount: number; count: number }>
  );

  const accountBreakdown = reportData.accounts.map((account) => {
    const accountTransactions = reportData.transactions.filter(
      (t) => t.accountId === account.id
    );
    return {
      account,
      transactionCount: accountTransactions.length,
      income: accountTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
      expense: accountTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    };
  });

  return (
    <main className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-2">Financial analytics and insights</p>
          </div>
          <div className="flex gap-2">
            {(["month", "quarter", "year"] as const).map((range) => (
              <Button
                key={range}
                onClick={() => setDateRange(range)}
                className={`${
                  dateRange === range
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <p className="text-gray-600 text-sm">Total Income</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${totalIncome.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">{incomeTransactions.length} transactions</p>
        </Card>

        <Card className="p-6">
          <p className="text-gray-600 text-sm">Total Expenses</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            ${totalExpense.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">{expenseTransactions.length} transactions</p>
        </Card>

        <Card className="p-6">
          <p className="text-gray-600 text-sm">Net Income</p>
          <p
            className={`text-3xl font-bold mt-2 ${
              totalIncome - totalExpense >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${(totalIncome - totalExpense).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Income - Expenses</p>
        </Card>

        <Card className="p-6">
          <p className="text-gray-600 text-sm">Savings Rate</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0}%
          </p>
          <p className="text-xs text-gray-500 mt-1">Of total income</p>
        </Card>
      </div>

      {/* Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Breakdown */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {categoryBreakdown
              .sort((a, b) => b.amount - a.amount)
              .map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between pb-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.category}</p>
                    <p className="text-xs text-gray-500">{item.count} transactions</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${item.amount.toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        </Card>

        {/* Account Performance */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Activity</h2>
          <div className="space-y-3">
            {accountBreakdown.map((item) => (
              <div
                key={item.account.id}
                className="flex items-center justify-between pb-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.account.name}</p>
                  <p className="text-xs text-gray-500">{item.transactionCount} transactions</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">
                    +${item.income.toLocaleString()}
                  </p>
                  <p className="text-sm text-red-600">
                    -${item.expense.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Transactions by Category */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Top Spending Categories
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Count
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryBreakdown
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 10)
                .map((item) => (
                  <tr key={item.category} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {item.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.count}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      ${item.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {((item.amount / (totalIncome + totalExpense)) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Export Options */}
      <div className="mt-8 flex gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Export as PDF
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Export as CSV
        </Button>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white">
          Send Email Report
        </Button>
      </div>
    </main>
  );
}
