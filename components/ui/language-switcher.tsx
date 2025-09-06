"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { Globe, Check } from "lucide-react"
import type { Language } from "@/lib/types"

interface LanguageSwitcherProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
  className?: string
}

const languages = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "ur" as Language, name: "Urdu", nativeName: "اردو" },
]

function LanguageSwitcher({ currentLanguage, onLanguageChange, className }: LanguageSwitcherProps) {
  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  React.useEffect(() => {
    // Update document direction and font class based on language
    const html = document.documentElement
    const body = document.body

    if (currentLanguage === "ur") {
      html.setAttribute("dir", "rtl")
      html.setAttribute("lang", "ur")
      body.classList.add("font-urdu")
      body.classList.remove("font-sans")
    } else {
      html.setAttribute("dir", "ltr")
      html.setAttribute("lang", "en")
      body.classList.add("font-sans")
      body.classList.remove("font-urdu")
    }
  }, [currentLanguage])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("gap-2", className)}>
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs text-muted-foreground">{language.nativeName}</span>
            </div>
            {currentLanguage === language.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { LanguageSwitcher }
