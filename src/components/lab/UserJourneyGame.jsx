"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, RefreshCcw } from "lucide-react"

const steps = [
  "Descoberta",
  "Consideração",
  "Compra",
  "Uso",
  "Pós-venda"
]

const shuffledSteps = () => [...steps].sort(() => Math.random() - 0.5)

export default function UserJourneyGame() {
  const [options, setOptions] = useState([])
  const [selectedOrder, setSelectedOrder] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    startGame()
  }, [])

  const startGame = () => {
    setOptions(shuffledSteps())
    setSelectedOrder([])
    setIsCompleted(false)
    setIsCorrect(false)
  }

  const handleSelect = (step) => {
    if (selectedOrder.includes(step) || isCompleted) return
    const newOrder = [...selectedOrder, step]
    setSelectedOrder(newOrder)

    if (newOrder.length === steps.length) {
      const correct = steps.every((item, index) => item === newOrder[index])
      setIsCorrect(correct)
      setIsCompleted(true)
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-lg">
      <CardContent className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Jogo da Jornada do Usuário</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Organize as etapas da jornada do usuário na ordem correta clicando nos cards. As etapas incluem desde o primeiro contato com o produto até o suporte pós-venda.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {options.map((step, index) => (
            <Button
              key={index}
              onClick={() => handleSelect(step)}
              className={`w-full py-6 ${
                selectedOrder.includes(step) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={selectedOrder.includes(step) || isCompleted}
              variant="outline"
            >
              {step}
            </Button>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Sua seleção:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedOrder.map((step, idx) => (
              <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">
                {idx + 1}. {step}
              </Badge>
            ))}
          </div>
        </div>

        {isCompleted && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <CheckCircle2 className={`w-6 h-6 ${isCorrect ? "text-green-500" : "text-red-500"}`} />
              {isCorrect ? "Parabéns! Você acertou a jornada!" : "Ops! A ordem está incorreta."}
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <Button onClick={startGame} variant="ghost" className="flex items-center gap-2 mx-auto">
            <RefreshCcw className="w-4 h-4" />
            Reiniciar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}