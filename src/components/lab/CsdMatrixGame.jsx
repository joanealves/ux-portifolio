"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const initialItems = [
  "Temos personas bem definidas",
  "O cliente entende o valor do produto",
  "A landing page converte bem",
  "Usuários voltam após o primeiro uso",
  "O suporte responde em até 1h"
]

const categories = ["Certezas", "Suposições", "Dúvidas"]

export default function CSDMatrixGame() {
  const [statements, setStatements] = useState(initialItems)
  const [matrix, setMatrix] = useState({
    Certezas: [],
    Suposições: [],
    Dúvidas: []
  })
  const [draggedItem, setDraggedItem] = useState(null)

  const handleDrop = (category) => {
    if (!draggedItem) return
    setMatrix(prev => ({
      ...prev,
      [category]: [...prev[category], draggedItem]
    }))
    setStatements(prev => prev.filter(item => item !== draggedItem))
    setDraggedItem(null)
  }

  const restartGame = () => {
    setStatements(initialItems)
    setMatrix({ Certezas: [], Suposições: [], Dúvidas: [] })
  }

  const allSorted = statements.length === 0

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="mb-6">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">Jogo da Matriz CSD</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Classifique as afirmações abaixo nas colunas de <strong>Certezas</strong>, <strong>Suposições</strong> e <strong>Dúvidas</strong>. 
            Este exercício ajuda a validar hipóteses e priorizar descobertas no processo de design.
          </p>
        </CardContent>
      </Card>

      {statements.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Arraste as frases para a matriz:</h2>
          <div className="flex flex-wrap gap-2">
            {statements.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => setDraggedItem(item)}
                className="cursor-move bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <Card
            key={idx}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(cat)}
            className="min-h-[200px] bg-gray-50 dark:bg-gray-900"
          >
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3">{cat}</h3>
              <div className="space-y-2">
                {matrix[cat].map((item, i) => (
                  <Badge key={i} className="block w-fit">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {allSorted && (
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">Parabéns!</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Agora você pode refletir sobre como essas classificações impactam suas decisões de design.
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-400">
                <li><strong>Certezas:</strong> baseiam decisões e não precisam ser testadas agora.</li>
                <li><strong>Suposições:</strong> podem guiar ações, mas precisam de validação.</li>
                <li><strong>Dúvidas:</strong> são pontos críticos e devem ser investigadas com prioridade.</li>
              </ul>
              <Button className="mt-4" onClick={restartGame}>
                <RefreshCcw className="w-4 h-4 mr-2" /> Jogar novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
