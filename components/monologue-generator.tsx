"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LANGUAGE_LEVELS, TOPICS } from "@/lib/constants"
import { MonologueResponse, MonologueSchema } from "@/lib/schemas"
import { Loader2 } from "lucide-react"
import { MonologueResult } from "./monologue-result"
import { Input } from "@/components/ui/input"

interface MonologueGeneratorProps {
  initialLevel?: string
  initialTopic?: string
}

export function MonologueGenerator({ initialLevel, initialTopic }: MonologueGeneratorProps) {
  const router = useRouter()
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

    const newUrl = `/monologues${params.toString() ? `?${params.toString()}` : ""}`
    router.push(newUrl, { scroll: false })
  }

  const handleClear = () => {
    setUserPrompt("")
    setFresh(true);
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
    <div className="space-y-8 w-full">
      {fresh || !object ? (
        <div className="w-full">
          <form onSubmit={handleGenerateMonologue} className="space-y-8">
            <div className="flex flex-wrap gap-6">
              <div>
                <label className="block text-xl mb-2">Level</label>
                <Select value={level} onValueChange={handleLevelChange}>
                  <SelectTrigger className="w-[200px] text-lg">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_LEVELS.map((lvl) => (
                      <SelectItem key={lvl.code} value={lvl.code} className="text-lg">
                        {lvl.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xl mb-2">Topic</label>
                <Input
                  placeholder="Enter topic..."
                  className="w-[240px] text-lg"
                  value={topic}
                  onChange={handleTopicChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-xl mb-2">Your thoughts on this topic</label>
              <Textarea
                placeholder="Describe your views on the topic..."
                className="min-h-[200px] text-lg p-4"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!level || !topic || !userPrompt.trim()}
                className="bg-green-100 hover:bg-green-200 text-black text-lg px-8 py-6 h-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Get Text"
                )}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <MonologueResult result={object as any} level={level} topic={topic} onBack={handleClear} />
      )}
    </div>
  )
}
