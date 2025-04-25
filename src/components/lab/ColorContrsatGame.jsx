"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
  }

  const handleSelectColor = (color) => {
    const selected = colors.find((c) => c.name === color)
    if (!selected) return

    const isCorrect = checkContrast(selected.backgroundColor, selected.textColor)

    if (isCorrect) {
      setScore(score + 1)
      setFeedbackMessage("Correta! O contraste de cor é adequado.")
    } else {
      setFeedbackMessage("Incorreta! O contraste de cor não é adequado.")
    }

    setSelectedColor(color)

    if (score >= 3) {
      setGameCompleted(true)
    }
  }

  useEffect(() => {
    if (!gameCompleted) {
      startGame()
    }
  }, [gameCompleted])

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 min-h-screen">
      <Card className="w-full max-w-md bg-gray-700">
        <CardContent>
          <h2 className="text-xl text-gray-200 mb-4">Teste de Acessibilidade de Cor</h2>
          {!gameCompleted ? (
            <>
              <p className="text-sm text-gray-300 mb-4">
                Escolha o esquema de cores que apresenta o melhor contraste de cor.
              </p>
              <div className="space-y-4">
                {colors.map((color) => (
                  <Button
                    key={color.name}
                    className={`w-full py-2 bg-${color.name === selectedColor ? "green-500" : "gray-500"} text-gray-100`}
                    onClick={() => handleSelectColor(color.name)}
                    style={{
                      backgroundColor: color.backgroundColor,
                      color: color.textColor,
                      border: selectedColor === color.name ? '2px solid #10B981' : 'none',
                    }}
                  >
                    {color.name}
                  </Button>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-300">{feedbackMessage}</p>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-lg text-gray-200">Jogo Completo!</h3>
              <p className="text-sm text-gray-300 mt-2">Você acertou {score} de 3.</p>
              <Button
                className="mt-4 bg-blue-600 text-white"
                onClick={() => {
                  setScore(0)
                  setGameCompleted(false)
                }}
              >
                Jogar novamente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
