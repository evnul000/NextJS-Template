"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement actual authentication logic
    console.log("Login attempt:", { email, password });

    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      // TODO: Redirect to dashboard after successful login
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md p-8 shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">FinanceHub</h1>
        <p className="text-gray-600 mt-2">Financial SaaS Platform</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </Card>
  );
}
