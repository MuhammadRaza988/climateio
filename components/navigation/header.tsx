"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Droplets, Search, User, Shield } from "lucide-react"
import { translations, type Language } from "@/lib/i18n"

interface HeaderProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

function Header({ language, onLanguageChange }: HeaderProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const t = translations[language]

  const navigationItems = [
    { href: "/analyze", label: t.nav.analyze, icon: Droplets },
    { href: "/map", label: t.nav.map },
    { href: "/alerts", label: t.nav.alerts },
    { href: "/assistant", label: t.nav.assistant },
    { href: "/ndma", label: t.nav.ndma, icon: Shield },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground">
            <Droplets className="h-5 w-5" />
          </div>
          <span className="hidden sm:inline">Climate.io</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      isActive(item.href) && "bg-accent text-accent-foreground",
                    )}
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>

          <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} className="hidden sm:flex" />

          <ThemeToggle />

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="h-4 w-4" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-2 pb-4 border-b">
                  <Droplets className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">Climate.io</span>
                </div>

                <nav className="flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        isActive(item.href) && "bg-accent text-accent-foreground",
                      )}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t space-y-2">
                  <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export { Header }
