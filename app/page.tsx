"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KPIStat } from "@/components/ui/kpi-stat"
import { Header } from "@/components/navigation/header"
import { translations, type Language } from "@/lib/i18n"
import {
  Droplets,
  Map,
  AlertTriangle,
  Brain,
  MessageSquare,
  Upload,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

export default function HomePage() {
  const [language, setLanguage] = React.useState<Language>("en")
  const t = translations[language]

  const features = [
    {
      icon: Upload,
      title: language === "en" ? "Upload & Analyze" : "اپ لوڈ اور تجزیہ",
      description:
        language === "en"
          ? "Take a photo or upload an image of water for instant AI-powered quality analysis"
          : "فوری AI پاور کوالٹی تجزیہ کے لیے پانی کی تصویر لیں یا اپ لوڈ کریں",
    },
    {
      icon: Map,
      title: language === "en" ? "GIS Risk Map" : "GIS خطرہ نقشہ",
      description:
        language === "en"
          ? "Interactive map showing water quality data and risk zones across Pakistan"
          : "پاکستان بھر میں پانی کے معیار کا ڈیٹا اور خطرناک علاقوں کو دکھانے والا انٹرایکٹو نقشہ",
    },
    {
      icon: AlertTriangle,
      title: language === "en" ? "Early Warnings" : "ابتدائی انتباہات",
      description:
        language === "en"
          ? "Real-time alerts for water contamination and disaster-related risks"
          : "پانی کی آلودگی اور آفات سے متعلق خطرات کے لیے ریئل ٹائم الرٹس",
    },
    {
      icon: Brain,
      title: language === "en" ? "XAI Explainability" : "XAI وضاحت",
      description:
        language === "en"
          ? "Understand how AI makes decisions with transparent explanations"
          : "شفاف وضاحات کے ساتھ سمجھیں کہ AI کیسے فیصلے کرتا ہے",
    },
    {
      icon: MessageSquare,
      title: language === "en" ? "Multilingual Chatbot" : "کثیر لسانی چیٹ بوٹ",
      description:
        language === "en"
          ? "Get water safety guidance in English and Urdu with AI assistant"
          : "AI اسسٹنٹ کے ساتھ انگریزی اور اردو میں پانی کی حفاظت کی رہنمائی حاصل کریں",
    },
    {
      icon: Shield,
      title: language === "en" ? "Community Safety" : "کمیونٹی کی حفاظت",
      description:
        language === "en"
          ? "Protect communities with data-driven water quality monitoring"
          : "ڈیٹا پر مبنی پانی کے معیار کی نگرانی کے ساتھ کمیونٹیز کی حفاظت کریں",
    },
  ]

  const partners = ["NDMA", "WASA", "UNESCO", "UNICEF", "WWF", "Red Cross"]

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
          <div className="container max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                {language === "en" ? (
                  <>
                    AI-powered <span className="text-primary">Water Safety</span> for Everyone
                  </>
                ) : (
                  <>
                    سب کے لیے AI سے چلنے والی <span className="text-primary">پانی کی حفاظت</span>
                  </>
                )}
              </h1>

              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                {language === "en"
                  ? "Monitor water quality, predict risks, and protect communities across Pakistan with advanced AI technology and real-time alerts."
                  : "جدید AI ٹیکنالوجی اور ریئل ٹائم الرٹس کے ساتھ پاکستان بھر میں پانی کے معیار کی نگرانی، خطرات کی پیش گوئی، اور کمیونٹیز کی حفاظت کریں۔"}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button asChild size="lg" className="text-base px-8">
                  <Link href="/analyze">
                    <Upload className="mr-2 h-5 w-5" />
                    {t.actions.upload}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8 bg-transparent">
                  <Link href="/map">
                    <Map className="mr-2 h-5 w-5" />
                    {language === "en" ? "Open Map Dashboard" : "نقشہ ڈیش بورڈ کھولیں"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "en" ? "Comprehensive Water Monitoring" : "جامع پانی کی نگرانی"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === "en"
                  ? "Advanced AI technology meets community needs for safer water access across Pakistan"
                  : "جدید AI ٹیکنالوجی پاکستان بھر میں محفوظ پانی تک رسائی کے لیے کمیونٹی کی ضروریات کو پورا کرتی ہے"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur"
                >
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "en" ? "Making a Real Impact" : "حقیقی اثرات مرتب کرنا"}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPIStat
                title={language === "en" ? "Communities Served" : "خدمت کردہ کمیونٹیز"}
                value="50+"
                change={{ value: 25, period: "last month" }}
                icon={<Users className="h-5 w-5" />}
                variant="success"
              />
              <KPIStat
                title={language === "en" ? "Alerts Sent" : "بھیجے گئے الرٹس"}
                value="1,200+"
                change={{ value: 15, period: "last week" }}
                icon={<AlertTriangle className="h-5 w-5" />}
                variant="warning"
              />
              <KPIStat
                title={language === "en" ? "Accuracy Rate" : "درستگی کی شرح"}
                value="94%"
                change={{ value: 2, period: "this month" }}
                icon={<CheckCircle className="h-5 w-5" />}
                variant="success"
              />
              <KPIStat
                title={language === "en" ? "Water Tests" : "پانی کے ٹیسٹس"}
                value="5,800+"
                change={{ value: 35, period: "last month" }}
                icon={<TrendingUp className="h-5 w-5" />}
              />
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-medium text-muted-foreground mb-8">
              {language === "en" ? "Trusted by leading organizations" : "معروف تنظیموں کا اعتماد"}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {partners.map((partner, index) => (
                <div key={index} className="px-4 py-2 text-sm font-medium bg-muted/50 rounded-lg">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {language === "en" ? "Start Monitoring Water Quality Today" : "آج ہی پانی کے معیار کی نگرانی شروع کریں"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === "en"
                  ? "Join thousands of communities using Climate.io to ensure safe water access for everyone."
                  : "ہزاروں کمیونٹیز میں شامل ہوں جو سب کے لیے محفوظ پانی کی رسائی کو یقینی بنانے کے لیے Climate.io استعمال کر رہی ہیں۔"}
              </p>
              <Button asChild size="lg" className="text-base px-8">
                <Link href="/analyze">
                  {language === "en" ? "Get Started" : "شروع کریں"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Climate.io</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "en"
                  ? "AI-powered water quality monitoring for safer communities across Pakistan."
                  : "پاکستان بھر میں محفوظ کمیونٹیز کے لیے AI سے چلنے والی پانی کے معیار کی نگرانی۔"}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">{language === "en" ? "Platform" : "پلیٹ فارم"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/analyze" className="hover:text-foreground">
                    {t.nav.analyze}
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="hover:text-foreground">
                    {t.nav.map}
                  </Link>
                </li>
                <li>
                  <Link href="/alerts" className="hover:text-foreground">
                    {t.nav.alerts}
                  </Link>
                </li>
                <li>
                  <Link href="/assistant" className="hover:text-foreground">
                    {t.nav.assistant}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">{language === "en" ? "Resources" : "وسائل"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link href="/methodology" className="hover:text-foreground">
                    {language === "en" ? "Methodology" : "طریقہ کار"}
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="hover:text-foreground">
                    {t.nav.settings}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">{language === "en" ? "Legal" : "قانونی"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    {language === "en" ? "Privacy Policy" : "پرائیویسی پالیسی"}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    {language === "en" ? "Terms of Service" : "خدمات کی شرائط"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Climate.io. {language === "en" ? "All rights reserved." : "تمام حقوق محفوظ ہیں۔"}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
