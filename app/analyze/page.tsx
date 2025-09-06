"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Header } from "@/components/navigation/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadCard } from "@/components/ui/upload-card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { SkeletonCard } from "@/components/ui/skeleton-list"
import { translations, type Language } from "@/lib/i18n"
import { MapPin, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"

const formSchema = z.object({
  district: z.string().min(1, "Please select a district"),
  notes: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "You must consent to data sharing"),
})

type FormData = z.infer<typeof formSchema>

export default function AnalyzePage() {
  const router = useRouter()
  const [language, setLanguage] = React.useState<Language>("en")
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const t = translations[language]

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      district: "",
      notes: "",
      consent: false,
    },
  })

  const districts = [
    { id: "karachi", name: "Karachi", nameUrdu: "کراچی" },
    { id: "hyderabad", name: "Hyderabad", nameUrdu: "حیدرآباد" },
    { id: "sukkur", name: "Sukkur", nameUrdu: "سکھر" },
    { id: "dadu", name: "Dadu", nameUrdu: "دادو" },
    { id: "muzaffargarh", name: "Muzaffargarh", nameUrdu: "مظفرگڑھ" },
    { id: "charsadda", name: "Charsadda", nameUrdu: "چارسدہ" },
  ]

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleFileRemove = () => {
    setSelectedFile(null)
  }

  const onSubmit = async (data: FormData) => {
    if (!selectedFile) {
      toast.error(language === "en" ? "Please select an image first" : "پہلے تصویر منتخب کریں")
      return
    }

    setIsAnalyzing(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("image", selectedFile)
      formData.append("district", data.district)
      formData.append("notes", data.notes || "")

      // Call mock API
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()

      // Store result in sessionStorage and navigate to results
      sessionStorage.setItem("analysisResult", JSON.stringify(result))
      sessionStorage.setItem("uploadedImage", URL.createObjectURL(selectedFile))

      router.push("/analyze/results")
    } catch (error) {
      console.error("Analysis error:", error)
      toast.error(language === "en" ? "Analysis failed. Please try again." : "تجزیہ ناکام۔ دوبارہ کوشش کریں۔")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="container max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">{t.analyze.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "en"
                ? "Upload an image of water to get instant AI-powered quality analysis and safety recommendations."
                : "فوری AI پاور کوالٹی تجزیہ اور حفاظتی تجاویز حاصل کرنے کے لیے پانی کی تصویر اپ لوڈ کریں۔"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  {language === "en" ? "Upload Image" : "تصویر اپ لوڈ کریں"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Take a photo or select an image of the water you want to analyze"
                    : "اس پانی کی تصویر لیں یا منتخب کریں جس کا آپ تجزیہ کرنا چاہتے ہیں"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadCard
                  onFileSelect={handleFileSelect}
                  onFileRemove={handleFileRemove}
                  selectedFile={selectedFile || undefined}
                  accept="image/*"
                  maxSize={10}
                />
              </CardContent>
            </Card>

            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {language === "en" ? "Location & Details" : "مقام اور تفصیلات"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Provide location information and any additional notes"
                    : "مقام کی معلومات اور کوئی اضافی نوٹس فراہم کریں"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.analyze.location}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={language === "en" ? "Select district..." : "ضلع منتخب کریں..."}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {districts.map((district) => (
                                <SelectItem key={district.id} value={district.id}>
                                  {language === "en" ? district.name : district.nameUrdu}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.analyze.notes}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={
                                language === "en"
                                  ? "Any additional observations or context..."
                                  : "کوئی اضافی مشاہدات یا سیاق و سباق..."
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {language === "en"
                              ? "Optional: Describe what you observed about the water"
                              : "اختیاری: پانی کے بارے میں آپ نے جو مشاہدہ کیا اس کی وضاحت کریں"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">{t.analyze.consent}</FormLabel>
                            <FormDescription>
                              {language === "en"
                                ? "Your data helps improve water safety for all communities"
                                : "آپ کا ڈیٹا تمام کمیونٹیز کے لیے پانی کی حفاظت کو بہتر بنانے میں مدد کرتا ہے"}
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" size="lg" disabled={!selectedFile || isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {language === "en" ? "Analyzing..." : "تجزیہ کر رہے ہیں..."}
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          {t.actions.submit}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium">
                  {language === "en" ? "Analyzing your water sample..." : "آپ کے پانی کے نمونے کا تجزیہ کر رہے ہیں..."}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Our AI is examining the image for quality indicators"
                    : "ہمارا AI معیار کے اشارے کے لیے تصویر کا جائزہ لے رہا ہے"}
                </p>
              </div>
              <SkeletonCard />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
