import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-200 border-t border-border mt-24">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 - Logo e Descrição */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold gradient-text inline-block">
              UX Portfolio
            </Link>
            <p className="text-muted-foreground max-w-md">
              Um portfólio interativo criado para demonstrar minhas habilidades em UX/UI Design,
              através de projetos e experimentos interativos.
            </p>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-lg font-medium mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/projects" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span>Projetos</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/lab" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span>UX Lab</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/process" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span>Meu Processo</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span>Contato</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Redes Sociais */}
          <div>
            <h3 className="text-lg font-medium mb-4">Conecte-se</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/joanealves/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center bg-dark-100 hover:bg-primary transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/joane-alves-ribeiro/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center bg-dark-100 hover:bg-primary transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:joane.desenvolvimentoweb@gmail.com"
                className="h-10 w-10 rounded-full flex items-center justify-center bg-dark-100 hover:bg-primary transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Joane Alves. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Feito com ❤️ e Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}