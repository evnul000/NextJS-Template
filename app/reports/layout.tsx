import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports - FinanceHub",
  description: "View financial reports and analytics",
};

export default function ReportsLayout({
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
