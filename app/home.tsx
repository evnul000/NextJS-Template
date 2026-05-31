"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Navigation */}
      <nav className="border-b border-blue-500/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">FinanceHub</h1>
          <div className="flex gap-4">
            <Link href="/auth">
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Modern Financial SaaS Platform
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Manage your finances with a powerful, intuitive dashboard. Built with
            Next.js 14 LTS, TypeScript, and modern web technologies.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                Get Started
              </Button>
            </Link>
            <Button className="bg-blue-500/30 hover:bg-blue-500/40 text-white border border-white/30 px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-colors">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-white mb-3">Account Management</h3>
            <p className="text-blue-100">
              Manage multiple accounts with real-time balance updates and detailed
              tracking.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-colors">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Analytics & Reports</h3>
            <p className="text-blue-100">
              Gain insights into your spending patterns with comprehensive analytics
              and reports.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-colors">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-white mb-3">Secure & Reliable</h3>
            <p className="text-blue-100">
              Enterprise-grade security with encrypted data storage and secure API
              endpoints.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Built With Modern Technologies
          </h3>
          <div className="grid md:grid-cols-5 gap-4 text-center">
            {[
              { name: "Next.js 14 LTS", icon: "⚡" },
              { name: "TypeScript", icon: "📘" },
              { name: "React 18+", icon: "⚛️" },
              { name: "Tailwind CSS", icon: "🎨" },
              { name: "Shadcn UI", icon: "🧩" },
            ].map((tech) => (
              <div key={tech.name} className="p-4">
                <div className="text-3xl mb-2">{tech.icon}</div>
                <p className="text-white font-semibold text-sm">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/30 backdrop-blur-md mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-blue-100">
          <p>
            &copy; 2026 FinanceHub. Built as a modern SaaS template for financial
            applications.
          </p>
        </div>
      </footer>
    </main>
  );
}
