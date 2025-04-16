"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MousePointer, Layers, Lightbulb, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/home/hero-section"
import FeaturedProjects from "@/components/home/featured-projects"

// Animações
const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay }
  }
})

const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
})

export default function Home() {
  // Refs para animações de scroll
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  // Força o tema escuro na montagem do componente
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-24">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Skills Section com Cards */}
      <section className="py-16 w-full bg-dark-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Skill Card 1 */}
            <div className="bg-dark-100 rounded-xl p-6 shadow-lg border border-muted/20 transform transition-all hover:-translate-y-1 hover:shadow-accent/10">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <MousePointer className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">UX Research</h3>
              <p className="text-muted-foreground">
                Centrado no usuário
              </p>
            </div>
            
            {/* Skill Card 2 */}
            <div className="bg-dark-100 rounded-xl p-6 shadow-lg border border-muted/20 transform transition-all hover:-translate-y-1 hover:shadow-accent/10">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">UI Design</h3>
              <p className="text-muted-foreground">
                Interfaces atrativas
              </p>
            </div>
            
            {/* Skill Card 3 */}
            <div className="bg-dark-100 rounded-xl p-6 shadow-lg border border-muted/20 transform transition-all hover:-translate-y-1 hover:shadow-accent/10">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Prototipagem</h3>
              <p className="text-muted-foreground">
                Validação rápida
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">Scroll para ver mais</p>
            <div className="h-10 w-6 border-2 border-muted-foreground rounded-full mx-auto mt-2 relative">
              <motion.div 
                className="h-2 w-2 bg-primary rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-20 w-full">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1, 0.2)}
            className="mb-12 text-center"
          >
            <motion.h2 
              variants={fadeInUp()}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Projetos em <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Destaque</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp(0.1)}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Explore alguns dos meus trabalhos mais recentes em UX/UI Design,
              cada um com seu próprio conjunto único de desafios e soluções.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project Card 1 */}
            <div className="group relative rounded-xl overflow-hidden bg-dark-100 shadow-lg">
              <div className="h-48 bg-indigo-300/20 rounded-t-xl"></div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">Redesign de App Bancário</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Melhoria da experiência mobile com foco em acessibilidade
                </p>
                <Link href="/projects/bank-app" className="inline-flex items-center text-primary hover:text-accent transition-colors">
                  Ver detalhes
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Project Card 2 */}
            <div className="group relative rounded-xl overflow-hidden bg-dark-100 shadow-lg">
              <div className="h-48 bg-green-300/20 rounded-t-xl"></div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">E-commerce de Moda Sustentável</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Design focado em transparência e consciência ambiental
                </p>
                <Link href="/projects/eco-fashion" className="inline-flex items-center text-primary hover:text-accent transition-colors">
                  Ver detalhes
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Project Card 3 */}
            <div className="group relative rounded-xl overflow-hidden bg-dark-100 shadow-lg">
              <div className="h-48 bg-orange-300/20 rounded-t-xl"></div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">Dashboard de Análise de Dados</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Visualização de dados complexos de forma simples e intuitiva
                </p>
                <Link href="/projects/data-dashboard" className="inline-flex items-center text-primary hover:text-accent transition-colors">
                  Ver detalhes
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="bg-dark-100 border-muted hover:bg-dark-200">
              <Link href="/projects" className="group">
                Ver todos os projetos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 w-full bg-dark-200">
        <div 
          ref={statsRef} 
          className="container mx-auto px-4 md:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Stat 1 */}
            <motion.div 
              className="bg-dark-100 p-8 rounded-xl text-center shadow-lg border border-muted/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="text-5xl font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">Projetos Concluídos</p>
            </motion.div>
            
            {/* Stat 2 */}
            <motion.div 
              className="bg-dark-100 p-8 rounded-xl text-center shadow-lg border border-muted/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="text-5xl font-bold text-primary mb-2">5+</div>
              <p className="text-muted-foreground">Anos de Experiência</p>
            </motion.div>
            
            {/* Stat 3 */}
            <motion.div 
              className="bg-dark-100 p-8 rounded-xl text-center shadow-lg border border-muted/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="text-5xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Clientes Satisfeitos</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-24 w-full bg-gradient-to-br from-dark-200 to-dark-300 relative overflow-hidden"
      >
        {/* Background elements decorativos */}
        <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 h-64 w-64 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Vamos criar algo <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">incrível</span> juntos!
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Estou sempre aberta a novos projetos e colaborações.
              Vamos transformar sua visão em realidade!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              >
                <Link href="/contact">
                  Entre em contato
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-dark-100 border-muted hover:bg-dark-200"
              >
                <Link href="/lab">
                  Explore o UX Lab
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}