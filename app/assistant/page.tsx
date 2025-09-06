"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatWindow } from "@/components/chat/chat-window"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageSquare, Globe, Zap } from "lucide-react"

export default function AssistantPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")

  const features = [
    {
      icon: Bot,
      title: language === "en" ? "AI-Powered Responses" : "AI سے چلنے والے جوابات",
      description:
        language === "en"
          ? "Get instant answers about water quality and safety"
          : "پانی کی کوالٹی اور حفاظت کے بارے میں فوری جوابات حاصل کریں",
    },
    {
      icon: MessageSquare,
      title: language === "en" ? "Multilingual Support" : "کثیر لسانی سپورٹ",
      description:
        language === "en"
          ? "Chat in English or Urdu with automatic translation"
          : "خودکار ترجمے کے ساتھ انگریزی یا اردو میں چیٹ کریں",
    },
    {
      icon: Globe,
      title: language === "en" ? "Local Knowledge" : "مقامی معلومات",
      description:
        language === "en"
          ? "Specialized information for Pakistan's water conditions"
          : "پاکستان کے پانی کے حالات کے لیے خصوصی معلومات",
    },
    {
      icon: Zap,
      title: language === "en" ? "Real-time Updates" : "حقیقی وقت کی اپڈیٹس",
      description:
        language === "en"
          ? "Access to latest alerts and safety recommendations"
          : "تازہ ترین الرٹس اور حفاظتی سفارشات تک رسائی",
    },
  ]

  const urduPrompts = [
    "حیدرآباد میں حالیہ سیلاب کے بعد پانی محفوظ ہے؟",
    "اگر پانی بھورا نظر آئے تو کیا کریں؟",
    "گھر میں پانی کی کوالٹی کیسے چیک کریں؟",
    "ہنگامی پانی صاف کرنے کے طریقے",
  ]

  const englishPrompts = [
    "Is water in Hyderabad safe after recent floods?",
    "What to do if water looks brownish?",
    "How to test water quality at home?",
    "Emergency water purification methods",
  ]

  return (
    <div className={`container mx-auto py-8 space-y-6 ${language === "ur" ? "rtl" : "ltr"}`}>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">
          {language === "en" ? "Water Quality Assistant" : "پانی کی کوالٹی اسسٹنٹ"}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Get instant, AI-powered answers about water quality, safety protocols, and testing methods. Our assistant is trained on local conditions and best practices for Pakistan."
            : "پانی کی کوالٹی، حفاظتی پروٹوکول، اور ٹیسٹنگ کے طریقوں کے بارے میں فوری، AI سے چلنے والے جوابات حاصل کریں۔ ہمارا اسسٹنٹ پاکستان کے مقامی حالات اور بہترین طریقوں پر تربیت یافتہ ہے۔"}
        </p>
        <div className="flex justify-center gap-2">
          <Badge
            variant={language === "en" ? "default" : "secondary"}
            className="cursor-pointer hover:bg-primary/80"
            onClick={() => setLanguage("en")}
          >
            English
          </Badge>
          <Badge
            variant={language === "ur" ? "default" : "secondary"}
            className="cursor-pointer hover:bg-primary/80"
            onClick={() => setLanguage("ur")}
          >
            اردو
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChatWindow initialPrompts={language === "ur" ? urduPrompts : englishPrompts} language={language} />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{language === "en" ? "Features" : "خصوصیات"}</CardTitle>
              <CardDescription>
                {language === "en" ? "How our AI assistant can help you" : "ہمارا AI اسسٹنٹ آپ کی کیسے مدد کر سکتا ہے"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{language === "en" ? "Quick Topics" : "فوری موضوعات"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Popular questions and topics" : "مقبول سوالات اور موضوعات"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                {language === "en" ? (
                  <>
                    <Badge variant="outline" className="text-xs">
                      Water Testing
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Flood Safety
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Purification Methods
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Emergency Protocols
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Health Guidelines
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Equipment Recommendations
                    </Badge>
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="text-xs">
                      پانی کی جانچ
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      سیلاب کی حفاظت
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      صفائی کے طریقے
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ہنگامی پروٹوکول
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      صحت کی رہنمائی
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      آلات کی سفارشات
                    </Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{language === "en" ? "Emergency Contacts" : "ہنگامی رابطے"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Important numbers for water emergencies"
                  : "پانی کی ہنگامی صورتحال کے لیے اہم نمبرز"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium">{language === "en" ? "NDMA Helpline" : "NDMA ہیلپ لائن"}</p>
                <p className="text-muted-foreground">1166</p>
              </div>
              <div>
                <p className="font-medium">{language === "en" ? "WASA Emergency" : "WASA ہنگامی"}</p>
                <p className="text-muted-foreground">021-99206963</p>
              </div>
              <div>
                <p className="font-medium">{language === "en" ? "Health Department" : "محکمہ صحت"}</p>
                <p className="text-muted-foreground">1166</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
