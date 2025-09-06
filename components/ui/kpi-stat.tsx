import type * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface KPIStatProps {
  title: string
  value: string | number
  change?: {
    value: number
    period: string
  }
  icon?: React.ReactNode
  className?: string
  variant?: "default" | "success" | "warning" | "danger"
  trend?: "up" | "down" | "neutral"
}

function KPIStat({ title, value, change, icon, className, variant = "default", trend }: KPIStatProps) {
  const effectiveChange =
    change ||
    (trend
      ? {
          value: trend === "up" ? 1 : trend === "down" ? -1 : 0,
          period: "previous",
        }
      : undefined)

  const getTrendIcon = () => {
    if (!effectiveChange) return null

    if (effectiveChange.value > 0) {
      return <TrendingUp className="h-3 w-3 text-emerald-600" />
    } else if (effectiveChange.value < 0) {
      return <TrendingDown className="h-3 w-3 text-red-600" />
    } else {
      return <Minus className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getTrendColor = () => {
    if (!effectiveChange) return "text-muted-foreground"

    if (effectiveChange.value > 0) {
      return "text-emerald-600"
    } else if (effectiveChange.value < 0) {
      return "text-red-600"
    } else {
      return "text-muted-foreground"
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20"
      case "warning":
        return "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"
      case "danger":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
      default:
        return ""
    }
  }

  return (
    <Card className={cn("transition-all hover:shadow-md", getVariantStyles(), className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
          {effectiveChange && (
            <div className="flex items-center gap-1 text-xs">
              {getTrendIcon()}
              <span className={getTrendColor()}>
                {effectiveChange.value > 0 ? "+" : ""}
                {effectiveChange.value}%
              </span>
              <span className="text-muted-foreground">vs {effectiveChange.period}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { KPIStat }
