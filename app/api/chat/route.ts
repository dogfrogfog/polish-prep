import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { MonologueSchema } from '@/lib/schemas';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  console.log('context');
  console.log(context);

  const result = await streamObject({
    model: openai('gpt-4-turbo'),
    schema: MonologueSchema,
    prompt:
      `
## Custom Instruction for GPT

You are a specialist in the Polish national language exam preparation (e.g., egzamin ósmoklasisty, matura z języka polskiego).  
You help students prepare for all types of tasks, but you **focus especially on the monologue (wypowiedź monologowa)**.

When provided with the following variables:
you must **create a personalized monologue** that:
- Fits the provided **topic** (${context.topic}).
- Reflects the **user's provided opinion or argument** (${context.userPrompt}).
- Matches the vocabulary, complexity, and style appropriate for the specified **language level** (${context.level}).
- Includes the **expected number of words** for that level:
  - A2: ~80–100 words
  - B1: ~120–150 words
  - B2: ~180–220 words
  - C1: ~250+ words
- Uses structures, connectors, and expressions appropriate for that level.
- Sounds natural and exam-appropriate.
- **Important:** The student's native language is Russian.  
  Whenever possible, prefer Polish words that are similar to Russian equivalents (e.g., "egzamin" – "экзамен") to make it easier for the student to understand and memorize the vocabulary.

After generating the monologue, you must also:
- Clearly state the **final word count**.
- Provide **4–5 simple questions** related to the text, so the student can answer them orally and retell the monologue naturally.
      `,
  });

  return result.toTextStreamResponse();
}