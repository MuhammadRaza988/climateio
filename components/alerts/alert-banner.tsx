"use client"

import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RiskBadge } from "@/components/ui/risk-badge"

interface AlertBannerProps {
  alert: {
    id: string
    district: string
    risk: "low" | "medium" | "high"
    cause: string
    confidence: number
    issuedDate: string
    status: "active" | "resolved"
  }
}

export function AlertBanner({ alert }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed || alert.status === "resolved") return null

  return (
    <Alert variant={alert.risk === "high" ? "destructive" : "default"} className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        Water Quality Alert - {alert.district}
        <RiskBadge risk={alert.risk} />
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>
          {alert.cause} detected with {Math.round(alert.confidence * 100)}% confidence. Issued{" "}
          {new Date(alert.issuedDate).toLocaleDateString()}.
        </span>
        <Button variant="ghost" size="sm" onClick={() => setDismissed(true)} className="ml-4 h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
