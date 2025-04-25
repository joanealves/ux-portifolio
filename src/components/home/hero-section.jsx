"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const typeTextRef = useRef(null);
  
  useEffect(() => {
    if (typeTextRef.current) {
      const text = "Me chamo Joane, UX/UI Designer,";
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= text.length) {
          typeTextRef.current.textContent = text.substring(0, i) + (i < text.length ? "|" : "");
          i++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            if (typeTextRef.current) {
              typeTextRef.current.textContent = text;
            }
          }, 500);
        }
      }, 100);
      
      return () => clearInterval(typeInterval);
    }
  }, []);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div 
        className="absolute top-1/4 -left-24 w-64 h-64 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: "hsl(252, 87%, 64%)" }} 
      ></div>
      <div 
        className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: "hsl(191, 97%, 77%)" }} 
      ></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Transformando ideias em
              <span className="block mt-2 gradient-text">experiências memoráveis</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Olá! <span ref={typeTextRef} className="text-primary font-medium">|</span>{" "}
               especialista em criar interfaces intuitivas e experiências que conectam pessoas a produtos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="default" className="gap-2">
                <Link href="/projects">
                  Ver Projetos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact" className="gap-2">
                  Entre em Contato
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
       
      </div>
    </section>
  )
}