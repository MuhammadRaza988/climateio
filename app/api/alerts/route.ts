import { type NextRequest, NextResponse } from "next/server"

const alerts = [
  {
    id: "alert-1",
    district: "Karachi",
    risk: "high" as const,
    cause: "Industrial runoff detected",
    confidence: 0.92,
    issuedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active" as const,
    message:
      "High levels of industrial contamination detected in water supply. Avoid consumption and use alternative sources. Boil water for at least 5 minutes before use.",
    ttl: 48,
  },
  {
    id: "alert-2",
    district: "Hyderabad",
    risk: "medium" as const,
    cause: "Flood contamination",
    confidence: 0.78,
    issuedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active" as const,
    message:
      "Recent flooding may have contaminated local water sources. Test water before consumption and use purification tablets if available.",
    ttl: 24,
  },
  {
    id: "alert-3",
    district: "Sukkur",
    risk: "low" as const,
    cause: "Seasonal turbidity increase",
    confidence: 0.65,
    issuedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "resolved" as const,
    message:
      "Temporary increase in water turbidity due to seasonal changes. Water quality has returned to normal levels.",
    ttl: 12,
  },
  {
    id: "alert-4",
    district: "Dadu",
    risk: "high" as const,
    cause: "Bacterial contamination",
    confidence: 0.88,
    issuedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: "resolved" as const,
    message:
      "Bacterial contamination detected in municipal water supply. Chlorination treatment has been completed and water is now safe.",
    ttl: 72,
  },
]

export async function GET() {
  return NextResponse.json(alerts)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newAlert = {
      id: `alert-${Date.now()}`,
      ...body,
    }

    alerts.unshift(newAlert)

    return NextResponse.json(newAlert, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 })
  }
}
