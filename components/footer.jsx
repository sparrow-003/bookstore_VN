import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8" />
              <span className="font-serif text-xl font-bold">BookStore</span>
            </Link>
            <p className="text-background/70 max-w-md">
              Your one-stop destination for all things books! Discover, browse, and buy from our vast collection
              covering every genre.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-background/70">
              <li>
                <Link href="/books" className="hover:text-background transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-background transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-background transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-background transition-colors">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60 text-sm">
          <p>© {new Date().getFullYear()} BookStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
