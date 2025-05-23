'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit3, Code, Lightbulb, ArrowRight, LayoutPanelTop } from "lucide-react";

import Navbar from "@/components/layout/navbar";

export default function UXProcessPage() {
  const [activeStep, setActiveStep] = useState(null);
  
  const processSteps = [
    {
      id: "research",
      title: "Pesquisa",
      icon: <Search className="h-6 w-6" />,
      color: "bg-blue-500",
      hoverColor: "bg-blue-600",
      description: "Investigação profunda para entender necessidades, comportamentos e pain points dos usuários.",
      activities: [
        "Entrevistas com usuários",
        "Análise competitiva",
        "Surveys e questionários",
        "Testes de usabilidade",
        "Mapeamento de jornada"
      ]
    },
    {
      id: "define",
      title: "Definição",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "bg-purple-500",
      hoverColor: "bg-purple-600",
      description: "Síntese de insights para definir claramente o problema e oportunidades de design.",
      activities: [
        "Personas e cenários",
        "Definição de requisitos",
        "User stories",
        "Mapas de empatia",
        "Definição de métricas"
      ]
    },
    {
      id: "ideate",
      title: "Ideação",
      icon: <Edit3 className="h-6 w-6" />,
      color: "bg-amber-500",
      hoverColor: "bg-amber-600",
      description: "Geração de múltiplas soluções criativas baseadas nas necessidades identificadas.",
      activities: [
        "Brainstorming",
        "Sketching",
        "Design Sprints",
        "Crazy 8s",
        "Moodboards"
      ]
    },
    {
      id: "prototype",
      title: "Prototipagem",
      icon: <LayoutPanelTop className="h-6 w-6" />,
      color: "bg-green-500",
      hoverColor: "bg-green-600",
      description: "Criação de protótipos interativos para testar conceitos antes do desenvolvimento.",
      activities: [
        "Wireframes",
        "Protótipos de baixa fidelidade",
        "Protótipos interativos",
        "Design system",
        "Style guides"
      ]
    },
    {
      id: "implement",
      title: "Implementação",
      icon: <Code className="h-6 w-6" />,
      color: "bg-red-500",
      hoverColor: "bg-red-600",
      description: "Trabalho colaborativo com desenvolvedores para transformar designs em produtos reais.",
      activities: [
        "Documentação técnica",
        "Hand-off para desenvolvedores",
        "QA de implementação",
        "Testes A/B",
        "Lançamento"
      ]
    }
  ];

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-background text-foreground">
      <div 
        className="absolute top-1/4 -left-24 w-64 h-64 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: "hsl(252, 87%, 64%)" }} 
      ></div>
      <div 
        className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: "hsl(191, 97%, 77%)" }} 
      ></div>
      <div className="h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Meu Processo de UX Design
            
          </motion.h1>
            
          <motion.div 
            className="flex flex-wrap md:flex-nowrap items-center justify-between mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex items-center w-full md:w-auto">
                <button
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  className={`flex items-center space-x-2 w-full md:w-auto rounded-lg transition-all duration-300 cursor-pointer ${
                    activeStep === step.id 
                      ? "bg-dark-100 p-3 shadow-lg border border-primary/50" 
                      : "p-3 hover:bg-dark-100 hover:shadow-md hover:border hover:border-primary/30"
                  }`}
                  aria-label={`Mostrar detalhes do passo ${step.title}`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full ${step.color} hover:${step.hoverColor} flex items-center justify-center text-dark-foreground transition-all duration-300 transform ${activeStep === step.id ? "scale-110" : "hover:scale-105"}`}
                  >
                    {step.icon}
                  </div>
                  <span className={`font-medium transition-colors duration-300 ${activeStep === step.id ? "text-primary" : "hover:text-primary"}`}>{step.title}</span>
                </button>
                
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden md:block mx-2 text-muted-foreground animate-pulse" />
                )}
              </div>
            ))}
          </motion.div>

          <div className="mt-8">
            {activeStep && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-dark-100 p-6 rounded-xl border border-border shadow-lg"
              >
                {processSteps.map((step) => 
                  step.id === activeStep && (
                    <div key={`content-${step.id}`}>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-full ${step.color} hover:${step.hoverColor} flex items-center justify-center text-dark-foreground mr-4 transition-all duration-300 transform hover:scale-110 cursor-pointer`}>
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                      
                      <h4 className="font-medium mb-3">Atividades principais:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.activities.map((activity, i) => (
                          <li key={i} className="flex items-center group cursor-pointer p-2 rounded hover:bg-dark-200 transition-all duration-200">
                            <div className={`w-2 h-2 rounded-full ${step.color} group-hover:${step.hoverColor} mr-3 transition-all duration-300 group-hover:scale-150`}></div>
                            <span className="group-hover:text-primary transition-colors duration-300">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}