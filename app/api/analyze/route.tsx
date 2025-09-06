import { type NextRequest, NextResponse } from "next/server"
import type { AnalysisResult, Indicator } from "@/lib/types"

// Mock analysis function that generates deterministic results based on filename
function generateMockAnalysis(filename: string, district: string): AnalysisResult {
  // Simple hash function for deterministic results
  const hash = filename.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  const absHash = Math.abs(hash)
  const seed = absHash % 1000

  // Determine classification based on seed
  let classification: "Clean" | "Unsafe" | "Needs Testing"
  let confidence: number
  let indicators: Indicator[]

  if (seed < 300) {
    // Clean water
    classification = "Clean"
    confidence = 0.85 + (seed % 15) / 100
    indicators = [
      { name: "turbidity", score: 0.1 + (seed % 20) / 100, status: "good" },
      { name: "color_clarity", score: 0.85 + (seed % 15) / 100, status: "good" },
      { name: "oil_sheen", score: 0.05 + (seed % 10) / 100, status: "good" },
      { name: "debris", score: 0.08 + (seed % 12) / 100, status: "good" },
    ]
  } else if (seed < 600) {
    // Needs testing
    classification = "Needs Testing"
    confidence = 0.65 + (seed % 20) / 100
    indicators = [
      { name: "turbidity", score: 0.4 + (seed % 30) / 100, status: "moderate" },
      { name: "color_clarity", score: 0.5 + (seed % 25) / 100, status: "moderate" },
      { name: "oil_sheen", score: 0.15 + (seed % 20) / 100, status: "good" },
      { name: "debris", score: 0.25 + (seed % 25) / 100, status: "moderate" },
    ]
  } else {
    // Unsafe water
    classification = "Unsafe"
    confidence = 0.88 + (seed % 12) / 100
    indicators = [
      { name: "turbidity", score: 0.75 + (seed % 25) / 100, status: "poor" },
      { name: "color_clarity", score: 0.2 + (seed % 30) / 100, status: "poor" },
      { name: "oil_sheen", score: 0.6 + (seed % 35) / 100, status: "poor" },
      { name: "debris", score: 0.7 + (seed % 30) / 100, status: "poor" },
    ]
  }

  // District coordinates (mock)
  const districtCoords: Record<string, [number, number]> = {
    karachi: [24.8607, 67.0011],
    hyderabad: [25.396, 68.3578],
    sukkur: [27.7058, 68.8574],
    dadu: [26.7297, 67.7822],
    muzaffargarh: [30.0704, 71.1925],
    charsadda: [34.1482, 71.7308],
  }

  const coords = districtCoords[district] || [24.8607, 67.0011]

  const explanations = {
    Clean:
      "The AI model detected clear water with minimal turbidity and no visible contaminants. Color analysis shows good clarity, and no oil sheen or significant debris was observed.",
    "Needs Testing":
      "The AI model detected moderate turbidity and some color changes that warrant further laboratory testing. While not immediately dangerous, professional analysis is recommended.",
    Unsafe:
      "The AI model detected high levels of turbidity, significant color changes, and visible contaminants including possible oil sheen and debris. This water should not be consumed without proper treatment.",
  }

  const reports = {
    Clean: `
      <h3>Water Quality Assessment Report</h3>
      <p><strong>Classification:</strong> Clean Water</p>
      <p><strong>Confidence Level:</strong> ${Math.round(confidence * 100)}%</p>
      <p><strong>Analysis Summary:</strong> The submitted water sample shows excellent quality indicators with minimal contamination signs.</p>
      <h4>Key Findings:</h4>
      <ul>
        <li>Low turbidity levels indicate good filtration</li>
        <li>Clear color suggests absence of harmful substances</li>
        <li>No visible oil contamination detected</li>
        <li>Minimal debris or particulate matter</li>
      </ul>
      <p><strong>Recommendation:</strong> This water appears safe for consumption, but regular monitoring is still advised.</p>
    `,
    "Needs Testing": `
      <h3>Water Quality Assessment Report</h3>
      <p><strong>Classification:</strong> Requires Laboratory Testing</p>
      <p><strong>Confidence Level:</strong> ${Math.round(confidence * 100)}%</p>
      <p><strong>Analysis Summary:</strong> The submitted water sample shows moderate quality concerns that require professional laboratory analysis.</p>
      <h4>Key Findings:</h4>
      <ul>
        <li>Moderate turbidity levels detected</li>
        <li>Some color variations observed</li>
        <li>Possible contamination indicators present</li>
        <li>Professional testing recommended</li>
      </ul>
      <p><strong>Recommendation:</strong> Seek laboratory testing before consumption. Consider alternative water sources temporarily.</p>
    `,
    Unsafe: `
      <h3>Water Quality Assessment Report</h3>
      <p><strong>Classification:</strong> Unsafe for Consumption</p>
      <p><strong>Confidence Level:</strong> ${Math.round(confidence * 100)}%</p>
      <p><strong>Analysis Summary:</strong> The submitted water sample shows significant contamination indicators and should not be consumed without proper treatment.</p>
      <h4>Key Findings:</h4>
      <ul>
        <li>High turbidity levels indicating heavy contamination</li>
        <li>Significant color changes suggesting pollutants</li>
        <li>Visible oil sheen detected</li>
        <li>Substantial debris and particulate matter</li>
      </ul>
      <p><strong>Recommendation:</strong> DO NOT CONSUME. Seek alternative clean water sources immediately and report to local authorities.</p>
    `,
  }

  const actionsByClassification = {
    Clean: [
      "Continue regular monitoring of water quality",
      "Store water in clean, covered containers",
      "Maintain good hygiene practices",
      "Report any changes in water appearance or taste",
    ],
    "Needs Testing": [
      "Take sample to nearest water testing facility",
      "Use alternative water source until results available",
      "Boil water for 3-5 minutes before consumption as precaution",
      "Monitor for any health symptoms",
    ],
    Unsafe: [
      "DO NOT consume this water",
      "Find alternative clean water source immediately",
      "Report contamination to local health authorities",
      "If consumed, seek medical attention if symptoms develop",
      "Use water purification tablets or boiling for emergency use only",
    ],
  }

  return {
    classification,
    confidence,
    indicators,
    explanation: explanations[classification],
    geo: {
      lat: coords[0],
      lng: coords[1],
      district,
    },
    generatedReport: reports[classification],
    suggestedActions: actionsByClassification[classification],
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File
    const district = formData.get("district") as string
    const notes = formData.get("notes") as string

    if (!image || !district) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock analysis result
    const result = generateMockAnalysis(image.name, district)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Analysis API error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
