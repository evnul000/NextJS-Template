"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Account } from "@/types";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch("/api/accounts");
        const data = await res.json();
        if (data.success && Array.isArray(data.data.accounts)) {
          setAccounts(data.data.accounts);
        } else {
          setAccounts([]);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <div className="text-center">Loading accounts...</div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
            <p className="text-gray-600 mt-2">Manage all your financial accounts</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Add Account
          </Button>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {accounts.map((account) => (
          <Card key={account.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  {account.type}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  {account.name}
                </h3>
              </div>
              <div className="text-3xl">
                {account.type === "checking"
                  ? "🏦"
                  : account.type === "savings"
                    ? "🏧"
                    : account.type === "credit"
                      ? "💳"
                      : "📈"}
              </div>
            </div>

            <div className="mb-4 border-t pt-4">
              <p className="text-gray-600 text-sm">Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                ${account.balance.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">{account.currency}</p>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  account.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {account.isActive ? "Active" : "Inactive"}
              </span>
              <div className="flex gap-2">
                <Button className="text-xs bg-gray-200 text-gray-700 hover:bg-gray-300">
                  View
                </Button>
                <Button className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {accounts.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-600 mb-4">No accounts found</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Your First Account
          </Button>
        </Card>
      )}

      {/* Account Summary */}
      <Card className="p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Total Accounts</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{accounts.length}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Balance</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              ${accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Active Accounts</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {accounts.filter((acc) => acc.isActive).length}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Average Balance</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ${(
                accounts.reduce((sum, acc) => sum + acc.balance, 0) / (accounts.length || 1)
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
}
