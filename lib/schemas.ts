import { z } from "zod"

export const MonologueSchema = z.object({
  monologue: z.string().min(300).describe("The generated monologue stringified HTML. Text should include each paragraph wrapped in <p> tags, that will be inserted using dangerous set html."),
  questions: z.array(z.string()).length(5).describe("5 simple questions related to the monologue, should follow through the monologue content to help tell the text"),
})

export type MonologueResponse = z.infer<typeof MonologueSchema>
