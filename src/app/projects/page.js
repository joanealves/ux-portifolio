'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Plataforma de Streaming',
    description: 'UX Research · UI Design · Prototipação',
    link: '/projects/streaming',
  },
  {
    title: 'Sistema de Gestão Escolar',
    description: 'Dashboard UX · Design System · Acessibilidade',
    link: '/projects/gestao-escolar',
  },
  {
    title: 'App de Audiobooks',
    description: 'UX Mobile · React Native · Testes com usuários',
    link: '/projects/audiobooks',
  },
  {
    title: 'E-commerce',
    description: 'UI',
    link: 'https://www.figma.com/design/XNIvlsu2557LMc5GzDM9ab/E-commerce-Website?node-id=39-1402&t=KCmaB2eNWorB26OJ-1',
  },
];

export default function ProjectsPage() {
  return (
    <section className="min-h-screen px-6 md:px-24 py-24 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Projetos & Cases</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Uma seleção de experiências onde UX e UI caminharam juntas para criar soluções impactantes.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-border bg-muted rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 gradient-text">{project.title}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <Link
              href={project.link}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Ver projeto <ArrowRight size={18} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
