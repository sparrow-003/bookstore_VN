"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, LayoutDashboard, Package, Users, ShoppingCart, LogOut, Book, Store, DollarSign } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/books", label: "Books", icon: Book },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/sellers", label: "Sellers", icon: Store },
  { href: "/admin/inventory", label: "Inventory", icon: Package },
]

const sellerLinks = [
  { href: "/seller", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/books", label: "My Books", icon: Book },
  { href: "/seller/orders", label: "Orders", icon: ShoppingCart },
  { href: "/seller/inventory", label: "Inventory", icon: Package },
  { href: "/seller/earnings", label: "Earnings", icon: DollarSign },
]

const organizerLinks = [
  { href: "/organizer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/organizer/books", label: "Books", icon: Book },
  { href: "/organizer/inventory", label: "Inventory", icon: Package },
  { href: "/organizer/orders", label: "Orders", icon: ShoppingCart },
]

export function DashboardSidebar({ type = "admin" }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const links = type === "admin" ? adminLinks : type === "seller" ? sellerLinks : organizerLinks
  const panelName = type === "admin" ? "Admin" : type === "seller" ? "Seller" : "Organizer"

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="font-serif text-xl font-bold">BookStore</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">{panelName} Panel</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">{user?.name?.charAt(0) || "U"}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
