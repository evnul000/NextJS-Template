import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions - FinanceHub",
  description: "View and manage your transactions",
};

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
