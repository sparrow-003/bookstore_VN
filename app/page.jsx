import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import FeaturedBooks from "@/components/featured-books"
import CategoriesSection from "@/components/categories-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedBooks />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  )
}
