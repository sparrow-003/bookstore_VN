import { Card, CardContent } from "@/components/ui/card"

export function StatCard({ title, value, icon: Icon, description, trend }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </div>
          {Icon && (
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
        {trend && (
          <p className={`text-xs mt-2 ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
            {trend > 0 ? "+" : ""}
            {trend}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}
