"use client"

import * as React from "react"
import { Header } from "@/components/navigation/header"
import { MapView } from "@/components/map/map-view"
import { SubmissionDrawer } from "@/components/map/submission-drawer"
import { KPIStat } from "@/components/ui/kpi-stat"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar } from "recharts"
import { translations, type Language } from "@/lib/i18n"
import type { Submission, District } from "@/lib/types"
import { MapPin, TrendingUp, AlertTriangle, Users, Droplets } from "lucide-react"

// Mock data - in real app, this would come from API
const mockSubmissions: Submission[] = [
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
  {
    id: "sub_003",
    timestamp: "2024-01-13T08:20:00Z",
    district: "sukkur",
    coordinates: [27.7125, 68.8445],
    classification: "Needs Testing",
    confidence: 0.67,
    indicators: [
      { name: "turbidity", score: 0.55, status: "moderate" },
      { name: "color_clarity", score: 0.48, status: "moderate" },
      { name: "oil_sheen", score: 0.12, status: "good" },
      { name: "debris", score: 0.34, status: "moderate" },
    ],
    submittedBy: "Local Volunteer",
    notes: "Slightly cloudy, requires lab analysis",
  },
  {
    id: "sub_004",
    timestamp: "2024-01-12T14:10:00Z",
    district: "dadu",
    coordinates: [26.7234, 67.7956],
    classification: "Unsafe",
    confidence: 0.91,
    indicators: [
      { name: "turbidity", score: 0.92, status: "poor" },
      { name: "color_clarity", score: 0.18, status: "poor" },
      { name: "oil_sheen", score: 0.67, status: "poor" },
      { name: "debris", score: 0.85, status: "poor" },
    ],
    submittedBy: "NDMA Inspector",
    notes: "Heavy contamination after industrial discharge",
  },
]

const mockDistricts: District[] = [
  { id: "karachi", name: "Karachi", nameUrdu: "کراچی", province: "Sindh", coordinates: [24.8607, 67.0011] },
  { id: "hyderabad", name: "Hyderabad", nameUrdu: "حیدرآباد", province: "Sindh", coordinates: [25.396, 68.3578] },
  { id: "sukkur", name: "Sukkur", nameUrdu: "سکھر", province: "Sindh", coordinates: [27.7058, 68.8574] },
  { id: "dadu", name: "Dadu", nameUrdu: "دادو", province: "Sindh", coordinates: [26.7297, 67.7822] },
  {
    id: "muzaffargarh",
    name: "Muzaffargarh",
    nameUrdu: "مظفرگڑھ",
    province: "Punjab",
    coordinates: [30.0704, 71.1925],
  },
  {
    id: "charsadda",
    name: "Charsadda",
    nameUrdu: "چارسدہ",
    province: "Khyber Pakhtunkhwa",
    coordinates: [34.1482, 71.7308],
  },
]

// Mock trend data
const trendData = [
  { date: "Jan 8", clean: 12, unsafe: 3, testing: 5 },
  { date: "Jan 9", clean: 15, unsafe: 2, testing: 4 },
  { date: "Jan 10", clean: 18, unsafe: 4, testing: 6 },
  { date: "Jan 11", clean: 14, unsafe: 5, testing: 3 },
  { date: "Jan 12", clean: 16, unsafe: 6, testing: 7 },
  { date: "Jan 13", clean: 20, unsafe: 2, testing: 4 },
  { date: "Jan 14", clean: 22, unsafe: 3, testing: 5 },
]

const districtData = [
  { district: "Karachi", submissions: 45 },
  { district: "Hyderabad", submissions: 32 },
  { district: "Sukkur", submissions: 28 },
  { district: "Dadu", submissions: 19 },
  { district: "Muzaffargarh", submissions: 15 },
  { district: "Charsadda", submissions: 12 },
]

export default function MapPage() {
  const [language, setLanguage] = React.useState<Language>("en")
  const [selectedSubmission, setSelectedSubmission] = React.useState<Submission | null>(null)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const t = translations[language]

  const handleSubmissionClick = (submission: Submission) => {
    setSelectedSubmission(submission)
    setDrawerOpen(true)
  }

  const stats = React.useMemo(() => {
    const total = mockSubmissions.length
    const unsafe = mockSubmissions.filter((s) => s.classification === "Unsafe").length
    const clean = mockSubmissions.filter((s) => s.classification === "Clean").length
    const districts = new Set(mockSubmissions.map((s) => s.district)).size

    return { total, unsafe, clean, districts }
  }, [])

  const chartConfig = {
    clean: { label: "Clean", color: "hsl(var(--chart-1))" },
    unsafe: { label: "Unsafe", color: "hsl(var(--chart-4))" },
    testing: { label: "Needs Testing", color: "hsl(var(--chart-3))" },
  }

  const districtChartConfig = {
    submissions: { label: "Submissions", color: "hsl(var(--chart-2))" },
  }

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="container max-w-7xl mx-auto py-6 px-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{t.map.title}</h1>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Interactive map showing water quality data and risk zones across Pakistan"
                  : "پاکستان بھر میں پانی کے معیار کا ڈیٹا اور خطرناک علاقوں کو دکھانے والا انٹرایکٹو نقشہ"}
              </p>
            </div>
          </div>

          {/* KPI Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPIStat
              title={language === "en" ? "Total Submissions" : "کل جمع کردہ"}
              value={stats.total}
              change={{ value: 12, period: "last week" }}
              icon={<Droplets className="h-5 w-5" />}
            />
            <KPIStat
              title={language === "en" ? "Unsafe Hotspots" : "غیر محفوظ علاقے"}
              value={stats.unsafe}
              change={{ value: -8, period: "last week" }}
              icon={<AlertTriangle className="h-5 w-5" />}
              variant="danger"
            />
            <KPIStat
              title={language === "en" ? "Clean Sources" : "صاف ذرائع"}
              value={stats.clean}
              change={{ value: 15, period: "last week" }}
              icon={<MapPin className="h-5 w-5" />}
              variant="success"
            />
            <KPIStat
              title={language === "en" ? "Districts Covered" : "احاطہ شدہ اضلاع"}
              value={stats.districts}
              change={{ value: 0, period: "last week" }}
              icon={<Users className="h-5 w-5" />}
            />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {language === "en" ? "Weekly Trend" : "ہفتہ وار رجحان"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Water quality submissions over time"
                    : "وقت کے ساتھ پانی کے معیار کی جمع کردہ معلومات"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <AreaChart data={trendData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="clean"
                      stackId="1"
                      stroke="var(--color-clean)"
                      fill="var(--color-clean)"
                    />
                    <Area
                      type="monotone"
                      dataKey="testing"
                      stackId="1"
                      stroke="var(--color-testing)"
                      fill="var(--color-testing)"
                    />
                    <Area
                      type="monotone"
                      dataKey="unsafe"
                      stackId="1"
                      stroke="var(--color-unsafe)"
                      fill="var(--color-unsafe)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {language === "en" ? "Submissions by District" : "ضلع کے حساب سے جمع کردہ"}
                </CardTitle>
                <CardDescription>
                  {language === "en" ? "Distribution across regions" : "علاقوں میں تقسیم"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={districtChartConfig}>
                  <BarChart data={districtData}>
                    <XAxis dataKey="district" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="submissions" fill="var(--color-submissions)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              <MapView
                submissions={mockSubmissions}
                districts={mockDistricts}
                onSubmissionClick={handleSubmissionClick}
                className="h-full"
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Submission Detail Drawer */}
      <SubmissionDrawer
        submission={selectedSubmission}
        districts={mockDistricts}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  )
}
