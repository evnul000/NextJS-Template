import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - FinanceHub",
  description: "View your financial overview and dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard layout wrapper */}
      {children}
    </div>
  );
}
