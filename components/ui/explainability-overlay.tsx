"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"
import { Button } from "./button"
import { Eye, EyeOff } from "lucide-react"

interface ExplainabilityOverlayProps {
  imageUrl: string
  explanation?: string
  className?: string
  showToggle?: boolean
  language?: "en" | "ur"
}

interface HeatmapPoint {
  x: number
  y: number
  intensity: number
  label: string
}

export function ExplainabilityOverlay({
  imageUrl,
  explanation,
  className,
  showToggle = true,
  language = "en",
}: ExplainabilityOverlayProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)

  // Mock heatmap data - in real implementation, this would come from the AI model
  const heatmapPoints: HeatmapPoint[] = React.useMemo(
    () => [
      { x: 0.3, y: 0.4, intensity: 0.9, label: "High turbidity" },
      { x: 0.6, y: 0.3, intensity: 0.7, label: "Color variation" },
      { x: 0.4, y: 0.7, intensity: 0.5, label: "Surface texture" },
      { x: 0.8, y: 0.6, intensity: 0.3, label: "Edge detection" },
    ],
    [],
  )

  const drawHeatmap = React.useCallback(() => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image || !isVisible) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match image
    canvas.width = image.offsetWidth
    canvas.height = image.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw heatmap points
    heatmapPoints.forEach((point) => {
      const x = point.x * canvas.width
      const y = point.y * canvas.height
      const radius = 40 * point.intensity

      // Create radial gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)

      if (point.intensity > 0.7) {
        gradient.addColorStop(0, "rgba(239, 68, 68, 0.6)") // red
        gradient.addColorStop(1, "rgba(239, 68, 68, 0)")
      } else if (point.intensity > 0.4) {
        gradient.addColorStop(0, "rgba(245, 158, 11, 0.5)") // amber
        gradient.addColorStop(1, "rgba(245, 158, 11, 0)")
      } else {
        gradient.addColorStop(0, "rgba(34, 197, 94, 0.4)") // green
        gradient.addColorStop(1, "rgba(34, 197, 94, 0)")
      }

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fill()
    })
  }, [heatmapPoints, isVisible])

  React.useEffect(() => {
    if (isVisible) {
      // Small delay to ensure image is loaded
      const timer = setTimeout(drawHeatmap, 100)
      return () => clearTimeout(timer)
    }
  }, [isVisible, drawHeatmap])

  const getIntensityColor = (intensity: number) => {
    if (intensity > 0.7) return "text-red-600"
    if (intensity > 0.4) return "text-amber-600"
    return "text-green-600"
  }

  const getIntensityLabel = (intensity: number) => {
    if (intensity > 0.7) return language === "en" ? "High" : "زیادہ"
    if (intensity > 0.4) return language === "en" ? "Medium" : "درمیانہ"
    return language === "en" ? "Low" : "کم"
  }

  return (
    <div className={cn("relative", className)}>
      {/* Image */}
      <img
        ref={imageRef}
        src={imageUrl || "/placeholder.svg"}
        alt="Water sample"
        className="w-full h-64 object-cover rounded-lg border"
        onLoad={drawHeatmap}
      />

      {/* Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Toggle Button */}
      {showToggle && (
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 bg-background/90 backdrop-blur"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="ml-2">{language === "en" ? "AI Focus" : "AI فوکس"}</span>
        </Button>
      )}

      {/* Legend */}
      {isVisible && (
        <Card className="absolute bottom-2 left-2 right-2 bg-background/90 backdrop-blur">
          <CardContent className="p-3">
            <div className="space-y-2">
              <p className="text-xs font-medium">
                {language === "en" ? "AI Analysis Focus Areas:" : "AI تجزیہ کے فوکس علاقے:"}
              </p>

              {/* Color Legend */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>{language === "en" ? "High" : "زیادہ"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>{language === "en" ? "Medium" : "درمیانہ"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>{language === "en" ? "Low" : "کم"}</span>
                </div>
              </div>

              {/* Focus Points */}
              <div className="space-y-1">
                {heatmapPoints.slice(0, 3).map((point, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{point.label}</span>
                    <span className={cn("font-medium", getIntensityColor(point.intensity))}>
                      {getIntensityLabel(point.intensity)}
                    </span>
                  </div>
                ))}
              </div>

              {explanation && <p className="text-xs text-muted-foreground pt-1 border-t">{explanation}</p>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
