"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RiskBadge } from "@/components/ui/risk-badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Layers, Filter, Eye, EyeOff, Maximize2, RotateCcw } from "lucide-react"
import type { Submission, District } from "@/lib/types"

interface MapViewProps {
  submissions: Submission[]
  districts: District[]
  onSubmissionClick: (submission: Submission) => void
  className?: string
}

interface MapLayer {
  id: string
  name: string
  visible: boolean
  color: string
}

interface MapFilters {
  dateRange: string
  district: string
  riskLevel: string
  recentOnly: boolean
}

function MapView({ submissions, districts, onSubmissionClick, className }: MapViewProps) {
  const [layers, setLayers] = React.useState<MapLayer[]>([
    { id: "submissions", name: "Community Submissions", visible: true, color: "#059669" },
    { id: "heatmap", name: "Risk Heatmap", visible: true, color: "#dc2626" },
    { id: "districts", name: "District Boundaries", visible: false, color: "#6b7280" },
    { id: "alerts", name: "Active Alerts", visible: true, color: "#f59e0b" },
    { id: "satellite", name: "Satellite Overlay", visible: false, color: "#3b82f6" },
  ])

  const [filters, setFilters] = React.useState<MapFilters>({
    dateRange: "7days",
    district: "all",
    riskLevel: "all",
    recentOnly: false,
  })

  const [mapCenter] = React.useState<[number, number]>([30.3753, 69.3451]) // Pakistan center
  const [mapZoom] = React.useState(6)

  const toggleLayer = (layerId: string) => {
    setLayers((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, visible: !layer.visible } : layer)))
  }

  const resetFilters = () => {
    setFilters({
      dateRange: "7days",
      district: "all",
      riskLevel: "all",
      recentOnly: false,
    })
  }

  const filteredSubmissions = React.useMemo(() => {
    return submissions.filter((submission) => {
      // Date filter
      if (filters.dateRange !== "all") {
        const days = Number.parseInt(filters.dateRange.replace("days", ""))
        const cutoff = new Date()
        cutoff.setDate(cutoff.getDate() - days)
        if (new Date(submission.timestamp) < cutoff) return false
      }

      // District filter
      if (filters.district !== "all" && submission.district !== filters.district) {
        return false
      }

      // Risk level filter
      if (filters.riskLevel !== "all") {
        const riskMap: Record<string, string> = {
          clean: "Clean",
          unsafe: "Unsafe",
          testing: "Needs Testing",
        }
        if (submission.classification !== riskMap[filters.riskLevel]) {
          return false
        }
      }

      return true
    })
  }, [submissions, filters])

  const getMarkerColor = (classification: string) => {
    switch (classification) {
      case "Clean":
        return "#10b981"
      case "Unsafe":
        return "#ef4444"
      case "Needs Testing":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

  const stats = React.useMemo(() => {
    const total = filteredSubmissions.length
    const unsafe = filteredSubmissions.filter((s) => s.classification === "Unsafe").length
    const clean = filteredSubmissions.filter((s) => s.classification === "Clean").length
    const testing = filteredSubmissions.filter((s) => s.classification === "Needs Testing").length

    return { total, unsafe, clean, testing }
  }, [filteredSubmissions])

  return (
    <div className={cn("flex h-full", className)}>
      {/* Map Container */}
      <div className="flex-1 relative bg-muted/20 rounded-lg overflow-hidden">
        {/* Mock Map Display */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-10 space-y-2">
            <Button variant="outline" size="icon" className="bg-background/90 backdrop-blur">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-background/90 backdrop-blur">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          <Card className="absolute bottom-4 left-4 z-10 bg-background/90 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {layers
                .filter((layer) => layer.visible)
                .map((layer) => (
                  <div key={layer.id} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layer.color }} />
                    <span>{layer.name}</span>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Mock Map Markers */}
          <div className="absolute inset-0">
            {filteredSubmissions.slice(0, 20).map((submission, index) => {
              const x = 20 + (index % 5) * 150 + Math.random() * 100
              const y = 50 + Math.floor(index / 5) * 120 + Math.random() * 80
              return (
                <button
                  key={submission.id}
                  className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer z-20"
                  style={{
                    backgroundColor: getMarkerColor(submission.classification),
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                  onClick={() => onSubmissionClick(submission)}
                  title={`${submission.classification} - ${submission.district}`}
                />
              )
            })}
          </div>

          {/* Heatmap Overlay (Mock) */}
          {layers.find((l) => l.id === "heatmap")?.visible && (
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500/40 rounded-full blur-xl" />
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-yellow-500/40 rounded-full blur-xl" />
              <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-orange-500/40 rounded-full blur-xl" />
            </div>
          )}

          {/* District Boundaries (Mock) */}
          {layers.find((l) => l.id === "districts")?.visible && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M100,100 L300,120 L280,250 L120,240 Z"
                fill="none"
                stroke="#6b7280"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              />
              <path
                d="M320,80 L500,100 L480,200 L300,180 Z"
                fill="none"
                stroke="#6b7280"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              />
            </svg>
          )}
        </div>

        {/* Map Info Overlay */}
        <div className="absolute top-4 right-4 z-10">
          <Card className="bg-background/90 backdrop-blur">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{stats.clean}</div>
                  <div className="text-muted-foreground">Clean</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.unsafe}</div>
                  <div className="text-muted-foreground">Unsafe</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{stats.testing}</div>
                  <div className="text-muted-foreground">Testing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-muted-foreground">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="w-80 border-l bg-background/50 backdrop-blur">
        <div className="p-6 space-y-6 h-full overflow-y-auto">
          {/* Layers Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="h-4 w-4" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {layers.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layer.color }} />
                    <Label className="text-sm font-normal">{layer.name}</Label>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toggleLayer(layer.id)}>
                    {layer.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Date Range</Label>
                <Select
                  value={filters.dateRange}
                  onValueChange={(value) => setFilters((f) => ({ ...f, dateRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1days">Last 24 hours</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 3 months</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">District</Label>
                <Select
                  value={filters.district}
                  onValueChange={(value) => setFilters((f) => ({ ...f, district: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {districts.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Risk Level</Label>
                <Select
                  value={filters.riskLevel}
                  onValueChange={(value) => setFilters((f) => ({ ...f, riskLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="clean">Clean Only</SelectItem>
                    <SelectItem value="testing">Needs Testing</SelectItem>
                    <SelectItem value="unsafe">Unsafe Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recent"
                  checked={filters.recentOnly}
                  onCheckedChange={(checked) => setFilters((f) => ({ ...f, recentOnly: !!checked }))}
                />
                <Label htmlFor="recent" className="text-sm font-normal">
                  Show only recent (7 days)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Submissions</span>
                <Badge variant="outline">{stats.total}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Unsafe Hotspots</span>
                <Badge variant="destructive">{stats.unsafe}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Districts Covered</span>
                <Badge variant="outline">{new Set(filteredSubmissions.map((s) => s.district)).size}</Badge>
              </div>
              <Separator />
              <div className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredSubmissions.slice(0, 5).map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onSubmissionClick(submission)}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getMarkerColor(submission.classification) }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {districts.find((d) => d.id === submission.district)?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(submission.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <RiskBadge
                    risk={submission.classification.toLowerCase().replace(" ", "-") as any}
                    className="text-xs"
                  >
                    {submission.classification}
                  </RiskBadge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { MapView }
