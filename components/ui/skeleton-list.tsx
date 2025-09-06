import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface SkeletonListProps {
  count?: number
  className?: string
  itemClassName?: string
}

function SkeletonList({ count = 3, className, itemClassName }: SkeletonListProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={cn("space-y-2", itemClassName)}>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 border rounded-xl space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-20 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

export { SkeletonList, SkeletonCard }
