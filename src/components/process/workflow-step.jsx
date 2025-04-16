import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Edit3, Code, Lightbulb, ArrowRight, LayoutPanelTop } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UXProcess() {
  const [activeStep, setActiveStep] = useState(null);
  
  const processSteps = [
    {
      id: "research",
      title: "Pesquisa",
      icon: <Search className="h-6 w-6" />,
      color: "bg-blue-500",
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
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-12 gap-4">
        {processSteps.map((step, index) => (
          <div key={step.id} className="flex items-center w-full md:w-auto">
            <button
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              className={`flex items-center space-x-2 w-full md:w-auto rounded-lg transition-all duration-300 ${
                activeStep === step.id 
                  ? "bg-dark-100 p-3 shadow-lg border border-primary/50" 
                  : "p-3 hover:bg-dark-100"
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-dark-foreground`}>
                {step.icon}
              </div>
              <span className={`font-medium ${activeStep === step.id ? "text-primary" : ""}`}>{step.title}</span>
            </button>
            
            {index < processSteps.length - 1 && (
              <ArrowRight className="hidden md:block mx-2 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Expanded Step Content */}
      <div className="mt-8">
        {activeStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-100 p-6 rounded-xl border border-border"
          >
            {processSteps.map((step) => 
              step.id === activeStep && (
                <div key={`content-${step.id}`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-dark-foreground mr-4`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  
                  <h4 className="font-medium mb-3">Atividades principais:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.activities.map((activity, i) => (
                      <li key={i} className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${step.color} mr-3`}></div>
                        {activity}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <Button variant="outline" size="sm" className="gap-2">
                      Ver estudos de caso
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            )}
          </motion.div>
        )}
      </div>
    </div>  );
}