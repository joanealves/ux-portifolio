"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const featuredProjects = [
  {
    id: 1,
    title: "Redesign de App Bancário",
    description: "Melhorando a experiência do usuário para um aplicativo bancário com mais de 5 milhões de usuários.",
    tags: ["UX Research", "UI Design", "Mobile App"],
    image: "/api/placeholder/600/400",
    gradient: "from-blue-500 to-purple-600",
    link: "/projects/banking-app"
  },
  {
    id: 2,
    title: "E-commerce de Moda Sustentável",
    description: "Criação de interface para uma plataforma de e-commerce focada em produtos ecologicamente corretos.",
    tags: ["E-commerce", "Web Design", "Sustentabilidade"],
    image: "/api/placeholder/600/400",
    gradient: "from-emerald-500 to-teal-600",
    link: "/projects/eco-fashion"
  },
  {
    id: 3,
    title: "Dashboard de Análise de Dados",
    description: "Visualização de dados complexos de forma simples e intuitiva para uma empresa de marketing.",
    tags: ["Data Visualization", "Dashboard", "B2B"],
    image: "/api/placeholder/600/400",
    gradient: "from-amber-500 to-orange-600",
    link: "/projects/data-dashboard"
  }
]

export default function FeaturedProjects() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProjects.map((project) => (
        <Link 
          href={project.link} 
          key={project.id}
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="group block"
        >
          <motion.div 
            className="h-full rounded-xl overflow-hidden bg-dark-100 border border-border transition-all duration-300 hover:border-primary/50 relative flex flex-col"
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div 
                className={`absolute inset-0 bg-dark-200/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                <Button size="sm" variant="outline" className="gap-2 border-white/20">
                  <Eye className="h-4 w-4" />
                  Ver projeto
                </Button>
              </div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-medium group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              
              <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-2 py-1 rounded-full bg-dark-200 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}