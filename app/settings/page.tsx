"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { User, Bell, Map, Download, Globe, Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { Checkbox } from "@/components/ui/checkbox"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  organization: z.string().min(1, "Organization is required"),
  role: z.string().min(1, "Role is required"),
  phone: z.string().optional(),
})

const notificationSchema = z.object({
  emailAlerts: z.boolean(),
  smsAlerts: z.boolean(),
  frequency: z.enum(["immediate", "hourly", "daily"]),
  riskLevels: z.array(z.string()),
})

const mapSchema = z.object({
  defaultTileLayer: z.enum(["osm", "satellite", "terrain"]),
  defaultLayers: z.array(z.string()),
  defaultZoom: z.number().min(1).max(20),
  defaultCenter: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

type ProfileFormData = z.infer<typeof profileSchema>
type NotificationFormData = z.infer<typeof notificationSchema>
type MapFormData = z.infer<typeof mapSchema>

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Dr. Sarah Ahmed",
      email: "sarah.ahmed@ndma.gov.pk",
      organization: "National Disaster Management Authority",
      role: "Water Quality Specialist",
      phone: "+92-300-1234567",
    },
  })

  const notificationForm = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailAlerts: true,
      smsAlerts: false,
      frequency: "immediate",
      riskLevels: ["high", "medium"],
    },
  })

  const mapForm = useForm<MapFormData>({
    resolver: zodResolver(mapSchema),
    defaultValues: {
      defaultTileLayer: "osm",
      defaultLayers: ["submissions", "districts"],
      defaultZoom: 6,
      defaultCenter: { lat: 30.3753, lng: 69.3451 },
    },
  })

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile updated:", data)
  }

  const onNotificationSubmit = (data: NotificationFormData) => {
    console.log("Notifications updated:", data)
  }

  const onMapSubmit = (data: MapFormData) => {
    console.log("Map settings updated:", data)
  }

  const exportData = (format: "csv" | "geojson") => {
    console.log(`Exporting data as ${format}`)
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and application settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="map">Map Defaults</TabsTrigger>
          <TabsTrigger value="data">Data Export</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and organization details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Update Profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how and when you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="emailAlerts"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div>
                            <FormLabel>Email Alerts</FormLabel>
                            <FormDescription>Receive water quality alerts via email</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="smsAlerts"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div>
                            <FormLabel>SMS Alerts</FormLabel>
                            <FormDescription>Receive critical alerts via SMS</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={notificationForm.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alert Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="hourly">Hourly Digest</SelectItem>
                            <SelectItem value="daily">Daily Summary</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>How often you want to receive non-critical notifications</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <FormLabel>Risk Levels to Monitor</FormLabel>
                    <div className="flex gap-2">
                      <Badge variant="destructive">High Risk</Badge>
                      <Badge variant="secondary">Medium Risk</Badge>
                      <Badge variant="outline">Low Risk</Badge>
                    </div>
                    <FormDescription>Select which risk levels should trigger notifications</FormDescription>
                  </div>

                  <Button type="submit">Save Preferences</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Region
              </CardTitle>
              <CardDescription>Choose your preferred language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Interface Language</h4>
                  <LanguageSwitcher />
                  <p className="text-sm text-muted-foreground mt-2">
                    Changes the language of the user interface and automatically adjusts text direction for RTL
                    languages
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Theme Preference</h4>
                  <div className="flex gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                      className="flex items-center gap-2"
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                      className="flex items-center gap-2"
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("system")}
                      className="flex items-center gap-2"
                    >
                      <Monitor className="h-4 w-4" />
                      System
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Future Language Support</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">Sindhi (Coming Soon)</Badge>
                    <Badge variant="outline">Pashto (Coming Soon)</Badge>
                    <Badge variant="outline">Punjabi (Planned)</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Additional languages will be available in future updates to better serve all communities in Pakistan
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Map Defaults
              </CardTitle>
              <CardDescription>Configure default map settings and preferred layers</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...mapForm}>
                <form onSubmit={mapForm.handleSubmit(onMapSubmit)} className="space-y-4">
                  <FormField
                    control={mapForm.control}
                    name="defaultTileLayer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Tile Layer</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="osm">OpenStreetMap</SelectItem>
                            <SelectItem value="satellite">Satellite Imagery</SelectItem>
                            <SelectItem value="terrain">Terrain</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={mapForm.control}
                      name="defaultZoom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Zoom Level</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="20"
                              name={field.name}
                              value={field.value?.toString() || "6"}
                              onChange={(e) => {
                                const value = e.target.value
                                const numValue = value === "" ? 6 : Number.parseInt(value, 10)
                                if (!isNaN(numValue) && numValue >= 1 && numValue <= 20) {
                                  field.onChange(numValue)
                                }
                              }}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormDescription>Zoom level when opening the map (1-20)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-3">
                    <FormLabel>Default Visible Layers</FormLabel>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="submissions" defaultChecked />
                        <label htmlFor="submissions" className="text-sm">
                          Water Quality Submissions
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="districts" defaultChecked />
                        <label htmlFor="districts" className="text-sm">
                          District Boundaries
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="heatmap" />
                        <label htmlFor="heatmap" className="text-sm">
                          Risk Heatmap
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alerts" />
                        <label htmlFor="alerts" className="text-sm">
                          Active Alerts
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit">Save Map Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data Export
              </CardTitle>
              <CardDescription>Export your data for analysis or backup purposes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">CSV Export</CardTitle>
                    <CardDescription>Export submission data in spreadsheet format</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => exportData("csv")} className="w-full">
                      Download CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">GeoJSON Export</CardTitle>
                    <CardDescription>Export geographic data for GIS applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => exportData("geojson")} className="w-full">
                      Download GeoJSON
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Export Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-images" defaultChecked />
                    <label htmlFor="include-images" className="text-sm">
                      Include image attachments
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-analysis" defaultChecked />
                    <label htmlFor="include-analysis" className="text-sm">
                      Include AI analysis results
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anonymize" />
                    <label htmlFor="anonymize" className="text-sm">
                      Anonymize personal data
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Data Privacy Notice</h4>
                <p className="text-sm text-muted-foreground">
                  Exported data should be handled according to your organization's data protection policies. Personal
                  information and sensitive location data should be protected and not shared with unauthorized parties.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
