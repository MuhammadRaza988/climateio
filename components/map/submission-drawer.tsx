"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RiskBadge } from "@/components/ui/risk-badge"
import { IndicatorList } from "@/components/ui/indicator-list"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MapPin, Calendar, User, FileText, ExternalLink, AlertTriangle, CheckCircle, Clock, Share2 } from "lucide-react"
import type { Submission, District } from "@/lib/types"

interface SubmissionDrawerProps {
  submission: Submission | null
  districts: District[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

function SubmissionDrawer({ submission, districts, open, onOpenChange }: SubmissionDrawerProps) {
  if (!submission) return null

  const district = districts.find((d) => d.id === submission.district)

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case "Clean":
        return <CheckCircle className="h-5 w-5 text-emerald-600" />
      case "Unsafe":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "Needs Testing":
        return <Clock className="h-5 w-5 text-amber-600" />
      default:
        return null
    }
  }

  const handleCreateAlert = () => {
    // Navigate to alert creation or show modal
    console.log("Create alert for submission:", submission.id)
  }

  const handleViewInAnalyze = () => {
    // Navigate to analyze page with this submission data
    console.log("View in analyze:", submission.id)
  }

  const handleShare = async () => {
    const shareData = {
      title: `Water Quality Report - ${district?.name}`,
      text: `Water classification: ${submission.classification} in ${district?.name}`,
      url: `${window.location.origin}/map?submission=${submission.id}`,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
      }
    } catch (error) {
      console.error("Share error:", error)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {getClassificationIcon(submission.classification)}
            Water Quality Report
          </SheetTitle>
          <SheetDescription>Detailed analysis from {district?.name || submission.district}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Classification & Confidence */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <RiskBadge
                  risk={submission.classification.toLowerCase().replace(" ", "-") as any}
                  className="text-base px-4 py-2"
                >
                  {submission.classification}
                </RiskBadge>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Confidence</div>
                  <div className="text-xl font-bold">{Math.round(submission.confidence * 100)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{district?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {submission.coordinates[0].toFixed(4)}, {submission.coordinates[1].toFixed(4)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{new Date(submission.timestamp).toLocaleDateString()}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(submission.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{submission.submittedBy}</div>
                  <div className="text-sm text-muted-foreground">Submitted by</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quality Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <IndicatorList indicators={submission.indicators} />
            </CardContent>
          </Card>

          {/* Notes */}
          {submission.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{submission.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Separator />
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleViewInAnalyze}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Analyze
              </Button>
            </div>

            {submission.classification === "Unsafe" && (
              <Button onClick={handleCreateAlert} className="w-full" variant="destructive">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            )}
          </div>

          {/* Metadata */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Submission ID: {submission.id}</div>
                <div>Coordinates: {submission.coordinates.join(", ")}</div>
                <div>Analyzed: {new Date(submission.timestamp).toISOString()}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { SubmissionDrawer }
