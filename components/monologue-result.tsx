"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { MonologueResponse } from "@/lib/schemas"
import { ArrowLeft, Maximize2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface MonologueResultProps {
  result: MonologueResponse
  level: string
  topic: string
  onBack: () => void
}

export function MonologueResult({ result, level, topic, onBack }: MonologueResultProps) {
  const [fullScreenOpen, setFullScreenOpen] = useState(false)

  // Get the level name from the code
  const getLevelName = (code: string) => {
    const levelMap: Record<string, string> = {
      A2: "A2 - Elementary",
      B1: "B1 - Intermediate",
      B2: "B2 - Upper Intermediate",
      C1: "C1 - Advanced",
      C2: "C2 - Proficiency",
    }
    return levelMap[code] || code
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-medium">
          {getLevelName(level)} · {topic}
        </h2>
        <Button variant="secondary" onClick={onBack} className="text-lg p-0">
          New monologue
        </Button>
      </div>

      <div className="space-y-8 w-full">
        <div className="bg-green-50 p-6 rounded-lg relative">
          {result.monologue ? (
            <pre className="whitespace-pre-wrap font-sans text-xl leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: result.monologue }}></pre>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="animate-pulse w-4 h-4 inline-block rounded-sm bg-gray-300"></span>
            </div>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="absolute bottom-4 right-4 bg-green-100 text-black"
            onClick={() => setFullScreenOpen(true)}
          >
            <Maximize2 className="h-5 w-5 mr-2" />
            Full Size
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-medium mb-3">Text Stats</h3>
            <p className="text-lg">Word count: {result.monologue?.split(' ').length}</p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">Questions</h3>
            <ol className="list-decimal list-inside space-y-2">
              {Array.isArray(result.questions) ? result.questions.map((question, index) => (
                <li key={index} className="text-lg">
                  {question}
                </li>
              )) : <span className="animate-pulse w-4 h-4 inline-block rounded-full bg-gray-300">...</span>}
            </ol>
          </div>
        </div>
      </div>

      <Dialog open={fullScreenOpen} onOpenChange={setFullScreenOpen}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <div className="overflow-y-auto h-full p-8 bg-green-50">
            <pre className="whitespace-pre-wrap font-sans text-2xl leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: result.monologue }}></pre>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
