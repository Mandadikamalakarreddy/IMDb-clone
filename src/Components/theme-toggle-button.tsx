"use client"

import React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { AnimationStart, AnimationVariant, createAnimation } from "@/app/theme/theme-animations"
import { Button } from "./ui/button"



interface ThemeToggleAnimationProps {
  variant?: AnimationVariant
  start?: AnimationStart
  showLabel?: boolean
  url?: string
}

export function ThemeToggleButton({
  variant = "circle-blur",
  start = "top-left",
  showLabel = false,
  url = "",
}: ThemeToggleAnimationProps) {
  const { theme, setTheme } = useTheme()

  const styleId = "theme-transition-styles"

  const updateStyles = React.useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return

    let styleElement = document.getElementById(styleId) as HTMLStyleElement

    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = css
  }, [])

  const toggleTheme = React.useCallback(() => {
    const animation = createAnimation(variant, start, url)

    updateStyles(animation.css, animation.name)

    if (typeof window === "undefined") return

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light")
    }

    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => void
    }

    if (!documentWithTransition.startViewTransition) {
      switchTheme()
      return
    }

    documentWithTransition.startViewTransition(switchTheme)
  }, [theme, setTheme, variant, start, url, updateStyles])

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="w-9 h-9 p-0 relative rounded-xl hover:bg-dark-100 dark:hover:bg-dark-700"
      name="Theme Toggle Button"
    >
      <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all text-neon-pink dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-neon-cyan" />
      <span className="sr-only">Theme Toggle</span>
      {showLabel && (
        <>
          <span className="hidden group-hover:block border border-dark-600 rounded-full px-2 absolute -top-10 text-xs bg-dark-800 text-dark-200">
            {" "}
            variant = {variant}
          </span>
          <span className="hidden group-hover:block border border-dark-600 rounded-full px-2 absolute -bottom-10 text-xs bg-dark-800 text-dark-200">
            {" "}
            start = {start}
          </span>
        </>
      )}
    </Button>
  )
}
