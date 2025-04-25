"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProximityGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  const questions = [
    {
      id: 1,
      question: "Qual layout de formulário utiliza melhor a Lei da Proximidade?",
      options: [
        {
          id: "a",
          image: "form-grouped",
          label: "Opção A",
          correct: true,
          content: (
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">Nome Completo</p>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">Email</p>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
              
              <div className="border-t border-gray-500 my-4 pt-4">
                <p className="font-medium text-gray-200 mb-2">Endereço de Entrega</p>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-300 mb-1">Rua</p>
                  <div className="h-8 bg-gray-600 rounded"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Cidade</p>
                    <div className="h-8 bg-gray-600 rounded"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">CEP</p>
                    <div className="h-8 bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ),
          explanation: "Este layout agrupa campos relacionados visualmente, criando seções claras com espaço entre elas. A seção de informações pessoais está separada da seção de endereço, tornando o formulário mais fácil de entender e preencher."
        },
        {
          id: "b",
          image: "form-scattered",
          label: "Opção B",
          correct: false,
          content: (
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">Nome Completo</p>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">Rua</p>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">Email</p>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">CEP</p>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">Cidade</p>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
            </div>
          ),
          explanation: "Este layout mistura campos não relacionados sem agrupamento lógico. Os campos de endereço (Rua, CEP, Cidade) estão intercalados com informações pessoais, o que dificulta a compreensão do formulário e cria confusão visual para o usuário."
        }
      ],
      explanation: "A Lei da Proximidade afirma que elementos próximos uns aos outros são percebidos como um grupo ou unidade. No contexto de formulários, campos relacionados devem ser posicionados próximos uns aos outros para indicar que pertencem ao mesmo grupo funcional."
    },
    {
      id: 2,
      question: "Qual menu utiliza melhor a Lei da Proximidade?",
      options: [
        {
          id: "a",
          image: "menu-no-groups",
          label: "Opção A",
          correct: false,
          content: (
            <div className="bg-gray-700 p-3 rounded-lg w-48">
              <div className="space-y-1">
                <div className="px-3 py-2 bg-gray-600 rounded text-sm">Início</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Produtos</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Serviços</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Contato</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Login</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Minha Conta</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Carrinho</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Sobre</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">FAQ</div>
              </div>
            </div>
          ),
          explanation: "Este menu lista todos os itens sem qualquer agrupamento ou organização lógica. Itens relacionados como 'Login' e 'Minha Conta' estão separados de outros itens relacionados como 'Produtos' e 'Serviços'."
        },
        {
          id: "b",
          image: "menu-with-groups",
          label: "Opção B",
          correct: true,
          content: (
            <div className="bg-gray-700 p-3 rounded-lg w-48">
              <div className="space-y-1 mb-3">
                <div className="px-3 py-2 bg-gray-600 rounded text-sm">Início</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Produtos</div>
                <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Serviços</div>
              </div>
              
              <div className="border-t border-gray-600 pt-2 mb-3">
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Sobre</div>
                  <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">FAQ</div>
                  <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Contato</div>
                </div>
              </div>
              
              <div className="border-t border-gray-600 pt-2">
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Login</div>
                  <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Minha Conta</div>
                  <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded">Carrinho</div>
                </div>
              </div>
            </div>
          ),
          explanation: "Este menu agrupa itens relacionados utilizando espaçamento e separadores visuais. A navegação principal, informações institucionais e funcionalidades de usuário estão claramente separadas em grupos, facilitando a localização dos itens desejados."
        }
      ],
      explanation: "A Lei da Proximidade aplicada a menus sugere que itens de menu relacionados devem ser agrupados juntos visualmente. O uso de separadores e espaçamento adequado cria uma hierarquia visual que facilita a navegação e reduz a carga cognitiva do usuário."
    },
    {
      id: 3,
      question: "Qual dashboard aplica melhor a Lei da Proximidade?",
      options: [
        {
          id: "a",
          image: "dashboard-scattered",
          label: "Opção A",
          correct: false,
          content: (
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Vendas Hoje</p>
                  <p className="text-lg font-bold">R$ 5.240</p>
                </div>
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Usuários Ativos</p>
                  <p className="text-lg font-bold">1.423</p>
                </div>
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Visitantes</p>
                  <p className="text-lg font-bold">8.752</p>
                </div>
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Vendas Mensais</p>
                  <p className="text-lg font-bold">R$ 124.500</p>
                </div>
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Taxa de Conversão</p>
                  <p className="text-lg font-bold">3.2%</p>
                </div>
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Novos Cadastros</p>
                  <p className="text-lg font-bold">254</p>
                </div>
              </div>
            </div>
          ),
          explanation: "Este dashboard mostra métricas misturadas sem agrupamento lógico. Métricas relacionadas como 'Vendas Hoje' e 'Vendas Mensais' estão separadas, assim como 'Usuários Ativos' e 'Novos Cadastros'."
        },
        {
          id: "b",
          image: "dashboard-grouped",
          label: "Opção B",
          correct: true,
          content: (
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-300 mb-2">Métricas de Vendas</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Vendas Hoje</p>
                  <p className="text-lg font-bold">R$ 5.240</p>
                </div>
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Vendas Mensais</p>
                  <p className="text-lg font-bold">R$ 124.500</p>
                </div>
              </div>
              
              <p className="text-sm font-medium text-gray-300 mb-2">Métricas de Usuários</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Usuários Ativos</p>
                  <p className="text-lg font-bold">1.423</p>
                </div>
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Novos Cadastros</p>
                  <p className="text-lg font-bold">254</p>
                </div>
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Visitantes</p>
                  <p className="text-lg font-bold">8.752</p>
                </div>
                <div className="bg-gray-600 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Taxa de Conversão</p>
                  <p className="text-lg font-bold">3.2%</p>
                </div>
              </div>
            </div>
          ),
          explanation: "Este dashboard organiza as métricas em categorias lógicas. As métricas de vendas estão agrupadas juntas, assim como as métricas relacionadas a usuários, criando uma estrutura mental clara e facilitando a localização rápida das informações."
        }
      ],
      explanation: "A Lei da Proximidade em dashboards ajuda a organizar informações complexas em grupos significativos. Quando métricas relacionadas são posicionadas próximas umas das outras e separadas de outros grupos, a compreensão e análise das informações se torna mais eficiente."
    }
  ]

  const currentQ = questions[currentQuestion]

  const handleSelection = (optionId) => {
    const selectedOption = currentQ.options.find(opt => opt.id === optionId)
    setSelected(optionId)
    
    if (selectedOption.correct) {
      setScore(score + 1)
    }
    
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelected(null)
      setShowExplanation(false)
    } else {
      setGameCompleted(true)
    }
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setSelected(null)
    setScore(0)
    setShowExplanation(false)
    setGameCompleted(false)
  }

  return (
    <Card className="bg-gray-800 text-white shadow-lg border-gray-700">
      <CardContent className="p-6">
        {!gameCompleted ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Lei da Proximidade
              </h2>
              <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            
            <p className="mb-6 text-gray-300">{currentQ.question}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {currentQ.options.map((option) => (
                <div
                  key={option.id}
                  className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selected === option.id
                      ? selected === option.id && option.correct
                        ? "border-green-500 shadow-lg shadow-green-500/20"
                        : "border-red-500 shadow-lg shadow-red-500/20"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                  onClick={() => !selected && handleSelection(option.id)}
                >
                  <div className="p-2">
                    {option.content}
                  </div>
                  <div className="bg-gray-700 p-2 border-t border-gray-600">
                    <p className="text-sm text-center font-medium">
                      {option.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {showExplanation && (
              <div className={`p-4 rounded-lg mb-6 ${
                currentQ.options.find(opt => opt.id === selected)?.correct
                  ? "bg-green-900/30 border border-green-700"
                  : "bg-red-900/30 border border-red-700"
              }`}>
                <h3 className="font-medium mb-2">
                  {currentQ.options.find(opt => opt.id === selected)?.correct
                    ? "Correto!"
                    : "Incorreto!"}
                </h3>
                <p className="text-sm mb-3">{currentQ.options.find(opt => opt.id === selected)?.explanation}</p>
                <p className="text-sm text-gray-300">{currentQ.explanation}</p>
              </div>
            )}
            
            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                disabled={!selected}
                className={`${
                  !selected ? "opacity-50 cursor-not-allowed" : ""
                } bg-indigo-600 hover:bg-indigo-700`}
              >
                {currentQuestion < questions.length - 1 ? "Próxima" : "Ver Resultado"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-6">Resultado Final</h2>
            <div className="bg-gray-700 rounded-full h-36 w-36 flex items-center justify-center mx-auto mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{score}/{questions.length}</p>
                <p className="text-sm text-gray-300">Pontuação</p>
              </div>
            </div>
            
            <div className="mb-8 text-gray-300">
              <p>A Lei da Proximidade é um dos princípios fundamentais da Gestalt na psicologia da percepção e design.</p>
              <p className="mt-2">Elementos próximos uns aos outros tendem a ser percebidos como grupos relacionados, 
              o que nos ajuda a organizar informações visualmente e facilitar a compreensão do usuário.</p>
            </div>
            
            <Button onClick={restartGame} className="bg-indigo-600 hover:bg-indigo-700">
              Jogar Novamente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}