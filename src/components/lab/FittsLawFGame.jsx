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
  const [difficulty, setDifficulty] = useState("normal")
  const [countdown, setCountdown] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  
  // Configurações de dificuldade
  const difficultySettings = {
    easy: { totalRounds: 5, sizes: [80, 60], countdownStart: 3 },
    normal: { totalRounds: 8, sizes: [80, 40], countdownStart: 2 },
    hard: { totalRounds: 10, sizes: [60, 30, 20], countdownStart: 1 }
  }
  
  const { totalRounds, sizes, countdownStart } = difficultySettings[difficulty]

  // Gera um novo alvo com tamanho, posição e distância variados
  const generateTarget = (prevTarget = null) => {
    // Escolhe um tamanho aleatório do array de tamanhos para a dificuldade atual
    const sizeIndex = Math.floor(Math.random() * sizes.length)
    const size = sizes[sizeIndex]
    
    // Define limites para garantir que o alvo esteja completamente dentro da área de jogo
    const maxTop = 450 - size
    const maxLeft = 600 - size
    
    let top, left
    
    if (prevTarget) {
      // Garante uma distância mínima do alvo anterior
      const minDistance = 100
      const maxDistance = 400
      
      // Tenta algumas vezes para gerar uma posição válida
      let attempts = 0
      let validPosition = false
      
      while (!validPosition && attempts < 10) {
        // Gera nova posição
        top = Math.floor(Math.random() * maxTop + 10)
        left = Math.floor(Math.random() * maxLeft + 10)
        
        // Calcula distância do alvo anterior
        const dx = left - prevTarget.left
        const dy = top - prevTarget.top
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Verifica se a distância está no intervalo desejado
        if (distance >= minDistance && distance <= maxDistance) {
          validPosition = true
        }
        
        attempts++
      }
      
      // Se não conseguiu uma posição válida após várias tentativas, apenas usa valores aleatórios
      if (!validPosition) {
        top = Math.floor(Math.random() * maxTop + 10)
        left = Math.floor(Math.random() * maxLeft + 10)
      }
    } else {
      // Para o primeiro alvo, usa posição aleatória
      top = Math.floor(Math.random() * maxTop + 10)
      left = Math.floor(Math.random() * maxLeft + 10)
    }
    
    return { size, top, left }
  }

  // Inicia uma nova rodada
  const startRound = () => {
    const newTarget = generateTarget(target)
    setTarget(newTarget)
    setStartTime(Date.now())
    setRound(prev => prev + 1)
  }

  // Processa o clique no alvo
  const handleClick = () => {
    if (!startTime) return
    
    const endTime = Date.now()
    const reactionTime = endTime - startTime
    
    // Calcula a distância do alvo anterior (se existir)
    let distance = 0
    if (times.length > 0) {
      const prevTarget = times[times.length - 1].target
      const dx = target.left - prevTarget.left
      const dy = target.top - prevTarget.top
      distance = Math.sqrt(dx * dx + dy * dy)
    }
    
    setTimes((prev) => [...prev, { 
      size: target.size, 
      time: reactionTime,
      target: { ...target },
      distance
    }])
    
    setTarget(null)

    if (round < totalRounds) {
      // Pequena pausa antes da próxima rodada
      setTimeout(() => startRound(), 800)
    } else {
      setPlaying(false)
    }
  }

  // Inicia o jogo com contagem regressiva
  const startGame = () => {
    setTimes([])
    setRound(0)
    setPlaying(true)
    
    // Inicia contagem regressiva
    setCountdown(countdownStart)
  }
  
  // Efeito para gerenciar a contagem regressiva
  useEffect(() => {
    if (countdown === null) return
    
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Quando a contagem chega a zero, inicia a primeira rodada
      setCountdown(null)
      setTimeout(() => startRound(), 300)
    }
  }, [countdown])

  // Calcula médias por tamanho de alvo
  const getAverageBySize = (size) => {
    const filtered = times.filter(t => t.size === size)
    if (filtered.length === 0) return 0
    return Math.round(filtered.reduce((acc, t) => acc + t.time, 0) / filtered.length)
  }
  
  // Calcula o índice de dificuldade de Fitts para cada clique
  const calculateFittsIndex = () => {
    if (times.length <= 1) return []
    
    return times.slice(1).map((time, i) => {
      const distance = time.distance
      const size = time.size
      // Fórmula do índice de dificuldade de Fitts: ID = log2(2D/W)
      // Onde D é a distância e W é o tamanho do alvo
      const difficultyIndex = Math.log2(2 * distance / size).toFixed(2)
      return {
        round: i + 2,
        time: time.time,
        size,
        distance: Math.round(distance),
        difficultyIndex
      }
    })
  }
  
  // Calcula o throughput (eficiência) médio
  const calculateAverageThroughput = () => {
    const fittsData = calculateFittsIndex()
    if (fittsData.length === 0) return 0
    
    // Throughput = ID/tempo (em segundos)
    const throughputs = fittsData.map(data => {
      return parseFloat(data.difficultyIndex) / (data.time / 1000)
    })
    
    return (throughputs.reduce((sum, t) => sum + t, 0) / throughputs.length).toFixed(2)
  }

  return (
    <div className="relative w-full max-w-xl bg-gray-800 border border-gray-700 rounded-xl p-4 mx-auto shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
        Fitts' Law Challenge
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="ml-2 text-sm text-gray-400 hover:text-gray-200"
        >
          ℹ️
        </button>
      </h2>
      
      {showInfo && (
        <div className="bg-gray-700/70 p-3 rounded-lg mb-4 text-sm text-gray-200">
          <p>A Lei de Fitts é um modelo do movimento humano que prediz o tempo necessário para mover-se rapidamente a um alvo, com base na distância até o alvo e seu tamanho.</p>
          <p className="mt-2">Quanto maior o alvo e menor a distância, mais fácil (rápido) será acertá-lo.</p>
          <p className="mt-2">Índice de Dificuldade = log₂(2D/W), onde D é a distância e W é o tamanho do alvo.</p>
          <p className="mt-2">Throughput mede sua eficiência (Índice de Dificuldade / Tempo).</p>
        </div>
      )}

      {!playing && (
        <div className="text-center space-y-4 py-4">
          <p className="text-gray-300 mb-6">
            Clique no alvo o mais rápido possível. Vamos medir seu tempo de reação baseado em diferentes tamanhos e distâncias.
          </p>
          
          <div className="flex justify-center gap-2 mb-4">
            <Button 
              onClick={() => setDifficulty("easy")}
              variant={difficulty === "easy" ? "default" : "outline"}
              className={difficulty === "easy" ? "bg-green-600 hover:bg-green-700" : "text-gray-300"}
            >
              Fácil
            </Button>
            <Button 
              onClick={() => setDifficulty("normal")}
              variant={difficulty === "normal" ? "default" : "outline"}
              className={difficulty === "normal" ? "bg-blue-600 hover:bg-blue-700" : "text-gray-300"}
            >
              Normal
            </Button>
            <Button 
              onClick={() => setDifficulty("hard")}
              variant={difficulty === "hard" ? "default" : "outline"}
              className={difficulty === "hard" ? "bg-red-600 hover:bg-red-700" : "text-gray-300"}
            >
              Difícil
            </Button>
          </div>
          
          <Button 
            onClick={startGame} 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Iniciar
          </Button>
          
          {times.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-medium mb-4 text-gray-200">Resultados:</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {sizes.map(size => (
                  <div key={size} className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">
                      Alvos {size < 40 ? "pequenos" : size < 70 ? "médios" : "grandes"} ({size}px)
                    </p>
                    <p className="text-2xl font-bold text-blue-400">{getAverageBySize(size)} ms</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-gray-700/30 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-300">
                    Tempo médio: <span className="text-white font-bold">
                      {Math.round(times.reduce((acc, t) => acc + t.time, 0) / times.length)} ms
                    </span>
                  </p>
                  <p className="text-gray-300">
                    Throughput: <span className="text-white font-bold">
                      {calculateAverageThroughput()} bits/s
                    </span>
                  </p>
                </div>
                
                <p className="text-gray-400 text-sm">
                  A Lei de Fitts sugere que alvos maiores e mais próximos são mais fáceis e rápidos de acertar.
                  {getAverageBySize(sizes[sizes.length-1]) > getAverageBySize(sizes[0]) ? 
                    " Seus resultados confirmam isto!" : 
                    " Seus resultados mostram um padrão interessante diferente do esperado."}
                </p>
                
                {times.length > 1 && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <h4 className="text-sm font-medium mb-2 text-gray-300">Detalhes por rodada:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-gray-300">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="py-2 text-left">Rodada</th>
                            <th className="py-2 text-right">Tamanho</th>
                            <th className="py-2 text-right">Distância</th>
                            <th className="py-2 text-right">Índice Fitts</th>
                            <th className="py-2 text-right">Tempo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculateFittsIndex().map((data) => (
                            <tr key={data.round} className="border-b border-gray-700">
                              <td className="py-2">{data.round}</td>
                              <td className="py-2 text-right">{data.size}px</td>
                              <td className="py-2 text-right">{data.distance}px</td>
                              <td className="py-2 text-right">{data.difficultyIndex}</td>
                              <td className="py-2 text-right">{data.time}ms</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {playing && (
        <div className="relative w-full h-[500px] bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          <div className="absolute top-4 left-4 bg-gray-800/70 px-3 py-1 rounded-full text-xs text-gray-300">
            Rodada {round}/{totalRounds}
          </div>
          
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-5xl font-bold text-white"
              >
                {countdown}
              </motion.div>
            </div>
          )}
          
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
                transition: "transform 0.1s"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {target.size > 40 && "Clique"}
            </motion.button>
          )}
          
          {times.length > 0 && target && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="absolute"
              style={{
                left: times[times.length-1].target.left + (times[times.length-1].target.size / 2),
                top: times[times.length-1].target.top + (times[times.length-1].target.size / 2),
                width: 2,
                height: Math.sqrt(
                  Math.pow(target.left - times[times.length-1].target.left, 2) +
                  Math.pow(target.top - times[times.length-1].target.top, 2)
                ),
                background: "linear-gradient(to bottom, rgba(96, 165, 250, 0.3), rgba(96, 165, 250, 0))",
                transformOrigin: "top",
                transform: `rotate(${Math.atan2(
                  target.top - times[times.length-1].target.top,
                  target.left - times[times.length-1].target.left
                ) + Math.PI/2}rad)`
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}