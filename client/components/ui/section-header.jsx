import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function SectionHeader({ title, subtitle, linkText, linkHref }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
      </div>
      {linkText && linkHref && (
        <Link href={linkHref}>
          <Button variant="outline" className="gap-2 bg-transparent">
            {linkText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}
