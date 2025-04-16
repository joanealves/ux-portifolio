"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({})

export function ThemeProvider({
  children,
  defaultTheme = "dark", // Alterado para "dark" como padrão
  enableSystem = false,  // Desativado o sistema por padrão
  storageKey = "ui-theme",
  forcedTheme,          // Nova prop para forçar um tema específico
  ...props
}) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    // Se um tema forçado for especificado, use-o
    if (forcedTheme) {
      setTheme(forcedTheme)
    } 
    // Caso contrário, recupere do localStorage se disponível
    else {
      const storedTheme = window.localStorage.getItem(storageKey)
      if (storedTheme) {
        setTheme(storedTheme)
      }
    }
  }, [forcedTheme, storageKey])

  useEffect(() => {
    const root = window.document.documentElement
    
    // Sempre remove ambas as classes primeiro
    root.classList.remove("light", "dark")
    
    // Use o tema forçado se fornecido
    if (forcedTheme) {
      root.classList.add(forcedTheme)
      return
    }

    // Lógica para determinar qual tema aplicar
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      return
    }

    // Adiciona a classe correspondente ao tema atual
    root.classList.add(theme)
    
    // Garante que o tema dark seja sempre aplicado se for o tema forçado
    if (forcedTheme === "dark" || theme === "dark") {
      document.body.style.backgroundColor = "hsl(240 10% 3.9%)";
      document.body.style.color = "hsl(0 0% 98%)";
    }
  }, [theme, enableSystem, forcedTheme])

  const value = {
    theme: forcedTheme || theme,
    setTheme: (newTheme) => {
      // Se não houver um tema forçado, permita a mudança
      if (!forcedTheme) {
        setTheme(newTheme)
        window.localStorage.setItem(storageKey, newTheme)
      }
    },
    // Adiciona uma indicação se estamos usando um tema forçado
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