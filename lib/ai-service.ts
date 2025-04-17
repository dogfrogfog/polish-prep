import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { MonologueResponseSchema } from "./schemas"

export async function generateMonologue(level: string, topic: string, userPrompt: string) {
  const prompt = `
    Generate a personalized monologue in Polish for a language exam at level ${level}. 
    The topic is: ${topic}.
    
    The user's specific input about their views: ${userPrompt}
    
    Please format your response as a JSON object with the following structure:
    {
      "monologue": "The Polish monologue text here...",
      "wordCount": number of words in the monologue,
      "questions": ["Question 1 in Polish?", "Question 2 in Polish?", "Question 3 in Polish?"]
    }
    
    The monologue should be appropriate for the ${level} level of Polish language proficiency.
    Include 3 follow-up questions that an examiner might ask about this topic.
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    // Parse the response as JSON and validate with Zod
    const jsonResponse = JSON.parse(text)
    return MonologueResponseSchema.parse(jsonResponse)
  } catch (error) {
    console.error("Error generating monologue:", error)
    throw new Error("Failed to generate monologue")
  }
}
