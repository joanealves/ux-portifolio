"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { X } from "lucide-react"

export default function FittsLawGame() {
  const [playing, setPlaying] = useState(false)
  const [target, setTarget] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [times, setTimes] = useState([])
  const [round, setRound] = useState(0)
  const [difficulty, setDifficulty] = useState("normal")
  const [countdown, setCountdown] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const gameAreaRef = useRef(null)
  const resultsRef = useRef(null)
  const modalRef = useRef(null)
  const [gameAreaDimensions, setGameAreaDimensions] = useState({ width: 600, height: 500 })
  
  const difficultySettings = {
    easy: { totalRounds: 5, sizes: [80, 60], countdownStart: 3 },
    normal: { totalRounds: 8, sizes: [80, 40], countdownStart: 2 },
    hard: { totalRounds: 10, sizes: [60, 30, 20], countdownStart: 1 }
  }
  
  const { totalRounds, sizes, countdownStart } = difficultySettings[difficulty]

  useEffect(() => {
    function handleClickOutside(event) {
      if (showInfo && modalRef.current && !modalRef.current.contains(event.target)) {
        setShowInfo(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showInfo])

  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === "Escape" && showInfo) {
        setShowInfo(false)
      }
    }
    
    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [showInfo])

  useEffect(() => {
    if (showInfo) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showInfo])

  useEffect(() => {
    if (gameAreaRef.current && playing) {
      const updateDimensions = () => {
        const rect = gameAreaRef.current.getBoundingClientRect()
        setGameAreaDimensions({
          width: rect.width,
          height: rect.height
        })
      }
      
      updateDimensions()
      window.addEventListener('resize', updateDimensions)
      
      return () => window.removeEventListener('resize', updateDimensions)
    }
  }, [playing])

  useEffect(() => {
    if (!playing && times.length > 0 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [playing, times.length])

  const generateTarget = (prevTarget = null) => {
    const sizeIndex = Math.floor(Math.random() * sizes.length)
    const size = sizes[sizeIndex]
    
    const padding = 20
    const maxTop = gameAreaDimensions.height - size - padding * 2
    const maxLeft = gameAreaDimensions.width - size - padding * 2
    
    let top, left
    
    if (prevTarget) {
      const minDistance = Math.min(80, gameAreaDimensions.width * 0.15)
      const maxDistance = Math.min(350, gameAreaDimensions.width * 0.7)
      
      let attempts = 0
      let validPosition = false
      
      while (!validPosition && attempts < 20) {
        top = Math.floor(Math.random() * maxTop + padding)
        left = Math.floor(Math.random() * maxLeft + padding)
        
        const dx = left - prevTarget.left
        const dy = top - prevTarget.top
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance >= minDistance && distance <= maxDistance) {
          if (top >= padding && 
              top + size <= gameAreaDimensions.height - padding &&
              left >= padding && 
              left + size <= gameAreaDimensions.width - padding) {
            validPosition = true
          }
        }
        
        attempts++
      }
      
      if (!validPosition) {
        top = Math.floor(Math.random() * (maxTop - 2 * padding) + padding * 2)
        left = Math.floor(Math.random() * (maxLeft - 2 * padding) + padding * 2)
      }
    } else {
      top = Math.floor((gameAreaDimensions.height - size) / 2)
      left = Math.floor((gameAreaDimensions.width - size) / 2)
    }
    
    top = Math.max(padding, Math.min(gameAreaDimensions.height - size - padding, top))
    left = Math.max(padding, Math.min(gameAreaDimensions.width - size - padding, left))
    
    return { size, top, left }
  }

  const startRound = () => {
    const newTarget = generateTarget(target)
    setTarget(newTarget)
    setStartTime(Date.now())
    setRound(prev => prev + 1)
  }

  const handleClick = () => {
    if (!startTime) return
    
    const endTime = Date.now()
    const reactionTime = endTime - startTime
    
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
      setTimeout(() => startRound(), 800)
    } else {
      setPlaying(false)
    }
  }

  const startGame = () => {
    setTimes([])
    setRound(0)
    setPlaying(true)
    
    setCountdown(countdownStart)
  }
  
  const resetGame = () => {
    setTimes([])
    setPlaying(false)
    setRound(0)
    setTarget(null)
  }
  
  useEffect(() => {
    if (countdown === null) return
    
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCountdown(null)
      setTimeout(() => startRound(), 300)
    }
  }, [countdown])

  const getAverageBySize = (size) => {
    const filtered = times.filter(t => t.size === size)
    if (filtered.length === 0) return 0
    return Math.round(filtered.reduce((acc, t) => acc + t.time, 0) / filtered.length)
  }
  
  const calculateFittsIndex = () => {
    if (times.length <= 1) return []
    
    return times.slice(1).map((time, i) => {
      const distance = time.distance
      const size = time.size
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
  
  const calculateAverageThroughput = () => {
    const fittsData = calculateFittsIndex()
    if (fittsData.length === 0) return 0
    
    const throughputs = fittsData.map(data => {
      return parseFloat(data.difficultyIndex) / (data.time / 1000)
    })
    
    return (throughputs.reduce((sum, t) => sum + t, 0) / throughputs.length).toFixed(2)
  }

  return (
    <div className="relative w-full max-w-xl mx-auto bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          Fitts' Law Challenge
        </h2>
        <div className="relative">
          <button 
            onClick={() => setShowInfo(!showInfo)}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
            className="flex items-center justify-center w-8 h-8 text-sm bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 hover:text-gray-200 transition-colors cursor-pointer"
            aria-label="Mostrar informações"
          >
            ℹ️
          </button>
          
          {isTooltipVisible && (
            <div className="absolute right-0 top-8 w-44 bg-gray-700 p-2 rounded-md text-xs text-gray-200 shadow-lg z-50">
              Clique para mais informações sobre a Lei de Fitts
            </div>
          )}
        </div>
      </div>
      
      {showInfo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div 
            ref={modalRef}
            className="bg-gray-800 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="sticky top-0 bg-gray-800 flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="font-medium text-lg text-gray-100">Sobre a Lei de Fitts</h3>
              <button 
                onClick={() => setShowInfo(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Fechar"
              >
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-gray-200">
              <p>A Lei de Fitts é um modelo do movimento humano que prediz o tempo necessário para mover-se rapidamente a um alvo, com base na distância até o alvo e seu tamanho.</p>
              <p>Quanto maior o alvo e menor a distância, mais fácil (rápido) será acertá-lo.</p>
              <p>Índice de Dificuldade = log₂(2D/W), onde D é a distância e W é o tamanho do alvo.</p>
              <p>Throughput mede sua eficiência (Índice de Dificuldade / Tempo).</p>
              <h4 className="font-medium text-gray-100 mt-4">Aplicações da Lei de Fitts</h4>
              <p>Este princípio é fundamental no design de interfaces e experiência do usuário:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Botões maiores são mais fáceis de clicar</li>
                <li>Menus mais próximos são mais acessíveis</li>
                <li>Cantos e bordas da tela têm "tamanho infinito" para o cursor</li>
                <li>É mais fácil selecionar itens em listas quando há espaçamento adequado</li>
              </ul>
              <div className="pt-3 mt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">Teste sua velocidade de reação com diferentes tamanhos e distâncias para ver a Lei de Fitts em ação!</p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-800 p-4 border-t border-gray-700">
              <Button 
                onClick={() => setShowInfo(false)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      {!playing && (
        <div className="text-center space-y-4 py-4">
          <p className="text-gray-300 mb-6">
            Clique no alvo o mais rápido possível. Vamos medir seu tempo de reação baseado em diferentes tamanhos e distâncias.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
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
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-lg text-lg shadow-md"
          >
            Iniciar
          </Button>
          
          {times.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-700" ref={resultsRef}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-200">Resultados:</h3>
                <Button 
                  onClick={resetGame} 
                  variant="outline" 
                  size="sm" 
                  className="text-gray-300 text-xs"
                >
                  Nova Partida
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-center mb-4">
                {sizes.map(size => (
                  <div key={size} className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-300 mb-1">
                      Alvos {size < 40 ? "pequenos" : size < 70 ? "médios" : "grandes"} ({size}px)
                    </p>
                    <p className="text-xl font-bold text-blue-400">{getAverageBySize(size)} ms</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 bg-gray-700/30 p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
                  <p className="text-gray-300 text-sm">
                    Tempo médio: <span className="text-white font-bold">
                      {Math.round(times.reduce((acc, t) => acc + t.time, 0) / times.length)} ms
                    </span>
                  </p>
                  <p className="text-gray-300 text-sm">
                    Throughput: <span className="text-white font-bold">
                      {calculateAverageThroughput()} bits/s
                    </span>
                  </p>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  A Lei de Fitts sugere que alvos maiores e mais próximos são mais fáceis e rápidos de acertar.
                  {getAverageBySize(sizes[sizes.length-1]) > getAverageBySize(sizes[0]) ? 
                    " Seus resultados confirmam isto!" : 
                    " Seus resultados mostram um padrão interessante diferente do esperado."}
                </p>
                
                {times.length > 1 && (
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <h4 className="text-sm font-medium mb-2 text-gray-300">Detalhes por rodada:</h4>
                    <div className="overflow-x-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      <table className="w-full text-xs text-gray-300">
                        <thead className="sticky top-0 bg-gray-800">
                          <tr className="border-b border-gray-600">
                            <th className="py-2 text-left pl-2">Rodada</th>
                            <th className="py-2 text-right">Tamanho</th>
                            <th className="py-2 text-right">Distância</th>
                            <th className="py-2 text-right">Índice Fitts</th>
                            <th className="py-2 text-right pr-2">Tempo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculateFittsIndex().map((data) => (
                            <tr key={data.round} className="border-b border-gray-700 hover:bg-gray-700/30">
                              <td className="py-1.5 pl-2">{data.round}</td>
                              <td className="py-1.5 text-right">{data.size}px</td>
                              <td className="py-1.5 text-right">{data.distance}px</td>
                              <td className="py-1.5 text-right">{data.difficultyIndex}</td>
                              <td className="py-1.5 text-right pr-2">{data.time}ms</td>
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
        <div 
          ref={gameAreaRef}
          className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] bg-gray-900 border border-gray-700 rounded-lg overflow-hidden"
        >
          <div className="absolute top-4 left-4 bg-gray-800/70 px-3 py-1.5 rounded-full text-xs text-gray-300 z-20">
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
              className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full absolute flex items-center justify-center text-white text-xs shadow-lg shadow-blue-500/20 cursor-pointer"
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
          
          {playing && (
            <button 
              onClick={() => {
                if (window.confirm("Deseja realmente sair do jogo?")) {
                  resetGame()
                }
              }}
              className="absolute top-4 right-4 bg-gray-800/70 hover:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white transition-colors z-20"
              aria-label="Sair do jogo"
            >
              <X size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}