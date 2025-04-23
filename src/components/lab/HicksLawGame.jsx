"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HicksLawGame() {
  const [options, setOptions] = useState(2)
  const [startTime, setStartTime] = useState(null)
  const [message, setMessage] = useState("")

  const startTest = () => {
    setOptions(Math.floor(Math.random() * 6) + 2) 
    setStartTime(Date.now())
    setMessage("")
  }

  const handleClick = () => {
    if (startTime) {
      const reactionTime = ((Date.now() - startTime) / 1000).toFixed(2)
      setMessage(`Você escolheu em ${reactionTime} segundos com ${options} opções.`)
      setStartTime(null)
    }
  }

  return (
    <Card className="bg-gray-800 text-white">
      <CardContent className="p-6">
        <p className="mb-4">Clique para iniciar. Quanto mais opções, mais difícil decidir!</p>
        <Button onClick={startTest} className="mb-4">Iniciar Teste</Button>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {Array.from({ length: options }).map((_, idx) => (
            <Button key={idx} onClick={handleClick} variant="secondary">
              Opção {idx + 1}
            </Button>
          ))}
        </div>
        {message && <p className="text-green-400">{message}</p>}
      </CardContent>
    </Card>
  )
}