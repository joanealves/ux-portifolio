"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({})

export function ThemeProvider({
  children,
  defaultTheme = "dark", 
  enableSystem = false,  
  storageKey = "ui-theme",
  forcedTheme,          
  ...props
}) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    if (forcedTheme) {
      setTheme(forcedTheme)
    } 
    else {
      const storedTheme = window.localStorage.getItem(storageKey)
      if (storedTheme) {
        setTheme(storedTheme)
      }
    }
  }, [forcedTheme, storageKey])

  useEffect(() => {
    const root = window.document.documentElement
    
    root.classList.remove("light", "dark")
    
    if (forcedTheme) {
      root.classList.add(forcedTheme)
      return
    }

    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
    
    if (forcedTheme === "dark" || theme === "dark") {
      document.body.style.backgroundColor = "hsl(240 10% 3.9%)";
      document.body.style.color = "hsl(0 0% 98%)";
    }
  }, [theme, enableSystem, forcedTheme])

  const value = {
    theme: forcedTheme || theme,
    setTheme: (newTheme) => {
      if (!forcedTheme) {
        setTheme(newTheme)
        window.localStorage.setItem(storageKey, newTheme)
      }
    },
    forcedTheme: !!forcedTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}