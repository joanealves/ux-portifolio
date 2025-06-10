'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/layout/navbar';

import CapaImobiliaria from '../../assets/capaImobiliaria.png';
import CapaScandinavo from '../../assets/capa_scandinavo.jpg';
import CapaSchema from '../../assets/capa_schema.jpg'
import CapaUXPortifolio from '../../assets/capa_uxPortifolio.png';
import CapaPortifolio from '../../assets/capa_portifolio.png';
import Tenute from '../../assets/Tenute.png';
import Ecommerce from "../../assets/capa_ecommerce.png";

const projects = [
  {
    title: 'UX/UI | Joane Alves - UX Portifólio',
    description: 'Dashboard UX · Design System · Acessibilidade - Desenvolvimento Frontend',
    link: 'https://www.figma.com/proto/iq9RxnRlm5a93DbpxktGqD/UX-Portif%C3%B3lio-%7C-Joane?node-id=4-526&t=7vlAA9f0mzqJyGtT-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=4%3A526',
    image: CapaUXPortifolio, 
  },
  {
    title: 'Ecommerce | Scandinavo',
    description: 'UX · UI Design · Prototipação',
    link: 'https://www.figma.com/proto/jlN5e4HMk2dA0xnoYKu6Gf/Scandinavo-%7C-ECommerce-%7C-Design-web?node-id=117-336&t=VLSvoe18Ghvyt0Qf-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=117%3A1143',
    image: CapaScandinavo, 
  },
  {
    title: 'Joane Alves | Portifólio Desenvolvimento',
    description: 'Dashboard UX · Design System · Acessibilidade - Desenvolvimento Frontend',
    link: 'https://www.figma.com/design/iq9RxnRlm5a93DbpxktGqD/UX-Portif%C3%B3lio-%7C-Joane?m=auto&t=8KFi9cVjVLsf3abS-1',
    image: CapaPortifolio, 
  },
  {
    title: 'Tenute | Website',
    description: 'Projeto website Tenute Vinhos. Um projeto no-code em webflow. No ano de 2021, lançamento do projeto de resort.',
    link: 'https://vinho-2bee95e37e1aa0589d3ebb6ed2f69037.webflow.io/',
    image: Tenute,
  },
  {
    title: 'Ecommerce | UX',
    description: 'Projeto de ecommerce de loja web e mobile.',
    link: 'https://www.figma.com/proto/XNIvlsu2557LMc5GzDM9ab/E-commerce-Website?node-id=20-2&p=f&t=EqcctkKyyXtH1ttI-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=20%3A2',
    image: Ecommerce,
  },
  {
    title: 'Plataforma de Imobiliaria',
    description: 'UX · Testes com usuários',
    link: 'https://www.figma.com/proto/66KuZV4x9ViytCyo90X77l/CMS-para-Imobili%C3%A1ria---JSI-Im%C3%B3veis?node-id=44-605&p=f&t=K1d9jJQX41eiPHj9-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=44%3A605',
    image: CapaImobiliaria,
  },
  {
    title: 'Design website',
    description: 'Dashboard UX · Design System · Acessibilidade',
    link: 'https://www.figma.com/design/uYiPKPIaNz9vjImMGqENat/Schema--Copy-?node-id=411-169&t=AXkj6VK82j4J0E0u-1',
    image: CapaSchema, 
  },
];

export default function ProjectsPage() {
  return (
    <>
    <Navbar />
    <section className="min-h-screen px-4 md:px-8 lg:px-12 py-12 bg-background text-foreground">
      <div 
        className="absolute top-1/4 -left-24 w-64 h-64 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: "hsl(252, 87%, 64%)" }} 
      ></div>
      <div 
        className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: "hsl(191, 97%, 77%)" }} 
      ></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">Projetos & Cases</span>
        </h1>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
          Uma seleção de experiências onde UX e UI caminharam juntas para criar soluções impactantes.
        </p>
      </motion.div>

      <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition h-full flex flex-col"
          >
            <div className="relative h-40 sm:h-36 overflow-hidden px-3 pt-3">
              <div className="h-full w-full rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Capa do projeto ${project.title}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  fill={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                />
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-bold text-white line-clamp-1">{project.title}</h2>
              <p className="text-gray-500 text-xs mt-1 mb-3 line-clamp-2 flex-1">{project.description}</p>
              
              {project.link.startsWith('http') ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline mt-auto"
                  aria-label={`Ver projeto ${project.title}`}
                >
                  Ver projeto <ArrowRight size={16} />
                </a>
              ) : (
                <Link
                  href={project.link}
                  className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline mt-auto"
                  aria-label={`Ver projeto ${project.title}`}
                >
                  Ver projeto <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </>
  );
}