import { cn } from "@/lib/utils"
import { Progress } from "./progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import type { Indicator } from "@/lib/types"

interface IndicatorListProps {
  indicators: Indicator[]
  className?: string
}

function IndicatorList({ indicators, className }: IndicatorListProps) {
  const getIndicatorColor = (status: Indicator["status"]) => {
    switch (status) {
      case "good":
        return "bg-emerald-500"
      case "moderate":
        return "bg-amber-500"
      case "poor":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getIndicatorLabel = (name: string) => {
    const labels: Record<string, string> = {
      turbidity: "Turbidity",
      color_clarity: "Color & Clarity",
      oil_sheen: "Oil Sheen",
      debris: "Debris",
      ph_level: "pH Level",
      dissolved_oxygen: "Dissolved Oxygen",
    }
    return labels[name] || name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <TooltipProvider>
      <div className={cn("space-y-4", className)}>
        {indicators.map((indicator, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{getIndicatorLabel(indicator.name)}</span>
              <span className="text-muted-foreground">{Math.round(indicator.score * 100)}%</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Progress value={indicator.score * 100} className="h-2" />
                  <div
                    className={cn(
                      "absolute top-0 left-0 h-2 rounded-full transition-all",
                      getIndicatorColor(indicator.status),
                    )}
                    style={{ width: `${indicator.score * 100}%` }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{getIndicatorLabel(indicator.name)}</p>
                <p className="text-xs text-muted-foreground">
                  Status: {indicator.status} • Score: {Math.round(indicator.score * 100)}%
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}

export { IndicatorList }
