"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Briefcase, GraduationCap, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const timelineData = [
  {
    id: 1,
    year: "2023 - Atual",
    title: "UX/UI Designer Senior",
    company: "Studio Digital",
    description: "Liderando projetos de design para grandes marcas, focando em experiências acessíveis e inclusivas. Ajudei a melhorar métricas de engajamento em 35%.",
    icon: <Briefcase className="h-full w-full p-2" />,
    color: "bg-primary text-primary-foreground"
  },
  {
    id: 2,
    year: "2021 - 2023",
    title: "UX Designer",
    company: "Tech Solutions Inc.",
    description: "Conduzi pesquisas com usuários e criei wireframes para aplicativos mobile e web. Implementei um novo sistema de design que reduziu o tempo de desenvolvimento em 40%.",
    icon: <Briefcase className="h-full w-full p-2" />,
    color: "bg-primary/90 text-primary-foreground"
  },
  {
    id: 3,
    year: "2020 - 2021",
    title: "UI Designer",
    company: "Creative Agency",
    description: "Desenvolvimento de interfaces para clientes em diversos setores. Aprendi a equilibrar estética e usabilidade em projetos de alta visibilidade.",
    icon: <Briefcase className="h-full w-full p-2" />,
    color: "bg-primary/80 text-primary-foreground"
  },
  {
    id: 4,
    year: "2019",
    title: "Certificação UX Design",
    company: "Google",
    description: "Completei o programa de certificação profissional em UX Design, focando em pesquisa com usuários, wireframing, prototipagem e testes de usabilidade.",
    icon: <Award className="h-full w-full p-2" />,
    color: "bg-accent text-accent-foreground"
  },
  {
    id: 5,
    year: "2015 - 2019",
    title: "Bacharelado em Design Digital",
    company: "Universidade de Design",
    description: "Formação com foco em design de interação, experiência do usuário e princípios fundamentais de design. Projeto de conclusão premiado por inovação.",
    icon: <GraduationCap className="h-full w-full p-2" />,
    color: "bg-accent/80 text-accent-foreground"
  }
]

export default function CareerTimeline() {
  const [expandedId, setExpandedId] = useState(null)
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }
  
  return (
    <div className="relative">
      <div className="absolute left-6 md:left-8 top-8 bottom-20 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-accent/50"></div>
      
      <div className="space-y-12">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative pl-16 md:pl-20"
          >
            <div className={`absolute left-0 h-12 w-12 rounded-full flex items-center justify-center ${item.color} shadow-lg z-10`}>
              {item.icon}
            </div>
            
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{item.year}</span>
            </div>
            
            <div 
              className={`p-6 rounded-xl bg-dark-100 border border-border transition-all duration-300 hover:border-primary/50 cursor-pointer ${expandedId === item.id ? 'shadow-md shadow-primary/5' : ''}`}
              onClick={() => toggleExpand(item.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="text-muted-foreground">{item.company}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`transition-transform duration-300 ${expandedId === item.id ? 'rotate-90' : ''}`}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <motion.div 
                initial={false}
                animate={{ 
                  height: expandedId === item.id ? 'auto' : 0,
                  opacity: expandedId === item.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="relative h-12 ml-6 md:ml-8">
        <motion.div 
          className="absolute left-0 top-0 h-6 w-6 rounded-full bg-accent pulse-animation"
          initial={{ scale: 0.8, opacity: 0.5 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1.5 
          }}
          viewport={{ once: true }}
        />
        <div className="absolute left-8 top-1 text-sm text-muted-foreground">
          Pronto para o próximo desafio!
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(123, 104, 238, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(123, 104, 238, 0); }
          100% { box-shadow: 0 0 0 0 rgba(123, 104, 238, 0); }
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  )
}