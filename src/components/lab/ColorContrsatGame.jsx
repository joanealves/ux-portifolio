"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function ColorContrastGame() {
  const [score, setScore] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [gameCompleted, setGameCompleted] = useState(false)

  const colors = [
    { name: "Alto Contraste", backgroundColor: "#333", textColor: "#fff" },
    { name: "Baixo Contraste", backgroundColor: "#f5f5f5", textColor: "#ccc" },
    { name: "Contraste Médio", backgroundColor: "#3a3a3a", textColor: "#d6d6d6" },
    { name: "Pobre Contraste", backgroundColor: "#fff", textColor: "#f2f2f2" }
  ]

  const checkContrast = (backgroundColor, textColor) => {
    return backgroundColor === "#333" && textColor === "#fff"
  }

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    setCorrectAnswer(colors[randomIndex].name)
    setSelectedColor("")
    setFeedbackMessage("")
  }

  const handleSelectColor = (color) => {
    const selected = colors.find((c) => c.name === color)
    if (!selected) return

    const isCorrect = checkContrast(selected.backgroundColor, selected.textColor)

    if (isCorrect) {
      setScore(prev => prev + 1)
      setFeedbackMessage("✅ Correto! Este é um exemplo de contraste acessível.")
    } else {
      setFeedbackMessage("❌ Incorreto. Este contraste não é considerado acessível.")
    }

    setSelectedColor(color)

    if (score + 1 >= 5) {
      setGameCompleted(true)
    } else {
      setTimeout(startGame, 1500)
    }
  }

  useEffect(() => {
    if (!gameCompleted) startGame()
  }, [])

  return (
    <Card className="bg-white shadow-xl max-w-xl mx-auto mt-10 rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jogo do Contraste de Cores</h1>
          <p className="text-gray-600 mt-2">
            Escolha a combinação de cores com melhor contraste. Um bom contraste ajuda na acessibilidade e leitura.
          </p>
        </div>

        <Progress value={(score / 5) * 100} className="h-3 bg-gray-200" />

        <div className="grid grid-cols-2 gap-4">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleSelectColor(color.name)}
              className={`p-4 rounded-xl border transition-all hover:scale-105 ${
                selectedColor === color.name ? "ring-2 ring-blue-500" : ""
              }`}
              style={{
                backgroundColor: color.backgroundColor,
                color: color.textColor
              }}
            >
              {color.name}
            </button>
          ))}
        </div>

        {feedbackMessage && (
          <div className="text-center text-lg font-medium text-gray-800">
            {feedbackMessage}
          </div>
        )}

        {gameCompleted && (
          <div className="text-center mt-4">
            <p className="text-green-600 text-xl font-semibold">🎉 Parabéns! Você concluiu o jogo com sucesso.</p>
            <Button className="mt-3" onClick={() => {
              setScore(0)
              setGameCompleted(false)
              startGame()
            }}>
              Jogar Novamente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
