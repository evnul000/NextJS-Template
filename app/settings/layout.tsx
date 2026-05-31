import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - FinanceHub",
  description: "Manage your account settings",
};

export default function SettingsLayout({
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
