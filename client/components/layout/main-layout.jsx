import Header from "@/components/header"
import Footer from "@/components/footer"

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
