import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react"
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-background to-dark-200/30 mt-24 backdrop-blur-sm">
  <div className="container py-16">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-6">
        <Link href="/" className="inline-block">
          <div className="text-2xl font-bold gradient-text">Joane Alves</div>
        </Link>
        <p className="text-muted-foreground leading-relaxed">
          Um portfólio interativo criado para demonstrar minhas habilidades em UX/UI Design,
          através de projetos e experimentos que transformam ideias em experiências memoráveis.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-6 gradient-text">Links Rápidos</h3>
        <ul className="space-y-4">
          <li>
            <Link 
              href="/projects" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
            >
              <ArrowRight className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              <span>Projetos</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/lab" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
            >
              <ArrowRight className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              <span>UX Lab</span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/contact" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
            >
              <ArrowRight className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              <span>Contato</span>
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-6 gradient-text">Conecte-se</h3>
        <div className="flex space-x-5">
          <a 
            href="https://github.com/joanealves/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-dark-100/50 to-dark-200/50 hover:from-primary/20 hover:to-primary/40 transition-all duration-300 shadow-lg group"
          >
            <Github className="h-5 w-5 group-hover:text-primary transition-colors duration-300" />
          </a>
          <a 
            href="https://www.linkedin.com/in/joane-alves-ribeiro/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-dark-100/50 to-dark-200/50 hover:from-primary/20 hover:to-primary/40 transition-all duration-300 shadow-lg group"
          >
            <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors duration-300" />
          </a>
          <a 
            href="mailto:joane.desenvolvimentoweb@gmail.com"
            className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-dark-100/50 to-dark-200/50 hover:from-primary/20 hover:to-primary/40 transition-all duration-300 shadow-lg group"
          >
            <Mail className="h-5 w-5 group-hover:text-primary transition-colors duration-300" />
          </a>
        </div>
        <div className="mt-8">
          <p className="text-muted-foreground">Vamos trabalhar juntos?</p>
          <a href="mailto:joane.desenvolvimentoweb@gmail.com" className="mt-2 inline-block text-primary hover:text-accent transition-colors duration-300">
            joane.desenvolvimentoweb@gmail.com
          </a>
        </div>
      </div>
    </div>

    <div className="mt-16 pt-6 border-t border-dark-100/20 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-muted-foreground">
        &copy; {currentYear} Joane Alves. Todos os direitos reservados.
      </p>
      <p className="text-sm text-muted-foreground mt-4 md:mt-0 flex items-center">
        Feito com <span className="text-red-500 px-1">❤️</span> e Next.js
      </p>
    </div>
  </div>
</footer>
  )
}