"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { AlertTriangle, TrendingUp, MapPin, Settings, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { KPIStat } from "@/components/ui/kpi-stat"
import { AlertComposer } from "@/components/alerts/alert-composer"
import { RiskBadge } from "@/components/ui/risk-badge"

const riskTrendData = [
  { district: "Karachi", jan: 65, feb: 72, mar: 58, apr: 81, may: 69 },
  { district: "Hyderabad", jan: 45, feb: 52, mar: 48, apr: 67, may: 71 },
  { district: "Sukkur", jan: 35, feb: 38, mar: 42, apr: 39, may: 44 },
  { district: "Dadu", jan: 55, feb: 61, mar: 58, apr: 73, may: 68 },
  { district: "Muzaffargarh", jan: 42, feb: 48, mar: 45, apr: 52, may: 49 },
]

const submissionTrendData = [
  { month: "Jan", submissions: 124, alerts: 8 },
  { month: "Feb", submissions: 156, alerts: 12 },
  { month: "Mar", submissions: 189, alerts: 15 },
  { month: "Apr", submissions: 234, alerts: 22 },
  { month: "May", submissions: 198, alerts: 18 },
]

const thresholdSettings = [
  { parameter: "Turbidity", low: 5, medium: 15, high: 25, unit: "NTU" },
  { parameter: "pH", low: 6.5, medium: 8.5, high: 9.5, unit: "" },
  { parameter: "Chlorine", low: 0.2, medium: 4.0, high: 8.0, unit: "mg/L" },
  { parameter: "Bacteria", low: 0, medium: 10, high: 100, unit: "CFU/100ml" },
]

export default function NDMAPage() {
  const [submissions, setSubmissions] = useState([])
  const [alerts, setAlerts] = useState([])
  const [thresholds, setThresholds] = useState(thresholdSettings)

  useEffect(() => {
    // Fetch recent submissions and alerts
    Promise.all([fetch("/api/submissions").then((res) => res.json()), fetch("/api/alerts").then((res) => res.json())])
      .then(([submissionsData, alertsData]) => {
        setSubmissions(submissionsData.slice(0, 10))
        setAlerts(alertsData.slice(0, 5))
      })
      .catch(console.error)
  }, [])

  const updateThreshold = (parameter: string, level: string, value: number) => {
    setThresholds((prev) =>
      prev.map((threshold) => (threshold.parameter === parameter ? { ...threshold, [level]: value } : threshold)),
    )
  }

  const activeAlerts = alerts.filter((alert) => alert.status === "active")
  const todaySubmissions = submissions.filter((sub) => {
    const today = new Date().toDateString()
    return new Date(sub.timestamp).toDateString() === today
  })

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NDMA Operations Dashboard</h1>
          <p className="text-muted-foreground">Monitor water quality across Pakistan and manage alerts</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Admin Access
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="alerts">Alert Composer</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <KPIStat
              title="Active Alerts"
              value={activeAlerts.length}
              icon={<AlertTriangle className="h-4 w-4" />}
              variant={activeAlerts.length > 3 ? "danger" : "default"}
              change={{ value: 12, period: "last week" }}
            />
            <KPIStat
              title="Today's Submissions"
              value={todaySubmissions.length}
              icon={<Activity className="h-4 w-4" />}
              change={{ value: -8, period: "yesterday" }}
            />
            <KPIStat
              title="Districts Monitored"
              value={new Set(submissions.map((s) => s.district)).size}
              icon={<MapPin className="h-4 w-4" />}
              variant="success"
            />
            <KPIStat
              title="System Accuracy"
              value="87.3%"
              icon={<TrendingUp className="h-4 w-4" />}
              variant="success"
              change={{ value: 2.1, period: "last month" }}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Submission Trends</CardTitle>
                <CardDescription>Monthly submissions and alerts generated</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    submissions: { label: "Submissions", color: "hsl(var(--chart-1))" },
                    alerts: { label: "Alerts", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={submissionTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="submissions" fill="var(--color-submissions)" />
                      <Bar dataKey="alerts" fill="var(--color-alerts)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Latest water quality submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {submissions.slice(0, 8).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{submission.district}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(submission.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <RiskBadge risk={submission.classification.toLowerCase()} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alert Queue</CardTitle>
              <CardDescription>Recent alerts requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>District</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Cause</TableHead>
                    <TableHead>Issued</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.district}</TableCell>
                      <TableCell>
                        <RiskBadge risk={alert.risk} />
                      </TableCell>
                      <TableCell>{alert.cause}</TableCell>
                      <TableCell>{new Date(alert.issuedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={alert.status === "active" ? "default" : "secondary"}>{alert.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Forecast by District</CardTitle>
              <CardDescription>Predicted water quality risk levels over the next 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  jan: { label: "January", color: "hsl(var(--chart-1))" },
                  feb: { label: "February", color: "hsl(var(--chart-2))" },
                  mar: { label: "March", color: "hsl(var(--chart-3))" },
                  apr: { label: "April", color: "hsl(var(--chart-4))" },
                  may: { label: "May", color: "hsl(var(--chart-5))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="district" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="jan" stroke="var(--color-jan)" strokeWidth={2} />
                    <Line type="monotone" dataKey="feb" stroke="var(--color-feb)" strokeWidth={2} />
                    <Line type="monotone" dataKey="mar" stroke="var(--color-mar)" strokeWidth={2} />
                    <Line type="monotone" dataKey="apr" stroke="var(--color-apr)" strokeWidth={2} />
                    <Line type="monotone" dataKey="may" stroke="var(--color-may)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {riskTrendData.map((district) => (
              <Card key={district.district}>
                <CardHeader>
                  <CardTitle className="text-lg">{district.district}</CardTitle>
                  <CardDescription>Risk trend analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Risk</span>
                      <Badge variant={district.may > 60 ? "destructive" : district.may > 40 ? "secondary" : "default"}>
                        {district.may > 60 ? "High" : district.may > 40 ? "Medium" : "Low"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Trend</span>
                      <span className={`text-sm ${district.may > district.jan ? "text-red-600" : "text-green-600"}`}>
                        {district.may > district.jan ? "↗ Increasing" : "↘ Decreasing"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <AlertComposer />
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Risk Thresholds Configuration
              </CardTitle>
              <CardDescription>
                Adjust the thresholds for water quality parameters to fine-tune alert sensitivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {thresholds.map((threshold) => (
                  <div key={threshold.parameter} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{threshold.parameter}</h4>
                      <span className="text-sm text-muted-foreground">{threshold.unit}</span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-green-600">Low Risk Threshold</label>
                        <Input
                          type="number"
                          value={threshold.low?.toString() ?? "0"}
                          onChange={(e) => {
                            const numValue = Number.parseFloat(e.target.value) || 0
                            updateThreshold(threshold.parameter, "low", numValue)
                          }}
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-amber-600">Medium Risk Threshold</label>
                        <Input
                          type="number"
                          value={threshold.medium?.toString() ?? "0"}
                          onChange={(e) => {
                            const numValue = Number.parseFloat(e.target.value) || 0
                            updateThreshold(threshold.parameter, "medium", numValue)
                          }}
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-red-600">High Risk Threshold</label>
                        <Input
                          type="number"
                          value={threshold.high?.toString() ?? "0"}
                          onChange={(e) => {
                            const numValue = Number.parseFloat(e.target.value) || 0
                            updateThreshold(threshold.parameter, "high", numValue)
                          }}
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end pt-4">
                  <Button>Save Thresholds</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
