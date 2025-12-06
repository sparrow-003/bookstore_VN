"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EmptyState({ icon: Icon, title, description, actionText, actionHref, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="mb-4 p-4 rounded-full bg-muted">
          <Icon className="h-10 w-10 text-muted-foreground" />
        </div>
      )}
      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="text-muted-foreground max-w-md mb-6">{description}</p>}
      {actionText && (actionHref || onAction) && (
        <>
          {actionHref ? (
            <Link href={actionHref}>
              <Button>{actionText}</Button>
            </Link>
          ) : (
            <Button onClick={onAction}>{actionText}</Button>
          )}
        </>
      )}
    </div>
  )
}
