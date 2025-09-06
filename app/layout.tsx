import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Climate.io - AI Water Quality Monitoring",
  description: "AI-assisted water quality monitoring and early warnings for disaster-prone areas in Pakistan",
  generator: "Climate.io",
  keywords: ["water quality", "AI monitoring", "Pakistan", "disaster prevention", "climate tech"],
  authors: [{ name: "Climate.io Team" }],
  openGraph: {
    title: "Climate.io - AI Water Quality Monitoring",
    description: "AI-assisted water quality monitoring and early warnings for disaster-prone areas in Pakistan",
    type: "website",
    locale: "en_US",
    alternateLocale: "ur_PK",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
            {children}
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
