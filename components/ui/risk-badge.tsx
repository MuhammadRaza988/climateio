import type * as React from "react"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const riskBadgeVariants = cva("", {
  variants: {
    risk: {
      clean:
        "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
      "needs-testing":
        "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
      unsafe: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
      low: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
      medium:
        "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
      high: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800",
      critical: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
    },
  },
  defaultVariants: {
    risk: "clean",
  },
})

interface RiskBadgeProps extends React.ComponentProps<typeof Badge>, VariantProps<typeof riskBadgeVariants> {
  risk: "clean" | "needs-testing" | "unsafe" | "low" | "medium" | "high" | "critical"
}

function RiskBadge({ className, risk, ...props }: RiskBadgeProps) {
  return <Badge variant="outline" className={cn(riskBadgeVariants({ risk }), className)} {...props} />
}

export { RiskBadge, riskBadgeVariants }
