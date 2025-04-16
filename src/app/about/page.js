export default function AboutPage() {
    return (
      <section className="min-h-screen bg-background text-foreground px-6 md:px-24 py-24 flex items-center">
        <div className="w-full max-w-5xl mx-auto space-y-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="gradient-text">Sobre Joane Alves</span>
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
  
            <p>
              Atuo em todo o ciclo do design: pesquisa com usuários, mapeamento de jornadas, wireframes, UI com sistemas de design, protótipos navegáveis e testes de usabilidade. 
              Trabalho para que cada decisão de interface tenha propósito e gere valor.
            </p>
  
            <p>
              Meu diferencial está na ponte entre criatividade e tecnologia — minha experiência como <span className="text-accent">desenvolvedora Full Stack</span> me permite colaborar de forma mais integrada com engenheiros e transformar designs em experiências reais com precisão.
            </p>
          </div>
  
          <div className="pt-10 border-t border-border">
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
  