import { Merriweather, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
})

const inter = Inter({
  subsets: ["latin"],
})

export const metadata = {
  title: "BookStore - Your One-Stop Book Destination",
  description: "Discover, browse, and buy books from our vast collection covering every genre, author, and language.",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
