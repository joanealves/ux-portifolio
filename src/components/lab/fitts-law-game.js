"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function FittsLawGame() {
  const [playing, setPlaying] = useState(false)
  const [target, setTarget] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [times, setTimes] = useState([])
  const [round, setRound] = useState(0)
  const totalRounds = 5

  const startRound = () => {
    const size = Math.random() > 0.5 ? 80 : 40 // px
    const top = Math.floor(Math.random() * 400 + 50)
    const left = Math.floor(Math.random() * 600 + 50)

    setTarget({ size, top, left })
    setStartTime(Date.now())
    setRound(prev => prev + 1)
  }

  const handleClick = () => {
    const endTime = Date.now()
    const reactionTime = endTime - startTime
    setTimes((prev) => [...prev, { size: target.size, time: reactionTime }])
    setTarget(null)

    // Próxima rodada ou fim do jogo
    if (round < totalRounds) {
      setTimeout(() => startRound(), 800)
    } else {
      setPlaying(false)
    }
  }

  const startGame = () => {
    setTimes([])
    setRound(0)
    setPlaying(true)
    setTimeout(() => startRound(), 500)
  }

  const getAverageBySize = (size) => {
    const filtered = times.filter(t => t.size === size)
    if (filtered.length === 0) return 0
    return Math.round(filtered.reduce((acc, t) => acc + t.time, 0) / filtered.length)
  }

  return (
    <div className="relative w-full max-w-xl bg-gray-800 border border-gray-700 rounded-xl p-4 mx-auto shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Fitts' Law Challenge</h2>

      {!playing && (
        <div className="text-center space-y-4 py-4">
          <p className="text-gray-300 mb-6">
            Clique no alvo o mais rápido possível. Vamos medir seu tempo de reação em diferentes tamanhos e distâncias.
          </p>
          <Button 
            onClick={startGame} 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Iniciar
          </Button>
          
          {times.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-medium mb-4 text-gray-200">Resultados:</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Alvos pequenos</p>
                  <p className="text-2xl font-bold text-blue-400">{getAverageBySize(40)} ms</p>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Alvos grandes</p>
                  <p className="text-2xl font-bold text-indigo-400">{getAverageBySize(80)} ms</p>
                </div>
              </div>
              
              <p className="mt-6 text-gray-300 text-sm">
                Tempo médio: <span className="text-white font-bold">
                  {Math.round(times.reduce((acc, t) => acc + t.time, 0) / times.length)} ms
                </span>
              </p>
              
              <p className="mt-4 text-gray-400 text-sm">
                A Lei de Fitts sugere que alvos maiores são mais fáceis e rápidos de acertar.
                {getAverageBySize(40) > getAverageBySize(80) ? 
                  " Seus resultados confirmam isto!" : 
                  " Seus resultados mostram um padrão interessante diferente do esperado."}
              </p>
            </div>
          )}
        </div>
      )}

      {playing && (
        <div className="relative w-full h-[500px] bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          <div className="absolute top-4 left-4 bg-gray-800/70 px-3 py-1 rounded-full text-xs text-gray-300">
            Rodada {round}/{totalRounds}
          </div>
          
          {target && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={handleClick}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full absolute flex items-center justify-center text-white text-xs shadow-lg shadow-blue-500/20"
              style={{
                width: target.size,
                height: target.size,
                top: target.top,
                left: target.left,
              }}
            >
              {target.size > 60 && "Clique"}
            </motion.button>
          )}
        </div>
      )}
    </div>
  )
}