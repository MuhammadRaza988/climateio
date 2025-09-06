import { type NextRequest, NextResponse } from "next/server"
import type { Submission } from "@/lib/types"

// Mock in-memory storage (in real app, use database)
const submissions: Submission[] = [
  {
    id: "sub_001",
    timestamp: "2024-01-15T10:30:00Z",
    district: "karachi",
    coordinates: [24.8615, 67.0099],
    classification: "Clean",
    confidence: 0.89,
    indicators: [
      { name: "turbidity", score: 0.15, status: "good" },
      { name: "color_clarity", score: 0.92, status: "good" },
      { name: "oil_sheen", score: 0.05, status: "good" },
      { name: "debris", score: 0.08, status: "good" },
    ],
    submittedBy: "Community Health Worker",
    notes: "Clear water from municipal supply",
  },
  {
    id: "sub_002",
    timestamp: "2024-01-14T15:45:00Z",
    district: "hyderabad",
    coordinates: [25.3845, 68.3712],
    classification: "Unsafe",
    confidence: 0.94,
    indicators: [
      { name: "turbidity", score: 0.87, status: "poor" },
      { name: "color_clarity", score: 0.23, status: "poor" },
      { name: "oil_sheen", score: 0.45, status: "moderate" },
      { name: "debris", score: 0.78, status: "poor" },
    ],
    submittedBy: "Field Researcher",
    notes: "Post-flood contamination visible",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const bbox = searchParams.get("bbox")
  const district = searchParams.get("district")
  const from = searchParams.get("from")
  const to = searchParams.get("to")

  let filteredSubmissions = [...submissions]

  // Filter by district
  if (district && district !== "all") {
    filteredSubmissions = filteredSubmissions.filter((s) => s.district === district)
  }

  // Filter by date range
  if (from) {
    const fromDate = new Date(from)
    filteredSubmissions = filteredSubmissions.filter((s) => new Date(s.timestamp) >= fromDate)
  }

  if (to) {
    const toDate = new Date(to)
    filteredSubmissions = filteredSubmissions.filter((s) => new Date(s.timestamp) <= toDate)
  }

  // Filter by bounding box (if provided)
  if (bbox) {
    const [minLng, minLat, maxLng, maxLat] = bbox.split(",").map(Number)
    filteredSubmissions = filteredSubmissions.filter((s) => {
      const [lat, lng] = s.coordinates
      return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng
    })
  }

  return NextResponse.json(filteredSubmissions)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const newSubmission: Submission = {
      id: `sub_${Date.now()}`,
      timestamp: data.timestamp || new Date().toISOString(),
      district: data.district,
      coordinates: [data.geo?.lat || 0, data.geo?.lng || 0],
      classification: data.classification,
      confidence: data.confidence,
      indicators: data.indicators,
      submittedBy: data.submittedBy || "Anonymous",
      notes: data.notes || "",
    }

    submissions.push(newSubmission)

    return NextResponse.json(newSubmission, { status: 201 })
  } catch (error) {
    console.error("Submission API error:", error)
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 })
  }
}
