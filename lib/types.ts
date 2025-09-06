export interface District {
  id: string
  name: string
  nameUrdu: string
  province: string
  coordinates: [number, number]
}

export interface Indicator {
  name: string
  score: number
  status: "good" | "moderate" | "poor"
}

export interface Submission {
  id: string
  timestamp: string
  district: string
  coordinates: [number, number]
  classification: "Clean" | "Unsafe" | "Needs Testing"
  confidence: number
  indicators: Indicator[]
  submittedBy: string
  notes: string
  imageUrl?: string
}

export interface Alert {
  id: string
  district: string
  riskLevel: "low" | "medium" | "high" | "critical"
  cause: "flood" | "drought" | "industrial_discharge" | "contamination" | "other"
  confidence: number
  issuedDate: string
  status: "active" | "resolved" | "expired"
  title: string
  titleUrdu: string
  description: string
  descriptionUrdu: string
  recommendations: string[]
  recommendationsUrdu: string[]
}

export interface AnalysisResult {
  classification: "Clean" | "Unsafe" | "Needs Testing"
  confidence: number
  indicators: Indicator[]
  explanation: string
  geo: {
    lat: number
    lng: number
    district: string
  }
  generatedReport: string
  suggestedActions: string[]
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  citations?: string[]
}

export type Language = "en" | "ur"

export interface User {
  id: string
  name: string
  email: string
  organization?: string
  role: "user" | "admin" | "ndma"
  preferences: {
    language: Language
    notifications: {
      sms: boolean
      email: boolean
      frequency: "immediate" | "daily" | "weekly"
    }
    mapDefaults: {
      tiles: string
      layers: string[]
    }
  }
}
