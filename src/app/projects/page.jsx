'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import CapaImobiliaria from '../../assets/capaImobiliaria.png';
import ecomerceCover from '../../assets/ecomerce.png';
import CapaScandinavo from '../../assets/capa_scandinavo.jpg';
import CapaSchema from '../../assets/capa_schema.jpg'
import  CapaUXPortifolio from '../../assets/capa_uxPortifolio.png';
import  CapaPortifolio from '../../assets/capa_portifolio.png';
import Tenute from '../../../public/tenute.gif';


const projects = [

  {
    title: 'UX/UI | Joane Alves - UX Portifólio',
    description: 'Dashboard UX · Design System · Acessibilidade - Desenvolvimento Frontend',
    link: 'https://www.figma.com/design/GHBb29M9AXwWo4tqbszjuz/Joane-portif%C3%B3lio?node-id=47-2238&t=WPZ0KIKS7tO6UqfD-1',
    image: CapaUXPortifolio, 
  },
  {
    title: 'Ecommerce | Scandinavo',
    description: 'UX · UI Design · Prototipação',
    link: 'https://www.figma.com/proto/jlN5e4HMk2dA0xnoYKu6Gf/Scandinavo-%7C-ECommerce-%7C-Design-web?node-id=117-336&t=VLSvoe18Ghvyt0Qf-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=117%3A1143',
    image: CapaScandinavo, 
  },
  {
    title: 'Design website',
    description: 'Dashboard UX · Design System · Acessibilidade',
    link: 'https://www.figma.com/design/uYiPKPIaNz9vjImMGqENat/Schema--Copy-?node-id=411-169&t=AXkj6VK82j4J0E0u-1',
    image: CapaSchema, 
  },
  {
    title: 'Joane Alves | Portifólio Desenvolvimento',
    description: 'Dashboard UX · Design System · Acessibilidade - Desenvolvimento Frontend',
    link: 'https://www.figma.com/design/iq9RxnRlm5a93DbpxktGqD/UX-Portif%C3%B3lio-%7C-Joane?m=auto&t=8KFi9cVjVLsf3abS-1',
    image: CapaPortifolio, 
  },
  {
    title: 'Plataforma de Imobiliaria',
    description: 'UX · Testes com usuários',
    link: 'https://www.figma.com/proto/66KuZV4x9ViytCyo90X77l/CMS-para-Imobili%C3%A1ria---JSI-Im%C3%B3veis?node-id=44-605&p=f&t=K1d9jJQX41eiPHj9-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=44%3A605',
    image: CapaImobiliaria,
  },
  {
    title: 'Tenute | Website',
    description: 'Projeto website Tenute Vinhos. Um projeto no-code em webflow. No ano de 2021, lançamento do projeto de resort.',
    link: 'https://vinho-2bee95e37e1aa0589d3ebb6ed2f69037.webflow.io/',
    image: Tenute,
  },
  {
    title: 'E-commerce',
    description: 'UX - UI',
    link: 'https://www.figma.com/proto/XNIvlsu2557LMc5GzDM9ab/E-commerce-Website?node-id=20-2&p=f&t=0R3rEBr3He96DCNM-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=20%3A2&show-proto-sidebar=1',
    image: ecomerceCover,
  },
];

export default function ProjectsPage() {
  return (
    <section className="min-h-screen px-6 md:px-12 lg:px-16 py-16 bg-background text-foreground">
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
        className="text-center mb-12"
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
            className="group rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="relative w-full h-60 md:h-64 lg:h-72 overflow-hidden px-4 pt-4">
              <div className="h-full w-full rounded-2xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Capa do projeto ${project.title}`}
                  className="object-cover w-full h-full"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                  unoptimized 
                />
              </div>
            </div>
            
            <div className="p-5 pt-3">
              <h2 className="text-xl font-bold text-white">{project.title}</h2>
              <p className="text-gray-500 text-sm mt-1 mb-3">{project.description}</p>
              
              {project.link.startsWith('http') ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                  aria-label={`Ver projeto ${project.title}`}
                >
                  Ver projeto <ArrowRight size={18} />
                </a>
              ) : (
                <Link
                  href={project.link}
                  className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                  aria-label={`Ver projeto ${project.title}`}
                >
                  Ver projeto <ArrowRight size={18} />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}