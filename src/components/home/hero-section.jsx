"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Code, MousePointer2 } from "lucide-react"
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
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full mb-6">
              Joane Alves
            </span>
            
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
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16"
        >
          <div className="bg-dark-100 p-5 rounded-xl border border-border flex items-center">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
              <MousePointer2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold">UX Research</div>
              <div className="text-sm text-muted-foreground">Centrado no usuário</div>
            </div>
          </div>
          
          <div className="bg-dark-100 p-5 rounded-xl border border-border flex items-center">
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mr-4">
              <Code className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="text-xl font-bold">UI Design</div>
              <div className="text-sm text-muted-foreground">Interfaces atrativas</div>
            </div>
          </div>
          
          <div className="bg-dark-100 p-5 rounded-xl border border-border flex items-center">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C2 8.68629 4.68629 6 8 6H16C19.3137 6 22 8.68629 22 12C22 15.3137 19.3137 18 16 18H8C4.68629 18 2 15.3137 2 12Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 12C16 13.1046 15.1046 14 14 14C12.8954 14 12 13.1046 12 12C12 10.8954 12.8954 10 14 10C15.1046 10 16 10.8954 16 12Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold">Prototipagem</div>
              <div className="text-sm text-muted-foreground">Validação rápida</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex justify-center mt-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-muted-foreground mb-2">Scroll para ver mais</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center pt-2">
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}