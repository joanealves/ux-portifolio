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
              Desde 2021, venho criando experiências digitais que unem design, tecnologia e impacto real na vida das pessoas.
            </p>
          </div>
          <div className="space-y-6 text-base md:text-lg leading-loose max-w-3xl">
            <p>
              Sou <strong className="text-primary">UX/UI Designer</strong> com background em desenvolvimento Full Stack e foco em criar soluções acessíveis, intuitivas e centradas no usuário — do mobile ao desktop. 
              Atuo em todo o ciclo do design: pesquisa, jornada do usuário, wireframes, UI com design systems, prototipação e testes.
            </p>
            <p> Minha trajetória começou no design gráfico e fotografia, passou por agências e ganhou propósito real ao criar um projeto voltado à    inclusão de <span className="text-accent">PCDs</span> no mercado tech. 
              Foi aí que entendi o poder do design acessível e seu impacto direto nas pessoas.
            </p>
            <p>Meu diferencial está na integração entre <strong className="text-accent">design e código</strong>: como dev Full Stack, colaboro com times de engenharia com fluidez 
      e contribuo na entrega de produtos que funcionam na prática, sem perder a experiência do usuário no centro.
            </p>
  
            <p>
               Transformo ideias em produtos reais — que resolvem problemas, geram valor e conectam pessoas.
            </p>
  
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              href="https://joanealves.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition-all"
              aria-label="Ver Portfólio de Desenvolvimento"
            >
              💻 Ver Portfólio de Desenvolvimento
            </a>

            <a
              href="/curriculo-joane.pdf"
              download
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:brightness-110 transition-all"
            >
              📄 Baixar Currículo (PDF)
            </a>
          </div>


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
  