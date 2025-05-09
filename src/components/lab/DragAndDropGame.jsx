"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DragAndDropGame() {
  const [items, setItems] = useState([
    { id: 1, name: "Maçã", group: "fruits", currentZone: "items", icon: "🍎" },
    { id: 2, name: "Banana", group: "fruits", currentZone: "items", icon: "🍌" },
    { id: 3, name: "Cenoura", group: "vegetables", currentZone: "items", icon: "🥕" },
    { id: 4, name: "Brócolis", group: "vegetables", currentZone: "items", icon: "🥦" },
    { id: 5, name: "Laranja", group: "fruits", currentZone: "items", icon: "🍊" },
    { id: 6, name: "Batata", group: "vegetables", currentZone: "items", icon: "🥔" },
  ])

  const dropZones = [
    { id: "fruits", name: "Frutas", color: "bg-red-700", items: [] },
    { id: "vegetables", name: "Vegetais", color: "bg-green-700", items: [] }
  ]

  const [zones, setZones] = useState(dropZones)
  
  const [draggedItem, setDraggedItem] = useState(null)
  const [gameComplete, setGameComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const itemsPlaced = zones.reduce((total, zone) => total + zone.items.length, 0)
    if (itemsPlaced === items.length) {
      const allCorrect = zones.every(zone => 
        zone.items.every(item => item.group === zone.id)
      )
      
      const correctItems = zones.reduce((count, zone) => {
        return count + zone.items.filter(item => item.group === zone.id).length
      }, 0)
      
      setScore(correctItems)
      setGameComplete(true)
      
      if (allCorrect) {
        setFeedback("Parabéns! Você classificou tudo corretamente!")
      } else {
        setFeedback(`Você acertou ${correctItems} de ${items.length} itens.`)
      }
    }
  }, [zones])

  const handleDragStart = (item) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, zoneId) => {
    e.preventDefault()
    
    if (!draggedItem) return
    
    const updatedItems = items.map(item => 
      item.id === draggedItem.id ? {...item, currentZone: zoneId} : item
    )
    setItems(updatedItems)
    
    const updatedZones = zones.map(zone => {
      if (zone.id === zoneId) {
        return {
          ...zone,
          items: [...zone.items, draggedItem]
        }
      } else if (draggedItem.currentZone === zone.id) {
        return {
          ...zone,
          items: zone.items.filter(item => item.id !== draggedItem.id)
        }
      }
      return zone
    })
    
    setZones(updatedZones)
    setDraggedItem(null)
  }

  const resetGame = () => {
    const resetItems = items.map(item => ({...item, currentZone: "items"}))
    setItems(resetItems)
    
    const resetZones = zones.map(zone => ({...zone, items: []}))
    setZones(resetZones)
    
    setGameComplete(false)
    setScore(0)
    setFeedback("")
  }

  return (
    <Card className="bg-gray-800 text-white">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Classifique os Itens</h2>
        <p className="mb-4">Arraste os itens para os grupos corretos!</p>
        
        <div 
          className="p-4 mb-6 min-h-16 bg-gray-700 rounded-md flex flex-wrap gap-2"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "items")}
        >
          <h3 className="w-full mb-2">Itens para classificar:</h3>
          {items.filter(item => item.currentZone === "items").map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="bg-blue-600 py-2 px-3 rounded-md cursor-move flex items-center"
            >
              <span className="mr-2">{item.icon}</span> {item.name}
            </div>
          ))}
          {items.filter(item => item.currentZone === "items").length === 0 && (
            <p className="text-gray-400 italic">Todos os itens foram classificados.</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {zones.map(zone => (
            <div
              key={zone.id}
              className={`p-4 rounded-md min-h-32 ${zone.color} transition-colors`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone.id)}
            >
              <h3 className="mb-2 font-bold">{zone.name}</h3>
              <div className="flex flex-wrap gap-2">
                {zone.items.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    className={`bg-gray-800 py-2 px-3 rounded-md cursor-move flex items-center ${
                      gameComplete ? (item.group === zone.id ? "border-2 border-green-500" : "border-2 border-red-500") : ""
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span> {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {gameComplete && (
          <div className={`mt-4 p-3 rounded-md text-center ${score === items.length ? "bg-green-800" : "bg-yellow-800"}`}>
            <p className="text-lg font-bold">{feedback}</p>
            <Button 
              onClick={resetGame}
              className="mt-2 bg-blue-600 hover:bg-blue-700"
            >
              Jogar Novamente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
