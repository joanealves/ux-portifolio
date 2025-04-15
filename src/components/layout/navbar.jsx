"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Sobre" },
  { href: "/projects", label: "Projetos" },
  { href: "/process", label: "Processo" },
  { href: "/lab", label: "UX Lab" },
  { href: "/contact", label: "Contato" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-dark-200/80 backdrop-blur-lg py-3 shadow-lg" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold gradient-text"
        >
          UX Portfolio
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={cn(
                      "relative px-1 py-2 transition-colors duration-300 hover:text-primary",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-dark-200/95 backdrop-blur-md"
        >
          <nav className="container py-6">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className={cn(
                        "block px-4 py-2 transition-colors duration-300 hover:bg-dark-100 rounded-md",
                        isActive ? "text-primary bg-dark-100" : "text-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
