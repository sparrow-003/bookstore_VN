import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Container } from "@/client/components/layout/container"
import { ArrowRight, BookOpen, Users, Star } from "lucide-react"

function StatItem({ value, label, icon: Icon }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24 overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Discover Your Next
              <span className="text-primary"> Great Read</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Explore our vast collection of books covering every genre, author, and language. From timeless classics to
              the latest bestsellers, find your perfect book today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/books">
                <Button size="lg" className="gap-2">
                  Browse Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="bg-transparent">
                  View Categories
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8">
              <StatItem value="50K+" label="Books" icon={BookOpen} />
              <div className="w-px h-12 bg-border hidden sm:block" />
              <StatItem value="100K+" label="Readers" icon={Users} />
              <div className="w-px h-12 bg-border hidden sm:block" />
              <StatItem value="4.9" label="Rating" icon={Star} />
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-3 shadow-lg overflow-hidden">
                  <Image
                    src="/classic-fiction-book-cover.jpg"
                    alt="Fiction Book"
                    width={200}
                    height={280}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="bg-card rounded-2xl p-3 shadow-lg overflow-hidden">
                  <Image
                    src="/romance-novel-book-cover.jpg"
                    alt="Romance Book"
                    width={200}
                    height={280}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card rounded-2xl p-3 shadow-lg overflow-hidden">
                  <Image
                    src="/science-book-cosmos-space.jpg"
                    alt="Science Book"
                    width={200}
                    height={280}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="bg-card rounded-2xl p-3 shadow-lg overflow-hidden">
                  <Image
                    src="/mystery-thriller-book-cover.png"
                    alt="Mystery Book"
                    width={200}
                    height={280}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
