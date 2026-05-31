"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {[
                { id: "profile", label: "Profile" },
                { id: "security", label: "Security" },
                { id: "notifications", label: "Notifications" },
                { id: "billing", label: "Billing" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div className="pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Security Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Update Password
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" id="email" className="mr-3" defaultChecked />
                  <label htmlFor="email" className="text-gray-700">
                    Email notifications for transactions
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="alerts" className="mr-3" defaultChecked />
                  <label htmlFor="alerts" className="text-gray-700">
                    Alert notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="reports" className="mr-3" />
                  <label htmlFor="reports" className="text-gray-700">
                    Monthly reports
                  </label>
                </div>
                <div className="pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Billing Information
              </h2>
              <div className="text-gray-600">
                <p className="mb-4">Manage your billing and subscription details.</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Manage Subscription
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
