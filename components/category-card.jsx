import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, BookOpen, Lightbulb, FlaskConical, Heart, Sparkles, Search, User, Landmark } from "lucide-react"

const iconMap = {
  "book-open": BookOpen,
  lightbulb: Lightbulb,
  flask: FlaskConical,
  heart: Heart,
  sparkles: Sparkles,
  search: Search,
  user: User,
  landmark: Landmark,
}

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || BookOpen

  return (
    <Link href={`/categories/${category.id}`}>
      <Card className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 flex-1">{category.description}</p>
          <div className="flex items-center text-primary mt-4 text-sm font-medium">
            Browse collection
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
