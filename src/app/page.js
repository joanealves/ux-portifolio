"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from 'next/image'
import { motion, useInView } from "framer-motion"
import { ArrowRight, MousePointer, Layers, Lightbulb, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/home/hero-section"
import CapaPortifolio from "../assets/capa_portifolio.png"
import CapaTech from "../assets/capa_tech.png"
import CapaImobiliaria from '../assets/capaImobiliaria.png';
 
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
      
<section className="py-28 w-full bg-gradient-to-b from-background to-secondary/10">
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold block mt-2 gradient-text">O que fazemos</h2>
    <p className="text-muted-foreground mt-2">Soluções que combinam pesquisa, design e tecnologia.</p>
  </div>

  <div ref={featuresRef} className="container mx-auto px-4 md:px-8">
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={staggerContainer(0.2, 0.1)}
      initial="hidden"
      animate={featuresInView ? "visible" : "hidden"}
    >
      <motion.div
        className="bg-gradient-to-br from-violet-900/20 to-violet-800/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        variants={fadeInUp(0.1)}
      >
        <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
          <MousePointer className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-center">UX/UI Design</h3>
        <p className="text-muted-foreground mt-3 text-center">Interfaces intuitivas centradas no usuário que encantam e facilitam a interação.</p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-indigo-900/20 to-indigo-800/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        variants={fadeInUp(0.2)}
      >
        <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
          <Layers className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-center">Arquitetura da Informação</h3>
        <p className="text-muted-foreground mt-3 text-center">Estruturamos conteúdos para criar jornadas fluidas e navegação intuitiva.</p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-blue-900/20 to-blue-800/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        variants={fadeInUp(0.3)}
      >
        <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
          <Code className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-center">Desenvolvimento Front-end</h3>
        <p className="text-muted-foreground mt-3 text-center">Transformamos design em código eficiente, performático e acessível.</p>
      </motion.div>
    </motion.div>
  </div>
</section>

      
<section className="py-20 w-full relative">
  <div className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
  <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-60"></div>
  
  <div className="container mx-auto px-4 md:px-8 relative z-10">
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.1, 0.2)}
      className="mb-16 text-center"
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
      <motion.a 
        href="https://www.figma.com/design/GHBb29M9AXwWo4tqbszjuz/Joane-portif%C3%B3lio?node-id=47-2238&t=Ki3WEP17Wux02H23-1"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.1 }}
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 to-gray-900/5 backdrop-blur-sm shadow-xl block cursor-pointer"
      >
        <div className="relative w-full h-48"> 
          <Image
            src={CapaPortifolio}
            alt="Capa do Portfólio"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="p-8">
          <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
            Site Portifólio Desenvolvimento
          </h3>
          <p className="text-muted-foreground mb-6">
            Concepção do UXUI do site de portifólio de Desenvolvimento.
          </p>
          <span className="inline-flex items-center text-primary hover:text-accent transition-colors group-hover:translate-x-1 duration-300">
            Ver detalhes
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.a>

      <motion.a 
        href="https://enchanting-hawk-c29.notion.site/Entrega-Unidade-4-6ca7ccae467440128c6cdf55a6dc3406"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 to-gray-900/5 backdrop-blur-sm shadow-xl block cursor-pointer"
      >
         <div className="relative w-full h-48"> 
          <Image
            src={CapaTech}
            alt="Capa proejto Tech Inclusiva"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">Tech Inclusiva</h3>
          <p className="text-muted-foreground mb-6">
            Design focado em usabilidade e consciência para acessibilidade. Neste projeto você pode acompanhar todo fluxo de UX. Desenvolvido em grupo.
          </p>
          <span className="inline-flex items-center text-primary hover:text-accent transition-colors group-hover:translate-x-1 duration-300">
            Ver detalhes
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.a>
      
      {/* Terceiro Card - Dashboard */}
      <motion.a 
        href="https://www.figma.com/design/66KuZV4x9ViytCyo90X77l/CMS-para-Imobili%C3%A1ria---JSI-Im%C3%B3veis?node-id=1-2&t=Jlyofu8r2wumrcnN-1" 
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 to-gray-900/5 backdrop-blur-sm shadow-xl block cursor-pointer"
      >
        <div className="relative w-full h-48"> 
          <Image
            src={CapaImobiliaria}
            alt="Capa proejto Tech Inclusiva"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">Dashboard de Análise de Dados</h3>
          <p className="text-muted-foreground mb-6">
            Visualização de dados complexos de forma simples e intuitiva para tomadas de decisão
          </p>
          <span className="inline-flex items-center text-primary hover:text-accent transition-colors group-hover:translate-x-1 duration-300">
            Ver detalhes
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.a>
      </div>
      
      <div className="text-center mt-16">
        <Button asChild variant="outline" size="lg" className="bg-secondary/20 hover:bg-secondary/40 shadow-lg border-none">
          <Link href="/projects" className="group">
            Ver todos os projetos
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
      
      <section className="py-20 w-full bg-secondary/30 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div 
          ref={statsRef} 
          className="container mx-auto px-4 md:px-8 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="bg-secondary/40 p-8 rounded-xl text-center shadow-lg border border-border hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="text-5xl font-bold gradient-text mb-2">25+</div>
              <p className="text-muted-foreground">Projetos Concluídos</p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/40 p-8 rounded-xl text-center shadow-lg border border-border hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="text-5xl font-bold gradient-text mb-2">5+</div>
              <p className="text-muted-foreground">Anos de Experiência</p>
            </motion.div>
            
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
      
      <section 
        ref={ctaRef}
        className="py-24 w-full bg-gradient-to-br from-background to-secondary/50 relative overflow-hidden"
      >
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