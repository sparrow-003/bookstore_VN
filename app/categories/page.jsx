import Header from "@/components/header"
import Footer from "@/components/footer"
import CategoryCard from "@/components/category-card"
import { categories } from "@/lib/books-data"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Browse Categories</h1>
            <p className="text-muted-foreground mt-2">Explore our collection organized by genre</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
