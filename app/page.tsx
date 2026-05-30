"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/accounts", label: "Accounts", icon: "🏦" },
  { href: "/transactions", label: "Transactions", icon: "💸" },
  { href: "/reports", label: "Reports", icon: "📈" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
]

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar items={navItems} brand="FinanceHub" />

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <DashboardHeader
            title="Dashboard"
            description="Welcome back! Here's your financial overview."
            actions={
              <>
                <Button variant="outline">Export</Button>
                <Button>New Transaction</Button>
              </>
            }
          />

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Total Balance"
              value="$124,532.50"
              description="Your available funds"
              trend={{ value: 12.5, isPositive: true }}
              icon="💰"
            />
            <StatCard
              title="Monthly Revenue"
              value="$45,231.89"
              description="This month"
              trend={{ value: 8.2, isPositive: true }}
              icon="📈"
            />
            <StatCard
              title="Pending Transactions"
              value="12"
              description="Awaiting confirmation"
              trend={{ value: -3, isPositive: false }}
              icon="⏳"
            />
            <StatCard
              title="Account Health"
              value="Excellent"
              description="No issues detected"
              icon="✅"
            />
          </div>

          {/* Recent Transactions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    type: "Payment",
                    amount: "-$5,231.00",
                    description: "Invoice #INV-2024-001",
                    date: "Today",
                    status: "Completed",
                  },
                  {
                    id: 2,
                    type: "Deposit",
                    amount: "+$12,500.00",
                    description: "Client payment",
                    date: "Yesterday",
                    status: "Completed",
                  },
                  {
                    id: 3,
                    type: "Transfer",
                    amount: "-$2,000.00",
                    description: "Operating account",
                    date: "2 days ago",
                    status: "Pending",
                  },
                ].map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.amount.startsWith("+")
                            ? "text-green-600"
                            : "text-gray-900"
                        }`}
                      >
                        {transaction.amount}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Generate and send invoices to clients</p>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Request Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Request payment from clients</p>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">View Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Analyze your financial data</p>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
