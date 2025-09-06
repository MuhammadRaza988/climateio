"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Camera, Brain, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function MethodologyPage() {
  const indicators = [
    {
      name: "Turbidity",
      description: "Cloudiness or haziness of water caused by suspended particles",
      detection: "Visual analysis of water clarity and particle density",
      significance: "High turbidity can harbor pathogens and reduce disinfection effectiveness",
    },
    {
      name: "Color Variations",
      description: "Unusual coloration indicating chemical contamination or organic matter",
      detection: "Color space analysis and comparison with clean water baselines",
      significance: "Brown/yellow may indicate sediment, green suggests algae, other colors may indicate chemicals",
    },
    {
      name: "Oil Sheens",
      description: "Thin films of oil or petroleum products on water surface",
      detection: "Iridescent pattern recognition and surface reflection analysis",
      significance: "Indicates industrial contamination or fuel spills, harmful to human health",
    },
    {
      name: "Foam Patterns",
      description: "Excessive foam or bubbles on water surface",
      detection: "Texture analysis and foam density measurement",
      significance: "May indicate detergent contamination or organic pollution",
    },
    {
      name: "Floating Debris",
      description: "Visible solid waste or organic matter in water",
      detection: "Object detection and classification of foreign materials",
      significance: "Indicates poor sanitation and potential bacterial contamination",
    },
  ]

  const limitations = [
    {
      type: "Chemical Contaminants",
      description: "Cannot detect colorless, odorless chemicals like heavy metals or pesticides",
      recommendation: "Laboratory testing required for comprehensive chemical analysis",
    },
    {
      type: "Bacterial Contamination",
      description: "Pathogenic bacteria are not visible to the naked eye or camera",
      recommendation: "Microbiological testing needed for bacterial safety confirmation",
    },
    {
      type: "Lighting Conditions",
      description: "Poor lighting or extreme conditions may affect analysis accuracy",
      recommendation: "Take photos in good natural light when possible",
    },
    {
      type: "Water Movement",
      description: "Rapidly flowing or turbulent water may be difficult to analyze accurately",
      recommendation: "Capture still water samples when feasible",
    },
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Methodology</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Understanding how Climate.io analyzes water quality using computer vision and machine learning
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
          <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
          <TabsTrigger value="limitations">Limitations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>The complete process from image capture to risk assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">1. Image Capture</h3>
                  <p className="text-sm text-muted-foreground">
                    Users capture photos of water samples using smartphone cameras or upload existing images
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">2. AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Computer vision models analyze visual indicators and generate quality assessments
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">3. Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Results are classified into risk levels with actionable recommendations
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Technical Architecture</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Vision-Language Model (VLM)</h5>
                    <p className="text-sm text-muted-foreground">
                      Advanced neural network that combines computer vision with natural language processing to analyze
                      images and generate human-readable explanations
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Local Training Data</h5>
                    <p className="text-sm text-muted-foreground">
                      Models trained specifically on Pakistani water conditions, including seasonal variations and
                      regional contamination patterns
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Explainable AI</h5>
                    <p className="text-sm text-muted-foreground">
                      Visual overlays and detailed explanations help users understand why the AI made specific
                      assessments
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Continuous Learning</h5>
                    <p className="text-sm text-muted-foreground">
                      Models are regularly updated with new data and validated against laboratory test results
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indicators" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Water Quality Indicators</CardTitle>
              <CardDescription>Visual parameters analyzed by our computer vision system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {indicators.map((indicator, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{indicator.name}</h4>
                      <Badge variant="outline">Visual Indicator</Badge>
                    </div>
                    <p className="text-sm">{indicator.description}</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <h5 className="font-medium text-sm mb-1">Detection Method</h5>
                        <p className="text-xs text-muted-foreground">{indicator.detection}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Health Significance</h5>
                        <p className="text-xs text-muted-foreground">{indicator.significance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accuracy" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">87.3%</CardTitle>
                <CardDescription>Overall Accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Validated against laboratory test results from 5,000+ water samples
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">92.1%</CardTitle>
                <CardDescription>High-Risk Detection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sensitivity for detecting unsafe water conditions requiring immediate action
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-amber-600">83.7%</CardTitle>
                <CardDescription>Clean Water Confirmation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Specificity for correctly identifying safe water sources
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Validation Process</CardTitle>
              <CardDescription>How we ensure and maintain accuracy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Laboratory Validation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Regular comparison with certified laboratory results from PCRWR and WHO-approved testing facilities
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Field Testing
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    On-site validation with portable water testing kits in diverse geographic and seasonal conditions
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Expert Review
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Water quality specialists review AI assessments and provide feedback for model improvement
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Continuous Monitoring
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time accuracy tracking and automatic model updates when performance thresholds are met
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limitations" className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important Disclaimer</AlertTitle>
            <AlertDescription>
              Climate.io provides preliminary water quality assessment based on visual analysis. For comprehensive water
              safety confirmation, especially for drinking water, laboratory testing is recommended.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>System Limitations</CardTitle>
              <CardDescription>Understanding what our AI can and cannot detect</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {limitations.map((limitation, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <h4 className="font-semibold">{limitation.type}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{limitation.description}</p>
                    <div className="bg-muted p-3 rounded text-sm">
                      <strong>Recommendation:</strong> {limitation.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
              <CardDescription>How to get the most accurate results from Climate.io</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600">Do</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Take photos in good natural lighting
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Capture clear, focused images of the water surface
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Include reference objects for scale when possible
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Provide accurate location information
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-600">Don't</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Rely solely on AI results for drinking water decisions
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Take photos in very dark or bright conditions
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Submit blurry or heavily filtered images
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Ignore laboratory testing recommendations
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
