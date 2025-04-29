"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle, XCircle, RefreshCw, HelpCircle, Trophy, 
  Clock, PauseCircle, PlayCircle, Settings, Info, 
  ExternalLink, BarChart, BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { shuffle } from "@/lib/utils"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const nielsenHeuristics = [
  {
    id: 1,
    title: "Visibilidade do status do sistema",
    description: "O sistema deve sempre manter os usuários informados sobre o que está acontecendo, através de feedback adequado dentro de um tempo razoável.",
    examples: [
      "Barras de progresso durante carregamento",
      "Indicadores de 'digitando...' em chats",
      "Confirmações visuais após ações"
    ]
  },
  {
    id: 2,
    title: "Correspondência entre o sistema e o mundo real",
    description: "O sistema deve falar a linguagem dos usuários, com palavras, frases e conceitos familiares, seguindo convenções do mundo real.",
    examples: [
      "Ícones reconhecíveis (lixeira para 'excluir')",
      "Termos comuns em vez de jargões técnicos",
      "Fluxos que correspondem a processos reais"
    ]
  },
  {
    id: 3,
    title: "Controle e liberdade do usuário",
    description: "Usuários frequentemente escolhem funções por engano e precisam de uma 'saída de emergência' claramente marcada para deixar o estado indesejado.",
    examples: [
      "Botões de cancelar e voltar",
      "Recursos para desfazer/refazer ações",
      "Opção de sair de processos em andamento"
    ]
  },
  {
    id: 4,
    title: "Consistência e padrões",
    description: "Usuários não devem ter que se perguntar se diferentes palavras, situações ou ações significam a mesma coisa. Siga as convenções da plataforma.",
    examples: [
      "Botões de ação com o mesmo estilo visual",
      "Terminologia consistente em toda a aplicação",
      "Posicionamento previsível de elementos na interface"
    ]
  },
  {
    id: 5,
    title: "Prevenção de erros",
    description: "Melhor que uma boa mensagem de erro é um design cuidadoso que previne que um problema ocorra.",
    examples: [
      "Confirmação antes de ações destrutivas",
      "Campos com formatos pré-definidos (máscaras)",
      "Desabilitar opções que não se aplicam ao contexto atual"
    ]
  },
  {
    id: 6,
    title: "Reconhecimento em vez de lembrança",
    description: "Minimize a carga de memória do usuário tornando objetos, ações e opções visíveis. Instruções de uso devem ser visíveis ou facilmente recuperáveis.",
    examples: [
      "Menus dropdown em vez de comandos para memorizar",
      "Histórico de pesquisas recentes",
      "Dicas contextuais próximas aos elementos de interface"
    ]
  },
  {
    id: 7,
    title: "Flexibilidade e eficiência de uso",
    description: "Aceleradores invisíveis para usuários novatos podem acelerar a interação para usuários experientes, permitindo que o sistema atenda tanto inexperientes quanto experientes.",
    examples: [
      "Atalhos de teclado",
      "Gestos personalizáveis",
      "Configurações avançadas opcionais"
    ]
  },
  {
    id: 8,
    title: "Estética e design minimalista",
    description: "Diálogos não devem conter informações irrelevantes ou raramente necessárias. Cada unidade extra de informação compete com as unidades relevantes.",
    examples: [
      "Layout limpo com espaço em branco adequado",
      "Apresentar apenas informações essenciais primeiro",
      "Esconder funcionalidades complexas em níveis secundários"
    ]
  },
  {
    id: 9,
    title: "Ajudar usuários a reconhecer, diagnosticar e recuperar-se de erros",
    description: "Mensagens de erro devem ser expressas em linguagem simples (sem códigos), indicar o problema e sugerir uma solução.",
    examples: [
      "Mensagens de erro em linguagem amigável",
      "Sugestões de correção para erros comuns",
      "Links para soluções ou suporte direto na mensagem de erro"
    ]
  },
  {
    id: 10,
    title: "Ajuda e documentação",
    description: "Mesmo que seja melhor que o sistema possa ser usado sem documentação, pode ser necessário fornecer ajuda e documentação.",
    examples: [
      "Tutoriais integrados ao produto",
      "FAQs e base de conhecimento acessível",
      "Dicas contextuais em elementos complexos"
    ]
  }
]

export default function NielsenGame() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [gameActive, setGameActive] = useState(true)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [countdown, setCountdown] = useState(15)
  const [timerActive, setTimerActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [difficulty, setDifficulty] = useState("normal") 
  const [heuristicStats, setHeuristicStats] = useState({})
  const [activeTab, setActiveTab] = useState("play")
  
  const getTimeForDifficulty = () => {
    switch (difficulty) {
      case "easy": return 30
      case "hard": return 10
      default: return 15
    }
  }
  
  const initGame = () => {
    setScore(0)
    setStreak(0)
    setTotalQuestions(0)
    setFeedback(null)
    setGameActive(true)
    setShowExplanation(false)
    setGameCompleted(false)
    setCountdown(getTimeForDifficulty())
    setHeuristicStats({})
    generateQuestion()
  }
  
  useEffect(() => {
    let timer = null
    
    if (timerActive && countdown > 0 && !isPaused) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0 && timerActive) {
      handleTimeout()
    }
    
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [countdown, timerActive, isPaused])
  
  const handleTimeout = () => {
    setTimerActive(false)
    
    updateHeuristicStat(currentQuestion.heuristicId, false)
    
    setFeedback({
      correct: false,
      message: "Tempo esgotado! A resposta correta era: " + currentQuestion.correctTitle,
      timeOut: true
    })
    setTotalQuestions(prev => prev + 1)
    setStreak(0) 
  }
  
  const updateHeuristicStat = (heuristicId, isCorrect) => {
    setHeuristicStats(prev => {
      const current = prev[heuristicId] || { correct: 0, total: 0 }
      return {
        ...prev,
        [heuristicId]: {
          correct: current.correct + (isCorrect ? 1 : 0),
          total: current.total + 1
        }
      }
    })
  }
  
  const generateQuestion = () => {
    const heuristics = [...nielsenHeuristics]
    const questionIndex = Math.floor(Math.random() * heuristics.length)
    const correctHeuristic = heuristics[questionIndex]
    
    heuristics.splice(questionIndex, 1)
    
    const wrongOptions = shuffle(heuristics).slice(0, 3).map(h => ({
      id: h.id,
      title: h.title,
      correct: false
    }))
    
    const allOptions = shuffle([
      ...wrongOptions,
      { id: correctHeuristic.id, title: correctHeuristic.title, correct: true }
    ])
    
    const randomExampleIndex = Math.floor(Math.random() * correctHeuristic.examples.length)
    
    setCurrentQuestion({
      heuristicId: correctHeuristic.id,
      example: correctHeuristic.examples[randomExampleIndex],
      description: correctHeuristic.description,
      correctTitle: correctHeuristic.title
    })
    setOptions(allOptions)
    
    setCountdown(getTimeForDifficulty())
    setIsPaused(false)
    setTimerActive(true)
  }
  
  const checkAnswer = (option) => {
    setTimerActive(false)
    setTotalQuestions(prev => prev + 1)
    
    updateHeuristicStat(currentQuestion.heuristicId, option.correct)
    
    if (option.correct) {
      setScore(prev => prev + 1)
      setStreak(prev => prev + 1)
      
      setFeedback({
        correct: true,
        message: "Correto! Esta é a heurística correta."
      })
    } else {
      setStreak(0)
      
      setFeedback({
        correct: false,
        message: `Incorreto. A resposta correta é: ${currentQuestion.correctTitle}`
      })
    }
  }
  
  const handleNext = () => {
    if (totalQuestions >= 10) {
      setGameCompleted(true)
      setGameActive(false)
    } else {
      setFeedback(null)
      setShowExplanation(false)
      generateQuestion()
    }
  }
  
  const togglePause = () => {
    setIsPaused(prev => !prev)
  }
  
  const changeDifficulty = (value) => {
    setDifficulty(value)
  }
  
  const renderCircularTimer = () => {
    const radius = 18
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference * (1 - countdown / getTimeForDifficulty())
    
    const getTimerColor = () => {
      const percentRemaining = countdown / getTimeForDifficulty()
      if (percentRemaining > 0.6) return "stroke-emerald-500"
      if (percentRemaining > 0.3) return "stroke-amber-500"
      return "stroke-red-500"
    }
    
    return (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-12 h-12 transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            className="text-dark-300"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={getTimerColor()}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-medium">{countdown}</span>
      </div>
    )
  }
  
  const renderProgressBar = () => {
    const progress = (totalQuestions / 10) * 100
    return (
      <div className="w-full bg-dark-200 h-2 rounded-full mt-4 mb-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
  }
  
  const renderGameControls = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Questão {totalQuestions + 1}/10</span>
          <span className="text-sm text-muted-foreground">•</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{score}</span>
            <span className="text-sm text-muted-foreground">pontos</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {streak > 1 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-2 py-1 bg-primary/20 rounded-md text-primary text-xs font-medium"
            >
              {streak} acertos seguidos!
            </motion.div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={togglePause}
            className="text-muted-foreground"
          >
            {isPaused ? <PlayCircle className="h-4 w-4" /> : <PauseCircle className="h-4 w-4" />}
          </Button>
          
          {renderCircularTimer()}
        </div>
      </div>
    )
  }
  
  const renderResult = () => {
    const heuristicsPerformance = Object.entries(heuristicStats).map(([id, stats]) => {
      const heuristic = nielsenHeuristics.find(h => h.id === parseInt(id))
      return {
        id: parseInt(id),
        title: heuristic.title,
        correct: stats.correct,
        total: stats.total,
        percentage: Math.round((stats.correct / stats.total) * 100)
      }
    }).sort((a, b) => a.percentage - b.percentage)
    
    const weakestHeuristics = heuristicsPerformance.filter(h => h.percentage < 50)
    
    let message = ""
    let icon = null
    
    if (score >= 8) {
      message = "Excelente! Você é um especialista em heurísticas de Nielsen!"
      icon = <Trophy className="h-16 w-16 text-yellow-500 mb-4" />
    } else if (score >= 5) {
      message = "Bom trabalho! Você tem um bom conhecimento das heurísticas de Nielsen."
      icon = <CheckCircle className="h-16 w-16 text-primary mb-4" />
    } else {
      message = "Continue estudando as heurísticas de Nielsen para melhorar."
      icon = <RefreshCw className="h-16 w-16 text-blue-500 mb-4" />
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6 bg-dark-100 rounded-xl"
      >
        {icon}
        <h3 className="text-2xl font-bold mb-2">Resultado: {score}/10</h3>
        <p className="text-muted-foreground mb-6">{message}</p>
        
        <div className="mb-6 text-left">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Estatísticas de desempenho
          </h4>
          <div className="p-4 bg-dark-200 rounded-lg mb-4">
            {weakestHeuristics.length > 0 ? (
              <>
                <p className="text-sm mb-3">Heurísticas para revisar:</p>
                <ul className="space-y-2">
                  {weakestHeuristics.map(h => (
                    <li key={h.id} className="text-sm flex justify-between">
                      <span>{h.title}</span>
                      <span className="text-red-400">{h.percentage}% de acerto</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm">Você teve um bom desempenho em todas as heurísticas!</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 justify-center">
          <Button onClick={initGame} variant="default" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Jogar Novamente
          </Button>
          
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setActiveTab("study")}
          >
            <BookOpen className="h-4 w-4" />
            Modo Estudo
          </Button>
        </div>
      </motion.div>
    )
  }
  
  const renderStudyMode = () => {
    return (
      <div className="space-y-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Modo Estudo: Heurísticas de Nielsen</h3>
          <Button 
            onClick={() => setActiveTab("play")} 
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Voltar ao Jogo
          </Button>
        </div>
        
        <div className="space-y-4">
          {nielsenHeuristics.map((heuristic) => (
            <div key={heuristic.id} className="p-4 bg-dark-100 rounded-lg border border-border">
              <h4 className="font-medium text-lg mb-2">{heuristic.id}. {heuristic.title}</h4>
              <p className="text-muted-foreground mb-3">{heuristic.description}</p>
              
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Exemplos:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {heuristic.examples.map((example, i) => (
                    <li key={i} className="text-sm text-muted-foreground">{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  const renderContextualHint = () => {
    if (countdown > 7 || feedback) return null
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 flex items-center gap-2 text-sm text-amber-400"
      >
        <Info className="h-4 w-4" />
        <span>
          Dica: Pense sobre como o exemplo demonstra feedback, controle, padrões ou outro princípio de design.
        </span>
      </motion.div>
    )
  }

  useEffect(() => {
    initGame()
    
    return () => {
      setTimerActive(false)
    }
  }, [])

  if (!currentQuestion && !gameCompleted && activeTab === "play") return null
  
  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="play" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="play" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Jogar
            </TabsTrigger>
            <TabsTrigger value="study" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Estudar
            </TabsTrigger>
          </TabsList>
          
          {activeTab === "play" && gameActive && !gameCompleted && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Dificuldade:</span>
              <Select value={difficulty} onValueChange={changeDifficulty}>
                <SelectTrigger className="w-28 h-8">
                  <SelectValue placeholder="Normal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Fácil (30s)</SelectItem>
                  <SelectItem value="normal">Normal (15s)</SelectItem>
                  <SelectItem value="hard">Difícil (10s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <TabsContent value="play" className="mt-0">
          {!gameCompleted ? (
            <>
              {renderProgressBar()}
              {renderGameControls()}
              
              <AnimatePresence>
                {isPaused && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 z-10"
                  >
                    <div className="bg-dark-100 p-8 rounded-xl text-center space-y-4">
                      <h3 className="text-lg font-medium">Jogo pausado</h3>
                      <Button onClick={togglePause} className="gap-2">
                        <PlayCircle className="h-4 w-4" />
                        Continuar
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="mb-6">
                <div className="p-6 bg-dark-100 rounded-xl mb-6">
                  <h3 className="text-lg font-medium mb-4">A qual heurística de Nielsen este exemplo se refere?</h3>
                  <div className="p-4 bg-dark-200 rounded-lg border border-border">
                    <p className="italic">"{currentQuestion.example}"</p>
                  </div>
                </div>
                
                {renderContextualHint()}
                
                <AnimatePresence mode="wait">
                  {!feedback ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 gap-3"
                    >
                      {options.map((option) => (
                        <motion.div
                          key={option.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <Button
                            variant="outline"
                            className="justify-start h-auto py-4 text-left hover:bg-dark-200 w-full"
                            onClick={() => checkAnswer(option)}
                          >
                            {option.title}
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-xl ${feedback.correct ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-red-500/20 border border-red-500/30"}`}
                    >
                      <div className="flex items-start gap-3">
                        {feedback.correct ? (
                          <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">
                            {feedback.message}
                          </h4>
                          
                          {!showExplanation ? (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setShowExplanation(true)} 
                              className="gap-2 text-muted-foreground"
                            >
                              <HelpCircle className="h-4 w-4" />
                              Ver explicação
                            </Button>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                            >
                              <div className="p-3 bg-dark-200 rounded-lg mt-2 mb-3">
                                <p className="text-sm">
                                  {currentQuestion.description}
                                </p>
                                <div className="mt-3 pt-3 border-t border-border">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="link" size="sm" className="gap-1 p-0 h-auto">
                                        <ExternalLink className="h-3 w-3" />
                                        <span className="text-xs">Saiba mais sobre esta heurística</span>
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          {currentQuestion.correctTitle}
                                        </DialogTitle>
                                        <DialogDescription>
                                          Entenda mais sobre esta heurística de Nielsen
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <p>{currentQuestion.description}</p>
                                        <div>
                                          <h4 className="font-medium mb-2">Exemplos:</h4>
                                          <ul className="list-disc pl-5 space-y-1">
                                            {nielsenHeuristics
                                              .find(h => h.title === currentQuestion.correctTitle)
                                              .examples.map((ex, i) => (
                                                <li key={i}>{ex}</li>
                                              ))}
                                          </ul>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">Como aplicar:</h4>
                                          <p className="text-sm text-muted-foreground">
                                            Ao projetar interfaces, certifique-se de implementar esta heurística
                                            para melhorar a experiência do usuário e evitar problemas de usabilidade.
                                          </p>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button onClick={handleNext} className="gap-2">
                          {totalQuestions >= 10 ? (
                            <>
                              <Trophy className="h-4 w-4" />
                              Ver resultado
                            </>
                          ) : (
                            <>
                              Próxima questão
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> 
            </>
          ) : (
            renderResult()
          )}
        </TabsContent>
        
        <TabsContent value="study" className="mt-0">
          {renderStudyMode()}
        </TabsContent>
      </Tabs>
    </div>
  )
}