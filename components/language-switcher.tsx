"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n, Locale, getLocalePath } from "@/lib/i18n"

const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  hi: "🇮🇳",
  tr: "🇹🇷",
}

export function LanguageSwitcher() {
  const { locale, locales, getLocaleName } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 h-auto py-1 px-2"
          aria-label="Change language"
        >
          <span className="text-base leading-none">{localeFlags[locale]}</span>
          <span className="text-sm font-medium">{getLocaleName(locale)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {locales.map((l: Locale) => (
          <DropdownMenuItem
            key={l}
            asChild
            className="flex items-center justify-between cursor-pointer"
          >
            <Link href={getLocalePath(l)} className="flex items-center gap-2 w-full">
              <span className="text-base leading-none">{localeFlags[l]}</span>
              <span>{getLocaleName(l)}</span>
              {locale === l && <Check className="h-4 w-4 text-purple-500 ml-auto" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
