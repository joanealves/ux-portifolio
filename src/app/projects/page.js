'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import capaImobiliaria from '../../assets/capaImobiliaria.png';
import ecomerceCover from '../../assets/ecomerce.png';


const projects = [
  {
    title: 'Plataforma de Streaming',
    description: 'UX Research · UI Design · Prototipação',
    link: '/projects/streaming',
    image: '', 
  },
  {
    title: 'Sistema de Gestão Escolar',
    description: 'Dashboard UX · Design System · Acessibilidade',
    link: '/projects/gestao-escolar',
    image: '', 
  },
  {
    title: 'Plataforma de Imobiliaria',
    description: 'UX · Testes com usuários',
    link: 'https://www.figma.com/proto/66KuZV4x9ViytCyo90X77l/CMS-para-Imobili%C3%A1ria---JSI-Im%C3%B3veis?node-id=44-605&p=f&t=K1d9jJQX41eiPHj9-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=44%3A605',
    image: capaImobiliaria,
  },
  {
    title: 'E-commerce',
    description: 'UI',
    link: 'https://www.figma.com/proto/XNIvlsu2557LMc5GzDM9ab/E-commerce-Website?node-id=20-2&p=f&t=0R3rEBr3He96DCNM-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=20%3A2&show-proto-sidebar=1',
    image: ecomerceCover,
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
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-6 border rounded-2xl hover:shadow-lg transition"
          >
            {project.image && (
              <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Capa do projeto ${project.title}`}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>
            )}
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>

            {project.link.startsWith('http') ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Ver projeto <ArrowRight size={18} />
              </a>
            ) : (
              <Link
                href={project.link}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Ver projeto <ArrowRight size={18} />
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}