import { z } from "zod"

export const MonologueSchema = z.object({
  monologue: z.string(),
  wordCount: z.number(),
  questions: z.array(z.string()),
})

export type MonologueResponse = z.infer<typeof MonologueSchema>
