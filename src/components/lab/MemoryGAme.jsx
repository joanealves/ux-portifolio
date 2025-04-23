"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MemoryGame() {
  // Estado para controlar o jogo
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)

  // Frutas para o jogo
  const items = ["🍎", "🍌", "🍓", "🍇", "🍊", "🍍", "🥭", "🍑"]

  // Inicializar o jogo
  const initializeGame = (difficulty = 8) => {
    // Seleciona as frutas baseadas na dificuldade
    const selectedItems = items.slice(0, difficulty / 2)
    
    // Cria o baralho embaralhado
    const newCards = [...selectedItems, ...selectedItems]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ id: index, value: item, isFlipped: false, isMatched: false }))
    
    setCards(newCards)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameOver(false)
    setTimer(0)
    setIsActive(true)
  }

  // Efeito para inicializar o jogo quando componente montar
  useEffect(() => {
    initializeGame()
  }, [])

  // Efeito para o timer
  useEffect(() => {
    let interval = null
    
    if (isActive && !gameOver) {
      interval = setInterval(() => {
        setTimer(seconds => seconds + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    
    return () => clearInterval(interval)
  }, [isActive, gameOver])

  // Verificar se o jogo acabou
  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      setGameOver(true)
      setIsActive(false)
    }
  }, [matched, cards])

  // Lógica para virar cartas
  const handleClick = (id) => {
    // Não permitir cliques durante animação ou em cartas já viradas
    if (flipped.length === 2) return
    if (flipped.includes(id) || matched.includes(id)) return

    // Virar a carta selecionada
    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    // Se duas cartas estão viradas
    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      
      const [first, second] = newFlipped
      const firstCard = cards.find(card => card.id === first)
      const secondCard = cards.find(card => card.id === second)
      
      // Verificar se as cartas são iguais
      if (firstCard.value === secondCard.value) {
        setMatched([...matched, first, second])
        setFlipped([])
      } else {
        // Temporizador para virar as cartas de volta
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  // Formatar tempo
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="bg-gray-800 text-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Jogo da Memória</h2>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => initializeGame(8)}
              className="text-white border-white hover:bg-gray-700"
            >
              Fácil
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => initializeGame(12)}
              className="text-white border-white hover:bg-gray-700"
            >
              Médio
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => initializeGame(16)}
              className="text-white border-white hover:bg-gray-700"
            >
              Difícil
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between mb-4">
          <p>Movimentos: {moves}</p>
          <p>Tempo: {formatTime(timer)}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`h-16 text-2xl rounded-md flex items-center justify-center transition-all duration-300 ${
                flipped.includes(card.id) || matched.includes(card.id)
                  ? "bg-gray-600 rotate-y-180"
                  : "bg-gray-700"
              } ${matched.includes(card.id) ? "bg-green-700" : ""}`}
              disabled={gameOver}
            >
              {flipped.includes(card.id) || matched.includes(card.id) ? card.value : "❓"}
            </button>
          ))}
        </div>

        {gameOver && (
          <div className="mt-4 p-3 bg-green-800 rounded-md text-center">
            <p className="text-lg font-bold">Parabéns! Você completou o jogo.</p>
            <p>Movimentos: {moves} | Tempo: {formatTime(timer)}</p>
            <Button 
              onClick={() => initializeGame(cards.length)} 
              className="mt-2 bg-green-600 hover:bg-green-700"
            >
              Jogar Novamente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}