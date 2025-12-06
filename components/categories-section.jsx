"use client"

import { useEffect, useState } from "react"
import CategoryCard from "@/components/category-card"
import { SectionHeader } from "@/client/components/ui/section-header"
import { LoadingSpinner } from "@/client/components/ui/loading-spinner"
import { Container } from "@/client/components/layout/container"

export default function CategoriesSection() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="flex justify-center py-12">
            <LoadingSpinner text="Loading categories..." />
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/50">
      <Container>
        <SectionHeader
          title="Browse by Category"
          subtitle="Find your perfect genre"
          linkText="All Categories"
          linkHref="/categories"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 8).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  )
}
