"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RiskBadge } from "@/components/ui/risk-badge"

const alertSchema = z.object({
  district: z.string().min(1, "District is required"),
  risk: z.enum(["low", "medium", "high"]),
  cause: z.string().min(1, "Cause is required"),
  confidence: z.number().min(0).max(1),
  ttl: z.number().min(1).max(168), // 1-168 hours (1 week)
  languages: z.array(z.string()).min(1, "At least one language required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type AlertFormData = z.infer<typeof alertSchema>

export function AlertComposer() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState<AlertFormData | null>(null)

  const form = useForm<AlertFormData>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      district: "",
      risk: "medium",
      cause: "",
      confidence: 0.8,
      ttl: 24,
      languages: ["en"],
      message: "",
    },
  })

  const onSubmit = async (data: AlertFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          issuedDate: new Date().toISOString(),
          status: "active",
        }),
      })

      if (response.ok) {
        form.reset()
        setPreview(null)
      }
    } catch (error) {
      console.error("Failed to create alert:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const watchedValues = form.watch()

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Alert</CardTitle>
          <CardDescription>Compose and send water quality alerts to affected communities</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="karachi">Karachi</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="sukkur">Sukkur</SelectItem>
                        <SelectItem value="dadu">Dadu</SelectItem>
                        <SelectItem value="muzaffargarh">Muzaffargarh</SelectItem>
                        <SelectItem value="charsadda">Charsadda</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="risk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cause"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cause</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Flood contamination, Industrial runoff" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confidence ({Math.round(field.value * 100)}%)</FormLabel>
                    <FormControl>
                      <Input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ttl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (hours)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="168"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alert Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed alert message with recommendations..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setPreview(watchedValues)}>
                  Preview
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Alert"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {preview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Alert Preview
              <RiskBadge risk={preview.risk} />
            </CardTitle>
            <CardDescription>How this alert will appear to recipients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Water Quality Alert - {preview.district}</h4>
              <p className="text-sm text-muted-foreground">
                {preview.cause} detected with {Math.round(preview.confidence * 100)}% confidence
              </p>
            </div>
            <div>
              <p className="text-sm">{preview.message}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">Active for {preview.ttl}h</Badge>
              {preview.languages.map((lang) => (
                <Badge key={lang} variant="outline">
                  {lang === "en" ? "English" : "Urdu"}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
