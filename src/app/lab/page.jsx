"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, X } from "lucide-react"

const NielsenGame = dynamic(() => import('@/components/lab/NielsenGame'), { ssr: false })
const FittsLawGame = dynamic(() => import('@/components/lab/FittsLawFGame'), { ssr: false })
import ConsistencyGame from "@/components/lab/ConsistencyGame"
import HicksLawGame from "@/components/lab/HicksLawGame"
import ProximityGame from "@/components/lab/ProximityGame"
import MemoryGame from "@/components/lab/MemoryGAme"
import DragAndDropGame from "@/components/lab/DragAndDropGame"
import ColorContrastGame from "@/components/lab/ColorContrsatGame"
import FontLegibilityGame from "@/components/lab/FontLegibillityGame"
import UserJourneyGame from "@/components/lab/UserJourneyGame"
import CSDMatrixGame from "@/components/lab/CsdMatrixGame"

const games = [
  {
    id: "nielsen",
    title: "Nielsen Game",
    description: "Teste seu conhecimento com os princípios de usabilidade de Jakob Nielsen.",
    component: <NielsenGame />
  },
  {
    id: "fitts-law",
    title: "Fitts' Law Challenge",
    description: "Teste seu tempo de reação com alvos de diferentes tamanhos.",
    component: <FittsLawGame />
  },
  {
    id: "consistency",
    title: "Consistência ou Confusão?",
    description: "Identifique qual design segue melhor os padrões de consistência visual.",
    component: <ConsistencyGame />
  },
  {
    id: "hicks-law",
    title: "Hick's Law Sprint",
    description: "Quantas opções são demais? Teste sua velocidade de decisão conforme o número de escolhas aumenta.",
    component: <HicksLawGame />
  },
  {
    id: "proximity",
    title: "Lei da Proximidade – Agrupe ou Confunda",
    description: "Será que o agrupamento dos elementos ajuda ou atrapalha? Descubra os princípios da Gestalt na prática.",
    component: <ProximityGame />
  },
  {
    id: "memory",
    title: "Jogo da Memória",
    description: "Encontre os pares de frutas neste jogo de memória visual.",
    component: <MemoryGame />
  },
  {
    id: "drag-and-drop",
    title: "Drag and Drop Challenge",
    description: "Arraste os itens para os grupos corretos.",
    component: <DragAndDropGame />
  },
  {
    id: "color-contrast",
    title: "Color Contraste",
    description: "Escolher qual esquema de cor apresenta o melhor contraste com base na acessibilidade.",
    component: <ColorContrastGame />
  },
  {
    id: "font-legibillity",
    title: "Legibilidade das Fontes",
    description: "O jogador deve ajustar a fonte, tamanho da fonte e espaçamento entre linhas para tornar o texto mais legível.",
    component: <FontLegibilityGame />
  },
  {
    id: "user-jorney",
    title: "Jornada do Usuario",
    description: "O jogador deve organizar corretamente as etapas da jornada de um usuário (ex: Descoberta, Consideração, Compra, Uso, Pós-venda) em uma linha do tempo visual.",
    component: <UserJourneyGame />
  },
  {
    id: "Csd-Matrix",
    title: "Matrix C",
    description: "É uma dinâmica interativa  usada em processos de design e inovação. O objetivo é classificar afirmações de um projeto como Certezas, Suposições ou Dúvidas, ajudando na priorização e validação de hipóteses.Não exsite certo ou errado a ideia é provocar as discussões.",
    component: <CSDMatrixGame />
  }
]

export default function Lab() {
  const [activeGame, setActiveGame] = useState(null)
  const [showGameModal, setShowGameModal] = useState(false)

  const handleGameSelect = (gameId) => {
    setActiveGame(gameId)
    setShowGameModal(true)
  }

  const closeGameModal = () => {
    setShowGameModal(false)
  }

  const selectedGame = games.find(game => game.id === activeGame)

  return (
    <div className="w-full min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <section className="max-w-6xl mx-auto text-center mb-16 relative">
        <div 
          className="absolute top-1/4 -left-24 w-64 h-64 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: "hsl(252, 87%, 64%)" }} 
          aria-hidden="true"
        ></div>
        <div 
          className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: "hsl(191, 97%, 77%)" }} 
          aria-hidden="true"
        ></div>

        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text gradient-text">UX Lab </h1> 
        <span className="text-4xl" role="img" aria-label="Laboratório">🧪</span>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
          Explore jogos interativos para testar e aprimorar suas habilidades em UX e usabilidade.
        </p>
        <p className="text-gray-300">O UX Lab é um local para você testar seus conhecimentos e para quem não conhece, ter a oportunidade de aprender enquanto se diverte.</p>
        <p>Vamos começar?</p>
      </section>

      <div className="mb-16 max-w-xl mx-auto">
        <ConsistencyGame />
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {games.filter(game => game.id !== "consistency").map((game) => (
          <Card key={game.id} className="p-6 bg-gray-800 border-gray-700 shadow-xl">
            <CardContent className="p-0">
              <h2 className="text-xl font-semibold mb-2 text-gray-100">{game.title}</h2>
              <p className="text-gray-300 mb-4">{game.description}</p>
              <Button 
                onClick={() => handleGameSelect(game.id)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                aria-label={`Jogar ${game.title}`}
              >
                Jogar <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showGameModal} onOpenChange={setShowGameModal}>
        <DialogContent className="sm:max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gray-800 border-gray-700 text-gray-100 p-0">
          <DialogHeader className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 p-4 flex flex-row items-center justify-between">
            <DialogTitle className="text-gray-100">{selectedGame?.title}</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeGameModal} 
              className="text-gray-300 hover:text-gray-100"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          <div className="p-4 overflow-y-auto">
            {selectedGame && selectedGame.component}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}