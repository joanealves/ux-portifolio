"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, RefreshCw, HelpCircle } from "lucide-react"
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
  
  // Inicializar ou reiniciar o jogo
  const initGame = () => {
    setScore(0)
    setTotalQuestions(0)
    setFeedback(null)
    setGameActive(true)
    setShowExplanation(false)
    generateQuestion()
  }
  
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
  }
  
  // Verificar resposta selecionada
  const checkAnswer = (option) => {
    setTotalQuestions(prev => prev + 1)
    
    if (option.correct) {
      setScore(prev => prev + 1)
      setFeedback({
        correct: true,
        message: "Correto! Essa é a h