"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader({ title, children }) {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        {children}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
