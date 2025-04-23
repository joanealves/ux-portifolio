"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const layouts = [
  { id: 1, correct: true, label: "Agrupado logicamente" },
  { id: 2, correct: false, label: "Disperso aleatoriamente" },
  { id: 3, correct: false, label: "Elementos agrupados por cor, não por função" },
]

export default function ProximityGame() {
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState("")

  const handleSelection = (id, correct) => {
    setSelected(id)
    setFeedback(correct ? "Acertou! Elementos agrupados facilitam a compreensão." : "Tente novamente! Nem toda proximidade ajuda na leitura.")
  }

  return (
    <Card className="bg-gray-800 text-white">
      <CardContent className="p-6">
        <p className="mb-4">Qual layout usa melhor a Lei da Proximidade?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {layouts.map((layout) => (
            <Button
              key={layout.id}
              onClick={() => handleSelection(layout.id, layout.correct)}
              variant={selected === layout.id ? "default" : "secondary"}
            >
              {layout.label}
            </Button>
          ))}
        </div>
        {feedback && <p className="mt-4 text-green-400">{feedback}</p>}
      </CardContent>
    </Card>
  )
}
