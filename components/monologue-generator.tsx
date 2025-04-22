"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LANGUAGE_LEVELS } from "@/lib/constants"
import { MonologueResponse, MonologueSchema } from "@/lib/schemas"
import { Loader2, PaperclipIcon } from "lucide-react"
import { MonologueResult } from "./monologue-result"
import { Input } from "@/components/ui/input"

const TASK_TYPES = [
  { id: 'monologue', name: 'Monologue', description: 'Generate a Polish monologue' },
  { id: 'essay', name: 'Essay', description: 'Write a Polish essay', disabled: true },
]

interface MonologueGeneratorProps {
  initialLevel?: string
  initialTopic?: string
}

export function MonologueGenerator({ initialLevel, initialTopic }: MonologueGeneratorProps) {
  const router = useRouter()
  const [taskType, setTaskType] = useState('monologue')
  const [level, setLevel] = useState(initialLevel || "")
  const [topic, setTopic] = useState(initialTopic || "")
  const [userPrompt, setUserPrompt] = useState("")
  const [fresh, setFresh] = useState(true)

  const { object, submit, isLoading } = useObject<MonologueResponse>({
    api: '/api/chat',
    schema: MonologueSchema,
  });

  const handleLevelChange = (value: string) => {
    setLevel(value)
    updateUrl(value, topic)
  }

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
    updateUrl(level, e.target.value)
  }

  const updateUrl = (newLevel: string, newTopic: string) => {
    const params = new URLSearchParams()
    if (newLevel) params.set("level", newLevel)
    if (newTopic) params.set("topic", newTopic)
    router.push(`/${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false })
  }

  const handleClear = () => {
    setUserPrompt("")
    setFresh(true)
    updateUrl(level, '')
  }

  const handleGenerateMonologue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!level || !topic || !userPrompt.trim()) return

    const inputData = {
      level,
      topic,
      userPrompt,
    }

    setFresh(false)
    submit(inputData)
  }

  return (
    <div className="flex flex-col h-[65vh] max-w-4xl mx-auto justify-center bg-gradient-to-b from-white to-purple-50">
      <div className="flex-1 overflow-y-auto px-6 py-8 flex items-center">
        <div className="w-full transition-all duration-300 ease-in-out">
          {!fresh && object && <MonologueResult result={object as any} level={level} topic={topic} onBack={handleClear} />}
        </div>
      </div>
      
      <div className="border-t bg-white p-6 shadow-lg rounded-t-2xl max-w-4xl fixed bottom-0 w-full">
        <form onSubmit={handleGenerateMonologue} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={taskType} onValueChange={setTaskType}>
              <SelectTrigger className="w-full sm:w-[140px] bg-white hover:bg-purple-50 transition-colors">
                <SelectValue placeholder="Task type" />
              </SelectTrigger>
              <SelectContent>
                {TASK_TYPES.map((type) => (
                  <SelectItem 
                    key={type.id} 
                    value={type.id}
                    disabled={type.disabled}
                    className="cursor-pointer hover:bg-purple-50"
                  >
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={level} onValueChange={handleLevelChange}>
              <SelectTrigger className="w-full sm:w-[120px] bg-white hover:bg-purple-50 transition-colors">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_LEVELS.map((lvl) => (
                  <SelectItem 
                    key={lvl.code} 
                    value={lvl.code}
                    className="cursor-pointer hover:bg-purple-50"
                  >
                    {lvl.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Enter topic..."
              className="flex-1 bg-white hover:bg-purple-50 transition-colors focus:ring-2 focus:ring-purple-200"
              value={topic}
              onChange={handleTopicChange}
            />
          </div>
          
          <div className="flex gap-3">
            <Textarea
              placeholder="Type your message here..."
              className="flex-1 min-h-[120px] resize-none bg-white hover:bg-purple-50 transition-colors focus:ring-2 focus:ring-purple-200 rounded-xl p-4"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <Button
              type="submit"
              disabled={!level || !topic || !userPrompt.trim() || isLoading}
              className="self-end bg-purple-100 hover:bg-purple-200 text-purple-900 transition-colors duration-200 rounded-xl shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <PaperclipIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
