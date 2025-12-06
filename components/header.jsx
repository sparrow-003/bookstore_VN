"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, BookOpen, Menu, X, Shield, Package, Store } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
  const { cartCount } = useCart()
  const { user, isAuthenticated, isAdmin, isSeller, isOrganizer, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="font-serif text-xl font-bold text-foreground hidden sm:block">BookStore</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books, authors..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/books"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Books
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Categories
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium">{user?.name}</div>
                  <div className="px-2 py-0.5 text-xs text-muted-foreground capitalize">{user?.role}</div>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isSeller && (
                    <DropdownMenuItem asChild>
                      <Link href="/seller" className="flex items-center gap-2">
                        <Store className="h-4 w-4" />
                        Seller Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isOrganizer && !isAdmin && !isSeller && (
                    <DropdownMenuItem asChild>
                      <Link href="/organizer" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Organizer Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {(isAdmin || isOrganizer || isSeller) && <DropdownMenuSeparator />}
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search books, authors..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <nav className="flex flex-col gap-2">
              <Link
                href="/books"
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Books
              </Link>
              <Link
                href="/categories"
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
