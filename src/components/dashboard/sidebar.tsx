"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  icon?: React.ReactNode
}

interface SidebarProps {
  items: NavItem[]
  brand?: string
}

export function Sidebar({ items, brand = "FinanceApp" }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
      <div className="flex flex-col h-full">
        {/* Brand */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <span className="text-xl font-bold text-gray-900">{brand}</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="text-sm text-gray-500 text-center">v1.0.0</div>
        </div>
      </div>
    </aside>
  )
}
