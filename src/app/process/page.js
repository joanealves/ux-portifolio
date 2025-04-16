'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Search, Workflow, Palette, TestTube, Repeat, Mail } from 'lucide-react';


const steps = [
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: '1. Descoberta',
    desc: 'Entendemos o contexto, objetivos e necessidades reais do projeto.',
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: '2. Pesquisa',
    desc: 'Entrevistas, benchmarks e análise de comportamento para basear o design em dados.',
  },
  {
    icon: <Workflow className="w-8 h-8 text-primary" />,

    title: '3. Arquitetura',
    desc: 'Estruturamos a navegação, fluxos e hierarquias para uma experiência clara.',
  },
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: '4. UI Design',
    desc: 'Criação da interface com foco em estética, acessibilidade e consistência visual.',
  },
  {
    icon: <TestTube className="w-8 h-8 text-primary" />,
    title: '5. Testes',
    desc: 'Protótipos navegáveis e testes com usuários para validar decisões.',
  },
  {
    icon: <Repeat className="w-8 h-8 text-primary" />,
    title: '6. Iteração',
    desc: 'Ajustes finos com base em feedbacks e entrega final pronta para dev.',
  },
];

export default function ProcessPage() {
  return (
    <section className="snap-y snap-mandatory h-screen overflow-y-scroll bg-background text-foreground">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          className="h-screen flex flex-col justify-center items-center px-6 text-center snap-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <div className="mb-6">{step.icon}</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{step.title}</h2>
          <p className="max-w-xl text-lg text-muted-foreground">{step.desc}</p>
        </motion.div>
      ))}

      {/* CTA Final */}
      <motion.div
        className="h-screen flex flex-col justify-center items-center snap-start px-6 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Mail className="w-8 h-8 text-accent mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Vamos conversar?
        </h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-lg">
          Estou sempre aberta a novos projetos, parcerias e conexões criativas.
        </p>
        <a
          href="/contato"
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
        >
          Entrar em contato
        </a>
      </motion.div>
    </section>
  );
}
