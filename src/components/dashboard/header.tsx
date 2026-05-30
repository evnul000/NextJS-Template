"use client"

import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function DashboardHeader({ title, description, actions }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        {description && <p className="text-gray-500 mt-2">{description}</p>}
      </div>
      {actions && <div className="flex gap-4">{actions}</div>}
    </div>
  )
}
