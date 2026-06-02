"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@/lib/clerk.client";

export default function Home() {
  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Accounts", href: "/accounts" },
    { label: "Transactions", href: "/transactions" },
    { label: "Reports", href: "/reports" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      <nav className="border-b border-blue-500/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">FinanceHub</h1>

          <div className="flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex gap-4 items-center">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                {/* Post-sign-out URL set via NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL in .env.local */}
                <UserButton />
              </SignedIn>

              <Link href="/dashboard">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

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

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {[
            { icon: "💼", title: "Account Management", desc: "Manage multiple accounts with real-time balance updates and detailed tracking." },
            { icon: "📊", title: "Analytics & Reports", desc: "Gain insights into your spending patterns with comprehensive analytics and reports." },
            { icon: "🔒", title: "Secure & Reliable", desc: "Enterprise-grade security with encrypted data storage and secure API endpoints." },
          ].map((f) => (
            <div key={f.title} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-colors">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-blue-100">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Template Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Dashboard", description: "Overview of accounts and recent transactions", icon: "📊", href: "/dashboard" },
              { title: "Accounts", description: "Manage and view all your accounts", icon: "🏦", href: "/accounts" },
              { title: "Transactions", description: "Track and filter all transactions", icon: "💸", href: "/transactions" },
              { title: "Reports", description: "Analytics and financial insights", icon: "📈", href: "/reports" },
            ].map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors cursor-pointer group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Built With Modern Technologies</h3>
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

      <footer className="border-t border-blue-500/30 backdrop-blur-md mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-blue-100">
          <p>&copy; 2026 FinanceHub. Built as a modern SaaS template for financial applications.</p>
          <p className="text-sm mt-2">Next.js 14 LTS • TypeScript • Tailwind CSS • Composer Pattern</p>
        </div>
      </footer>
    </main>
  );
}
