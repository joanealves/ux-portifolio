import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SkillsChart() {
  const [activeTab, setActiveTab] = useState("ux");
  const [animateSkills, setAnimateSkills] = useState(false);
  
  // Dados de habilidades
  const skillsData = {
    ux: [
      { name: "Pesquisa de Usuários", level: 95 },
      { name: "Wireframing", level: 90 },
      { name: "Prototipagem", level: 88 },
      { name: "Testes de Usabilidade", level: 85 },
      { name: "Arquitetura de Informação", level: 92 }
    ],
    ui: [
      { name: "Design Visual", level: 90 },
      { name: "Design Systems", level: 85 },
      { name: "Animações & Micro-interações", level: 80 },
      { name: "Acessibilidade", level: 95 },
      { name: "Responsividade", level: 92 }
    ],
    tools: [
      { name: "Figma", level: 98 },
      { name: "Adobe XD", level: 85 },
      { name: "Sketch", level: 80 },
      { name: "Protopie", level: 75 },
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 75 }
    ]
  };
  
  useEffect(() => {
    // Iniciar animação após mudança de tab
    setAnimateSkills(false);
    const timer = setTimeout(() => {
      setAnimateSkills(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  const tabs = [
    { id: "ux", label: "UX Design" },
    { id: "ui", label: "UI Design" },
    { id: "tools", label: "Ferramentas" }
  ];
  
  return (
    <div className="mb-12">
      {/* Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "bg-dark-200 text-muted-foreground hover:bg-dark-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skills Chart */}
      <div className="bg-dark-100 rounded-xl p-6">
        <div className="space-y-6">
          {skillsData[activeTab].map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-primary">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-dark-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: animateSkills ? `${skill.level}%` : 0 }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Animated Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-dark-200 rounded-lg border border-border"
        >
          <h4 className="text-sm font-medium mb-2 text-primary">Dica Profissional:</h4>
          <p className="text-sm text-muted-foreground">
            {activeTab === "ux" && "Sempre comece com pesquisa sólida com usuários antes de avançar para soluções de design."}
            {activeTab === "ui" && "Design systems consistentes economizam tempo e melhoram a experiência do usuário significativamente."}
            {activeTab === "tools" && "Mantenha-se atualizado com novas ferramentas, mas lembre-se que princípios de design são mais importantes que dominar ferramentas."}
          </p>
        </motion.div>
      </div>
    </div>
  );
}