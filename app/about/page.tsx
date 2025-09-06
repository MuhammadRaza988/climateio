"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Camera, Map, Shield, Users, Zap } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Camera,
      title: "Computer Vision Analysis",
      description: "Advanced image processing to detect water quality indicators from smartphone photos",
    },
    {
      icon: Brain,
      title: "AI-Powered Classification",
      description: "Machine learning models trained on Pakistani water conditions for accurate risk assessment",
    },
    {
      icon: Map,
      title: "GIS Integration",
      description: "Real-time mapping and spatial analysis of water quality across Pakistan",
    },
    {
      icon: Shield,
      title: "Early Warning System",
      description: "Proactive alerts to communities about water safety risks and contamination events",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Crowdsourced data collection empowering local communities to monitor their water",
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "Instant analysis and recommendations for immediate water safety decisions",
    },
  ]

  const team = [
    { name: "Dr. Sarah Ahmed", role: "Lead Water Quality Specialist", org: "NDMA" },
    { name: "Muhammad Hassan", role: "AI/ML Engineer", org: "Climate.io" },
    { name: "Fatima Khan", role: "GIS Analyst", org: "WASA" },
    { name: "Dr. Ali Raza", role: "Public Health Advisor", org: "Ministry of Health" },
  ]

  const partners = [
    { name: "National Disaster Management Authority", abbr: "NDMA" },
    { name: "Water and Sanitation Agency", abbr: "WASA" },
    { name: "Pakistan Council of Research in Water Resources", abbr: "PCRWR" },
    { name: "World Health Organization", abbr: "WHO" },
    { name: "UNICEF Pakistan", abbr: "UNICEF" },
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About Climate.io</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          AI-powered water quality monitoring and early warning system designed specifically for Pakistan's diverse
          environmental challenges and community needs.
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">AI-Powered</Badge>
          <Badge variant="secondary">Open Source</Badge>
          <Badge variant="secondary">Community-Driven</Badge>
        </div>
      </div>

      <Tabs defaultValue="mission" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mission">Mission</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="mission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>Democratizing water quality monitoring across Pakistan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Climate.io was born from the urgent need to address water quality challenges in Pakistan, where millions
                of people lack access to safe drinking water. Our mission is to democratize water quality monitoring by
                making it accessible, affordable, and actionable for every community.
              </p>
              <p>
                We believe that technology should serve humanity's most basic needs. By combining artificial
                intelligence with community participation, we're creating a comprehensive early warning system that
                protects public health and empowers local decision-making.
              </p>
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Accessibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Making water quality testing as simple as taking a photo with your smartphone
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Accuracy</h4>
                  <p className="text-sm text-muted-foreground">
                    AI models trained specifically on Pakistani water conditions and local contamination patterns
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Action</h4>
                  <p className="text-sm text-muted-foreground">
                    Immediate recommendations and alerts that enable rapid response to water safety threats
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Advocacy</h4>
                  <p className="text-sm text-muted-foreground">
                    Data-driven insights that support policy decisions and resource allocation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
              <CardDescription>
                Advanced AI and modern web technologies for reliable water quality assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Model Architecture</CardTitle>
              <CardDescription>How our computer vision and machine learning systems work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Vision-Language Model (VLM)</h4>
                  <p className="text-sm text-muted-foreground">
                    Our primary model combines computer vision with natural language processing to analyze water images
                    and generate human-readable explanations. Trained on thousands of water samples from across
                    Pakistan.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Quality Indicators</h4>
                  <p className="text-sm text-muted-foreground">
                    The system analyzes multiple visual indicators including turbidity, color variations, oil sheens,
                    floating debris, and foam patterns to assess water safety.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Explainable AI</h4>
                  <p className="text-sm text-muted-foreground">
                    Every analysis includes visual overlays and detailed explanations, ensuring transparency and
                    building trust with communities and health officials.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Team</CardTitle>
              <CardDescription>Experts in water quality, AI, and public health working together</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {team.map((member, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <Badge variant="outline" className="mt-2">
                      {member.org}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partners & Collaborators</CardTitle>
              <CardDescription>Working with leading organizations to ensure impact and sustainability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner, index) => (
                  <div key={index} className="p-3 border rounded-lg text-center">
                    <div className="font-semibold text-sm">{partner.abbr}</div>
                    <div className="text-xs text-muted-foreground">{partner.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">50,000+</CardTitle>
                <CardDescription>Water samples analyzed</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">200+</CardTitle>
                <CardDescription>Communities served</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">87%</CardTitle>
                <CardDescription>Accuracy rate</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-World Impact</CardTitle>
              <CardDescription>Stories from communities using Climate.io</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Flood Response in Sindh</h4>
                <p className="text-sm text-muted-foreground">
                  During the 2023 monsoon floods, Climate.io helped identify contaminated water sources in 15 districts,
                  enabling rapid deployment of water purification units and preventing potential disease outbreaks.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Community Empowerment in Punjab</h4>
                <p className="text-sm text-muted-foreground">
                  Rural communities in Punjab now use Climate.io to monitor their tube wells and hand pumps, leading to
                  a 40% reduction in waterborne illness reports in participating villages.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Policy Impact</h4>
                <p className="text-sm text-muted-foreground">
                  Data from Climate.io has informed water quality standards updates and helped allocate resources for
                  water infrastructure improvements in high-risk areas.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
