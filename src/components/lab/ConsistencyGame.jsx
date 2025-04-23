"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
  {
    id: 1,
    prompt: "Qual botão está mais consistente com padrões de design?",
    options: [
      { label: "Salvar", style: "bg-primary text-white rounded px-4 py-2" },
      { label: "Salvar", style: "bg-yellow-400 text-black px-2 py-1 rounded-full italic" },
    ],
    correct: 0,
  },
  {
    id: 2,
    prompt: "Qual campo de input parece mais coerente com um formulário padrão?",
    options: [
      { label: "Nome", style: "border px-2 py-1 rounded w-full" },
      { label: "Seu nome completo aqui", style: "underline text-blue-500 w-full italic" },
    ],
    correct: 0,
  },
  {
    id: 3,
    prompt: "Qual layout de botão de fechar é mais comum?",
    options: [
      { label: "✕", style: "text-gray-400 hover:text-white text-xl" },
      { label: "Fechar aqui!", style: "bg-pink-400 text-white px-3 py-1 rounded-full" },
    ],
    correct: 0,
  },
]

export default function ConsistencyGame() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const question = questions[current]

  const handleSelect = (index) => {
    setSelected(index)
    if (index === question.correct) {
      setScore((prev) => prev + 1)
    }
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((prev) => prev + 1)
        setSelected(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const restart = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setShowResult(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800/80 border border-gray-700 rounded-xl space-y-4 shadow-lg">
      <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">🔍 Consistência ou Confusão?</h2>

      {showResult ? (
        <div className="text-center space-y-2 py-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-4 rounded-lg inline-block mb-4">
            <p className="text-2xl font-bold">
              {score} / {questions.length}
            </p>
          </div>
          <p className="text-gray-300 mb-6">
            {score >= (questions.length / 2) 
              ? "Ótimo trabalho! Você tem um bom olho para consistência."
              : "Continue praticando para melhorar seu senso de consistência."}
          </p>
          <Button 
            onClick={restart}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Tentar novamente
          </Button>
        </div>
      ) : (
        <>
          <p className="mb-2 text-gray-300">{question.prompt}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((option, idx) => (
              <AnimatePresence mode="wait" key={idx}>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "p-6 text-center border border-gray-700 rounded-lg hover:border-gray-500 transition-all",
                    option.style,
                    selected === idx && (idx === question.correct
                      ? "ring-2 ring-green-500"
                      : "ring-2 ring-red-500")
                  )}
                >
                  {option.label}
                </motion.button>
              </AnimatePresence>
            ))}
          </div>
          {selected !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-gray-700/50"
            >
              {selected === question.correct ? (
                <>
                  <CheckCircle className="text-green-500" />
                  <span className="text-green-400 font-medium">Boa! Resposta correta.</span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-500" />
                  <span className="text-red-400 font-medium">Oops! Essa não é a melhor escolha.</span>
                </>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}