import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts - FinanceHub",
  description: "Manage your financial accounts",
};

export default function AccountsLayout({
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
