import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - FinanceHub",
  description: "Sign in to your FinanceHub account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
