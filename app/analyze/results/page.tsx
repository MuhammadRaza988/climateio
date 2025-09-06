"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/navigation/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RiskBadge } from "@/components/ui/risk-badge"
import { IndicatorList } from "@/components/ui/indicator-list"
import { Badge } from "@/components/ui/badge"
import { translations, type Language } from "@/lib/i18n"
import type { AnalysisResult } from "@/lib/types"
import { ArrowLeft, Download, Share2, Map, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { toast } from "sonner"
import { ExplainabilityOverlay } from "@/components/ui/explainability-overlay"

export default function ResultsPage() {
  const router = useRouter()
  const [language, setLanguage] = React.useState<Language>("en")
  const [result, setResult] = React.useState<AnalysisResult | null>(null)
  const [imageUrl, setImageUrl] = React.useState<string | null>(null)
  const t = translations[language]

  React.useEffect(() => {
    // Get analysis result from sessionStorage
    const storedResult = sessionStorage.getItem("analysisResult")
    const storedImage = sessionStorage.getItem("uploadedImage")

    if (storedResult && storedImage) {
      setResult(JSON.parse(storedResult))
      setImageUrl(storedImage)
    } else {
      // Redirect back to analyze if no result
      router.push("/analyze")
    }
  }, [router])

  const handleDownloadReport = async () => {
    if (!result) return

    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result, language }),
      })

      if (!response.ok) throw new Error("Failed to generate report")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `water-analysis-report-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(language === "en" ? "Report downloaded successfully" : "رپورٹ کامیابی سے ڈاؤن لوڈ ہوئی")
    } catch (error) {
      console.error("Download error:", error)
      toast.error(language === "en" ? "Failed to download report" : "رپورٹ ڈاؤن لوڈ کرنے میں ناکام")
    }
  }

  const handleShare = async () => {
    if (!result) return

    const shareData = {
      title: "Water Quality Analysis Results",
      text: `Water classification: ${result.classification} (${Math.round(result.confidence * 100)}% confidence)`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success(language === "en" ? "Link copied to clipboard" : "لنک کلپ بورڈ میں کاپی ہوا")
      }
    } catch (error) {
      console.error("Share error:", error)
    }
  }

  const handleSubmitToMap = async () => {
    if (!result) return

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classification: result.classification,
          confidence: result.confidence,
          indicators: result.indicators,
          geo: result.geo,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error("Failed to submit to map")

      toast.success(language === "en" ? "Submitted to community map" : "کمیونٹی میپ میں جمع کر دیا گیا")
      router.push("/map")
    } catch (error) {
      console.error("Submit error:", error)
      toast.error(language === "en" ? "Failed to submit to map" : "میپ میں جمع کرنے میں ناکام")
    }
  }

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

  if (!result || !imageUrl) {
    return (
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="container max-w-4xl mx-auto py-8 px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading results...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="container max-w-6xl mx-auto py-8 px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {language === "en" ? "Analysis Results" : "تجزیہ کے نتائج"}
                </h1>
                <p className="text-muted-foreground">
                  {language === "en" ? "AI-powered water quality assessment" : "AI سے چلنے والا پانی کے معیار کا جائزہ"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                {t.actions.share}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                {t.actions.download}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image & Explainability */}
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Uploaded Image" : "اپ لوڈ شدہ تصویر"}</CardTitle>
              </CardHeader>
              <CardContent>
                <ExplainabilityOverlay
                  imageUrl={imageUrl || "/placeholder.svg"}
                  explanation={result.explanation}
                  language={language}
                  showToggle={true}
                />
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {/* Classification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getClassificationIcon(result.classification)}
                    {t.results.classification}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <RiskBadge
                      risk={result.classification.toLowerCase().replace(" ", "-") as any}
                      className="text-base px-4 py-2"
                    >
                      {result.classification}
                    </RiskBadge>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{t.results.confidence}</p>
                      <p className="text-2xl font-bold">{Math.round(result.confidence * 100)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.results.indicators}</CardTitle>
                </CardHeader>
                <CardContent>
                  <IndicatorList indicators={result.indicators} />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t.results.explanation}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{result.explanation}</p>
            </CardContent>
          </Card>

          {/* Generated Report */}
          <Card>
            <CardHeader>
              <CardTitle>{t.results.report}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Detailed analysis report in your selected language"
                  : "آپ کی منتخب کردہ زبان میں تفصیلی تجزیہ رپورٹ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: result.generatedReport }} />
              </div>
            </CardContent>
          </Card>

          {/* Recommended Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{t.results.actions}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {result.suggestedActions.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Badge variant="outline" className="mt-0.5">
                      {index + 1}
                    </Badge>
                    <p className="text-sm">{action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleSubmitToMap} size="lg">
              <Map className="mr-2 h-4 w-4" />
              {t.actions.viewMap}
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/analyze">{language === "en" ? "Analyze Another Sample" : "دوسرا نمونہ تجزیہ کریں"}</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
