"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, RefreshCw, HelpCircle, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { shuffle } from "@/lib/utils"

// Dados das heurísticas de Nielsen
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
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [gameActive, setGameActive] = useState(true)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [countdown, setCountdown] = useState(15)
  const [timerActive, setTimerActive] = useState(false)
  
  // Inicializar ou reiniciar o jogo
  const initGame = () => {
    setScore(0)
    setTotalQuestions(0)
    setFeedback(null)
    setGameActive(true)
    setShowExplanation(false)
    setGameCompleted(false)
    setCountdown(15)
    generateQuestion()
  }
  
  // Efeito para controlar o timer
  useEffect(() => {
    let timer = null;
    
    if (timerActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && timerActive) {
      handleTimeout();
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, timerActive]);
  
  // Lidar com o tempo esgotado
  const handleTimeout = () => {
    setTimerActive(false);
    setFeedback({
      correct: false,
      message: "Tempo esgotado! A resposta correta era: " + currentQuestion.correctTitle,
      timeOut: true
    });
    setTotalQuestions(prev => prev + 1);
  };
  
  // Gerar uma nova questão
  const generateQuestion = () => {
    // Escolher uma heurística aleatória
    const heuristics = [...nielsenHeuristics]
    const questionIndex = Math.floor(Math.random() * heuristics.length)
    const correctHeuristic = heuristics[questionIndex]
    
    // Remover a heurística escolhida para criar opções erradas
    heuristics.splice(questionIndex, 1)
    
    // Selecionar 3 heurísticas erradas aleatoriamente
    const wrongOptions = shuffle(heuristics).slice(0, 3).map(h => ({
      id: h.id,
      title: h.title,
      correct: false
    }))
    
    // Adicionar a opção correta e embaralhar todas as opções
    const allOptions = shuffle([
      ...wrongOptions,
      { id: correctHeuristic.id, title: correctHeuristic.title, correct: true }
    ])
    
    // Exemplo aleatório da heurística correta
    const randomExampleIndex = Math.floor(Math.random() * correctHeuristic.examples.length)
    
    setCurrentQuestion({
      heuristicId: correctHeuristic.id,
      example: correctHeuristic.examples[randomExampleIndex],
      description: correctHeuristic.description,
      correctTitle: correctHeuristic.title
    })
    setOptions(allOptions)
    
    // Iniciar o timer
    setCountdown(15)
    setTimerActive(true)
  }
  
  // Verificar resposta selecionada
  const checkAnswer = (option) => {
    setTimerActive(false)
    setTotalQuestions(prev => prev + 1)
    
    if (option.correct) {
      setScore(prev => prev + 1)
      setFeedback({
        correct: true,
        message: "Correto! Esta é a heurística correta."
      })
    } else {
      setFeedback({
        correct: false,
        message: `Incorreto. A resposta correta é: ${currentQuestion.correctTitle}`
      })
    }
  }
  
  // Avançar para a próxima questão
  const handleNext = () => {
    // Se já respondeu 10 perguntas, encerrar o jogo
    if (totalQuestions >= 10) {
      setGameCompleted(true)
      setGameActive(false)
    } else {
      setFeedback(null)
      setShowExplanation(false)
      generateQuestion()
    }
  }
  
  // Renderizar barra de progresso
  const renderProgressBar = () => {
    const progress = (totalQuestions / 10) * 100
    return (
      <div className="w-full bg-dark-200 h-2 rounded-full mt-4 mb-8">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
  }
  
  // Renderizar resultado final
  const renderResult = () => {
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
        <Button onClick={initGame} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Jogar Novamente
        </Button>
      </motion.div>
    )
  }

  useEffect(() => {
    initGame()
    
    return () => {
      setTimerActive(false)
    }
  }, [])

  if (!currentQuestion && !gameCompleted) return null
  
  return (
    <div className="max-w-3xl mx-auto">
      {!gameCompleted ? (
        <>
          {renderProgressBar()}
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Questão {totalQuestions + 1}/10</span>
              <div className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                  countdown <= 5 ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary"
                }`}>
                  {countdown}
                </div>
                <span className="text-sm text-muted-foreground">seg</span>
              </div>
            </div>
            
            <div className="p-6 bg-dark-100 rounded-xl mb-6">
              <h3 className="text-lg font-medium mb-4">A qual heurística de Nielsen este exemplo se refere?</h3>
              <div className="p-4 bg-dark-200 rounded-lg border border-border">
                <p className="italic">"{currentQuestion.example}"</p>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {!feedback ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-3"
                >
                  {options.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="justify-start h-auto py-3 text-left hover:bg-dark-200"
                      onClick={() => checkAnswer(option)}
                    >
                      {option.title}
                    </Button>
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
                    <div>
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
                          <p className="text-sm mt-2 mb-3">
                            {currentQuestion.description}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button onClick={handleNext}>
                      {totalQuestions >= 10 ? "Ver resultado" : "Próxima questão"}
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
    </div>
  )
}