import Link from "next/link"

export default function AboutPage() {
    return (
      <section className="min-h-screen bg-background text-foreground px-6 md:px-24 py-32 flex items-center">
      <div 
        className="absolute top-1/4 -left-24 w-64 h-64 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: "hsl(252, 87%, 64%)" }} 
      ></div>
      <div 
        className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: "hsl(191, 97%, 77%)" }} 
      ></div>

        <div className="w-full max-w-5xl mx-auto space-y-12">
          <div>
            <h1 className="text-4xl md:text-4xl font-extrabold tracking-tight">
              <span className="gradient-text">Quem é Joane Alves</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Desde 2021, venho desenhando experiências que conectam pessoas, emoções e tecnologia.
            </p>
          </div>
  
          <div className="space-y-6 text-base md:text-lg leading-loose max-w-3xl">
            <p>
              Sou <strong className="text-primary">UX/UI Designer</strong> com foco em criar experiências digitais intuitivas, acessíveis e centradas no usuário. 
              Acredito no design como ferramenta estratégica para resolver problemas reais e transformar ideias em soluções encantadoras.
            </p>
            <p> Eu iniciei no design e  na fotografia, trabalhei em agências e studios.
              Na pandemia, tive minha primeira  experiência com UXUI, fiz alguns cursos e quando precisei criar um projeto que conectava Pcds ao mercado de tecnologia, me senti desafiada, a entender como a acessebilidade impacta tanto a vida das pessoas.
            </p>
            <p> Percebi que o UX é capaz de mudar a realidade dos usuários, aliado as tecnologias. 
              Andando junto ao desenvolvimento, pode gerar uma mudança, nos habitos dos usuários e das empresas. Impactando o jeito que o mercado funciona, gerando assim lucros para os dois lados.
            </p>
  
            <p>
              Atuo em todo o ciclo do design: pesquisa com usuários, mapeamento de jornadas, wireframes, UI com sistemas de design, protótipos navegáveis e testes de usabilidade. 
              Trabalho para que cada decisão de interface tenha propósito e gere valor.
            </p>
  
            <p>
              Meu diferencial está na ponte entre criatividade e tecnologia — minha experiência como <span className="text-accent">desenvolvedora Full Stack</span> me permite colaborar de forma mais integrada com engenheiros e transformar designs em experiências reais com precisão.
            </p>
          </div>
          <div className="space-y-4 mt-8">
            <p className="text-base md:text-lg leading-loose">
              Além do design, também atuo como <strong className="text-primary">desenvolvedora Full Stack</strong>.  
              Essa combinação me permite transformar ideias em experiências completas — do conceito ao código, do protótipo ao produto final.
            </p>

            <a
              href="https://joanealves.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition-all">
                💻 Ver Portfólio de Desenvolvimento
              </button>
            </a>
          </div>
 
          <div className="pt-6 border-t border-border">
            <h2 className="text-xl font-semibold mb-4 text-accent">Principais habilidades</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground text-sm md:text-base">
              <li>🔍 UX Research & Testes de Usabilidade</li>
              <li>🎨 UI Design acessível e escalável</li>
              <li>🧠 Arquitetura de Informação</li>
              <li>📐 Design System e Componentização</li>
              <li>📱 Prototipação no Figma</li>
              <li>💬 Comunicação fluida com Devs</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  