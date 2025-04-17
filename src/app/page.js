"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MousePointer, Layers, Lightbulb, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/home/hero-section"

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

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-24">
      <HeroSection />
      
      {/* O que fazemos section */}
      <section className="py-28 w-full bg-secondary/30">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold block mt-2 gradient-text">O que fazemos</h2>
    <p className="text-muted-foreground mt-2">Soluções que combinam pesquisa, design e tecnologia.</p>
  </div>

  <div ref={featuresRef} className="container mx-auto px-4 md:px-8">
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={staggerContainer(0.2, 0.1)}
      initial="hidden"
      animate={featuresInView ? "visible" : "hidden"}
    >
      <motion.div
        className="bg-blue-800 dark:bg-dark-800 rounded-xl p-6 text-center shadow-md"
        variants={fadeInUp(0.1)}
      >
        <MousePointer className="w-8 h-8 mx-auto text-primary mb-4" />
        <h3 className="text-lg font-semibold">UX/UI Design</h3>
        <p className="text-muted-foreground mt-2 text-sm">Interfaces intuitivas centradas no usuário.</p>
      </motion.div>

      <motion.div
        className="bg-blue-800 dark:bg-dark-800 rounded-xl p-6 text-center shadow-md"
        variants={fadeInUp(0.2)}
      >
        <Layers className="w-8 h-8 mx-auto text-primary mb-4" />
        <h3 className="text-lg font-semibold">Arquitetura da Informação</h3>
        <p className="text-muted-foreground mt-2 text-sm">Estruturamos conteúdos para facilitar a navegação.</p>
      </motion.div>

      <motion.div
        className="bg-blue-800 dark:bg-dark-800 rounded-xl p-6 text-center shadow-md"
        variants={fadeInUp(0.3)}
      >
        <Code className="w-8 h-8 mx-auto text-primary mb-4" />
        <h3 className="text-lg font-semibold">Desenvolvimento Front-end</h3>
        <p className="text-muted-foreground mt-2 text-sm">Transformamos design em código eficiente e acessível.</p>
      </motion.div>
    </motion.div>
  </div>
</section>

      
      {/* Featured Projects */}
      <section className="py-20 w-full relative">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
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
              Projetos em <span className="gradient-text">Destaque</span>
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative rounded-xl overflow-hidden bg-secondary/40 border border-border shadow-lg card-hover"
            >
              <div className="h-48 bg-indigo-500/10 rounded-t-xl flex items-center justify-center">
                <Layers className="h-12 w-12 text-indigo-400/70" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Redesign de App Bancário</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Melhoria da experiência mobile com foco em acessibilidade
                </p>
                <Link href="/projects/bank-app" className="inline-flex items-center text-primary hover:text-accent transition-colors">
                  Ver detalhes
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            
            {/* Project Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative rounded-xl overflow-hidden bg-secondary/40 border border-border shadow-lg card-hover"
            >
              <div className="h-48 bg-green-500/10 rounded-t-xl flex items-center justify-center">
                <Lightbulb className="h-12 w-12 text-green-400/70" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">E-commerce de Moda Sustentável</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Design focado em transparência e consciência ambiental
                </p>
                <Link href="/projects/eco-fashion" className="inline-flex items-center text-primary hover:text-accent transition-colors">
                  Ver detalhes
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            
            {/* Project Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative rounded-xl overflow-hidden bg-secondary/40 border border-border shadow-lg card-hover"
            >
              <div className="h-48 bg-orange-500/10 rounded-t-xl flex items-center justify-center">
                <Code className="h-12 w-12 text-orange-400/70" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Dashboard de Análise de Dados</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Visualização de dados complexos de forma simples e intuitiva
                </p>
                <Link href="/projects/data-dashboard" className="inline-flex items-center text-primary hover:text-accent transition-colors">
                  Ver detalhes
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="bg-secondary/40 border-border hover:bg-secondary/60 hover:border-primary/30 shadow-lg">
              <Link href="/projects" className="group">
                Ver todos os projetos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 w-full bg-secondary/30 relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div 
          ref={statsRef} 
          className="container mx-auto px-4 md:px-8 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Stat 1 */}
            <motion.div 
              className="bg-secondary/40 p-8 rounded-xl text-center shadow-lg border border-border hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="text-5xl font-bold gradient-text mb-2">25+</div>
              <p className="text-muted-foreground">Projetos Concluídos</p>
            </motion.div>
            
            {/* Stat 2 */}
            <motion.div 
              className="bg-secondary/40 p-8 rounded-xl text-center shadow-lg border border-border hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="text-5xl font-bold gradient-text mb-2">5+</div>
              <p className="text-muted-foreground">Anos de Experiência</p>
            </motion.div>
            
            {/* Stat 3 */}
            <motion.div 
              className="bg-secondary/40 p-8 rounded-xl text-center shadow-lg border border-border hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="text-5xl font-bold gradient-text mb-2">15+</div>
              <p className="text-muted-foreground">Clientes Satisfeitos</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-24 w-full bg-gradient-to-br from-background to-secondary/50 relative overflow-hidden"
      >
        {/* Background elements decorativos */}
        <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 h-64 w-64 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Vamos criar algo <span className="gradient-text">incrível</span> juntos!
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Estou sempre aberta a novos projetos e colaborações.
              Vamos transformar sua visão em realidade!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 btn-glow"
              >
                <Link href="/contact">
                  Entre em contato
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-secondary/40 border-border hover:border-primary/30 hover:bg-secondary/60 shadow-lg"
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