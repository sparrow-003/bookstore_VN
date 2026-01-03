import { Badge } from "@/components/ui/badge"

const statusStyles = {
  // Order statuses
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  delivered: "bg-green-100 text-green-800 hover:bg-green-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",

  // User/Book statuses
  active: "bg-green-100 text-green-800 hover:bg-green-100",
  inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",

  // Book types
  success: "bg-green-100 text-green-800 hover:bg-green-100",
  warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  info: "bg-blue-100 text-blue-800 hover:bg-blue-100",

  // Role statuses
  admin: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  organizer: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  user: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  seller: "bg-amber-100 text-amber-800 hover:bg-amber-100",
}

export function StatusBadge({ status, children }) {
  const displayText =
    children || (status ? status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, " ") : "Unknown")

  return (
    <Badge variant="secondary" className={statusStyles[status] || statusStyles.inactive}>
      {displayText}
    </Badge>
  )
}
