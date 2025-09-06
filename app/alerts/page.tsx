"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Calendar, MapPin, TrendingUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RiskBadge } from "@/components/ui/risk-badge"
import { KPIStat } from "@/components/ui/kpi-stat"
import { AlertBanner } from "@/components/alerts/alert-banner"

interface Alert {
  id: string
  district: string
  risk: "low" | "medium" | "high"
  cause: string
  confidence: number
  issuedDate: string
  status: "active" | "resolved"
  message: string
  ttl: number
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  useEffect(() => {
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data)
        setFilteredAlerts(data)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const filtered = alerts.filter((alert) => {
      const matchesSearch =
        alert.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.cause.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || alert.status === statusFilter
      const matchesRisk = riskFilter === "all" || alert.risk === riskFilter

      return matchesSearch && matchesStatus && matchesRisk
    })

    setFilteredAlerts(filtered)
  }, [alerts, searchTerm, statusFilter, riskFilter])

  const activeAlerts = alerts.filter((alert) => alert.status === "active")
  const highRiskAlerts = alerts.filter((alert) => alert.risk === "high")
  const todayAlerts = alerts.filter((alert) => {
    const today = new Date().toDateString()
    return new Date(alert.issuedDate).toDateString() === today
  })

  return (
    <div className="container mx-auto py-8 space-y-6">
      {activeAlerts.length > 0 && <AlertBanner alert={activeAlerts[0]} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Early Warning Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage water quality alerts across Pakistan</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KPIStat
          title="Active Alerts"
          value={activeAlerts.length.toString()}
          icon={<AlertTriangle className="h-4 w-4" />}
          trend={activeAlerts.length > 0 ? "up" : "neutral"}
        />
        <KPIStat
          title="High Risk"
          value={highRiskAlerts.length.toString()}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={highRiskAlerts.length > 2 ? "up" : "down"}
        />
        <KPIStat
          title="Today's Alerts"
          value={todayAlerts.length.toString()}
          icon={<Calendar className="h-4 w-4" />}
          trend="neutral"
        />
        <KPIStat
          title="Districts Affected"
          value={new Set(activeAlerts.map((a) => a.district)).size.toString()}
          icon={<MapPin className="h-4 w-4" />}
          trend="neutral"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Search by district or cause..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alert History</CardTitle>
          <CardDescription>{filteredAlerts.length} alerts found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Cause</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.district}</TableCell>
                  <TableCell>
                    <RiskBadge risk={alert.risk} />
                  </TableCell>
                  <TableCell>{alert.cause}</TableCell>
                  <TableCell>{Math.round(alert.confidence * 100)}%</TableCell>
                  <TableCell>{new Date(alert.issuedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={alert.status === "active" ? "default" : "secondary"}>{alert.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedAlert(alert)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            Alert Details - {alert.district}
                            <RiskBadge risk={alert.risk} />
                          </DialogTitle>
                          <DialogDescription>
                            Issued on {new Date(alert.issuedDate).toLocaleDateString()}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Cause</h4>
                            <p className="text-sm text-muted-foreground">{alert.cause}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Alert Message</h4>
                            <p className="text-sm">{alert.message}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-1">Confidence</h4>
                              <p className="text-sm text-muted-foreground">{Math.round(alert.confidence * 100)}%</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Duration</h4>
                              <p className="text-sm text-muted-foreground">{alert.ttl} hours</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
