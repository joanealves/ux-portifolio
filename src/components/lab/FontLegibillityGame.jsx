"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

export default function FontLegibilityGame() {
  const [fontSize, setFontSize] = useState("16px")
  const [lineHeight, setLineHeight] = useState("1.5")
  const [fontFamily, setFontFamily] = useState("Arial")
  const [score, setScore] = useState(0)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [gameCompleted, setGameCompleted] = useState(false)

  const textSample = "A legibilidade do texto depende de várias propriedades tipográficas, como o tipo de fonte, o tamanho da fonte e o espaçamento entre as linhas. O objetivo deste jogo é ajustar esses parâmetros para tornar a leitura o mais confortável possível."

  const checkLegibility = () => {
    const newScore = score + 1;
    
    if (fontSize === "16px" && lineHeight === "1.5" && fontFamily !== "Comic Sans MS") {
      setScore(newScore)
      setFeedbackMessage("✅ Correto! A tipografia está bem ajustada para legibilidade.")
    } else {
      setFeedbackMessage("⚠️ Incorreto! Tente uma fonte mais legível, tamanho e espaçamento adequados.")
    }

    if (newScore >= 2) {
      setGameCompleted(true)
    }
  }

  const resetGame = () => {
    setScore(0)
    setFontSize("16px")
    setLineHeight("1.5")
    setFontFamily("Arial")
    setFeedbackMessage("")
    setGameCompleted(false)
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-gray-100">
      <Card className="w-full max-w-2xl bg-gray-800 shadow-lg border border-gray-700">
        <CardContent className="space-y-6 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">📝 Jogo de Legibilidade</h2>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">
              Pontuação: {score}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <label className="text-sm mb-1 block">Fonte</label>
              <Select onValueChange={setFontFamily} value={fontFamily}>
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Escolha a fonte" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-gray-700 text-white border-gray-600 z-50">
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Verdana">Verdana</SelectItem>
                  <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <label className="text-sm mb-1 block">Tamanho</label>
              <Select onValueChange={setFontSize} value={fontSize}>
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Tamanho" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-gray-700 text-white border-gray-600 z-50">
                  <SelectItem value="14px">14px</SelectItem>
                  <SelectItem value="16px">16px </SelectItem>
                  <SelectItem value="18px">18px</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <label className="text-sm mb-1 block">Espaçamento de linha</label>
              <Select onValueChange={setLineHeight} value={lineHeight}>
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Espaçamento" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-gray-700 text-white border-gray-600 z-50">
                  <SelectItem value="1.2">1.2</SelectItem>
                  <SelectItem value="1.5">1.5 </SelectItem>
                  <SelectItem value="1.8">1.8</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div
            className="p-4 rounded-md bg-gray-700 text-white mt-8 shadow-inner border border-gray-600"
            style={{
              fontSize: fontSize,
              lineHeight: lineHeight,
              fontFamily: fontFamily
            }}
          >
            {textSample}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="flex gap-3 w-full sm:w-auto">
              <Button onClick={checkLegibility} className="bg-blue-600 hover:bg-blue-700 text-white">
                Verificar Legibilidade
              </Button>
              <Button onClick={resetGame} variant="outline" className="border-gray-600 hover:bg-gray-700">
                Reiniciar
              </Button>
            </div>
            {feedbackMessage && (
              <p className="text-sm bg-gray-700 p-2 rounded-lg border border-gray-600 w-full sm:w-auto text-center">
                {feedbackMessage}
              </p>
            )}
          </div>

          {gameCompleted && (
            <div className="bg-green-900/50 border border-green-500 rounded-lg p-4 text-center mt-4">
              <p className="text-green-400 font-semibold">
                🎉 Parabéns! Você completou o jogo!
              </p>
              <p className="text-green-300 text-sm mt-1">
                Você dominou os princípios básicos de legibilidade tipográfica.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}