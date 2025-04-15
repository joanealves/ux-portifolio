"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MousePointer, Layers, Lightbulb, Code, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { fadeInUp, staggerContainer } from "@/lib/utils"
import HeroSection from "@/components/home/hero-section"
import FeaturedProjects from "@/components/home/featured-projects"

export default function Home() {
  // Refs para animações de scroll
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Projects */}
      <section className="py-20">
        <div className="container">
          <motion.div 
            initial="hidden"
            animate="visible"
            // variants={staggerContainer(0.1, 0.2)}
            className="mb-12 text-center"
          >
            <motion.h2 
              // variants={fadeInUp()}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Projetos em <span className="gradient-text">Destaque</span>
            </motion.h2>
            <motion.p 
              // variants={fadeInUp(0.1)}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Explore alguns dos meus trabalhos mais recentes em UX/UI Design,
              cada um com seu próprio conjunto único de desafios e soluções.
            </motion.p>
          </motion.div>
          
          <FeaturedProjects />
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects" className="group">
                Ver todos os projetos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features/Skills Section */}
      <section className="py-20 bg-dark-200">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como posso <span className="gradient-text">ajudar</span> seu produto
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combinando design centrado no usuário com habilidades técnicas para 
              criar experiências digitais memoráveis e eficazes.
            </p>
          </div>
          
          <div 
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-dark-100 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <MousePointer className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">UX Research</h3>
              <p className="text-muted-foreground">
                Conduzindo pesquisas com usuários para entender necessidades, 
                comportamentos e motivações que norteiam o design.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-dark-100 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">UI Design</h3>
              <p className="text-muted-foreground">
                Criando interfaces atraentes e intuitivas que comunicam 
                claramente e engajam os usuários.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-dark-100 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Design Thinking</h3>
              <p className="text-muted-foreground">
                Abordagem centrada no usuário para resolver problemas 
                complexos e desenvolver soluções inovadoras.
              </p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div 
              className="bg-dark-100 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Prototipagem</h3>
              <p className="text-muted-foreground">
                Transformando conceitos em protótipos interativos para testar 
                e validar soluções antes do desenvolvimento.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20">
        <div 
          ref={statsRef}
          className="container"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0 }}
            >
              <div className="text-5xl font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">Projetos Concluídos</p>
            </motion.div>
            
            {/* Stat 2 */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="text-5xl font-bold text-primary mb-2">5+</div>
              <p className="text-muted-foreground">Anos de Experiência</p>
            </motion.div>
            
            {/* Stat 3 */}
            <motion.div 
              className="text-center"
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
        className="py-24 bg-gradient-to-br from-dark-200 to-dark-300 relative overflow-hidden"
      >
        {/* Background elements decorativos */}
        <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 h-64 w-64 bg-dark-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Vamos criar algo <span className="gradient-text">incrível</span> juntos
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Estou sempre aberto a novos projetos e colaborações.
              Vamos transformar sua visão em realidade!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="glow">
                <Link href="/contact">
                  Entre em contato
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
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