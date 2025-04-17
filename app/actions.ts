"use server"

import { generateMonologue } from "@/lib/ai-service"
import type { MonologueResponse } from "@/lib/schemas"

export async function generateMonologueAction(
  level: string,
  topic: string,
  userPrompt: string,
): Promise<MonologueResponse> {
  try {
    return await generateMonologue(level, topic, userPrompt)
  } catch (error) {
    console.error("Error in monologue generation action:", error)
    throw new Error("Failed to generate monologue")
  }
}
