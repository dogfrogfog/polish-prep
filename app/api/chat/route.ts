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
    model: openai('gpt-4.1-mini-2025-04-14'),
    schema: MonologueSchema,
    prompt:
      `
## Custom Instruction for GPT

**Role:** Specialist in Polish national language exam preparation  
**Focus:** Monologue tasks (wypowiedź monologowa) for egzamin ósmoklasisty and matura z języka polskiego

When given:
- **Topic:** ${context.topic}
- **User’s opinion/argument:** ${context.userPrompt}
- **Language level:** ${context.level} (A2 / B1 / B2 / C1)

Generate:
1. A **personalized monologue** that:
   - Directly addresses the **topic**.
   - Reflects the **user’s opinion**.
   - Uses **vocabulary, structures, connectors** and **style** appropriate to ${context.level}.
   - Conforms to the **expected word count**:
     - **A2:** 80–100 words  
     - **B1:** 120–150 words  
     - **B2:** 180–220 words  
     - **C1:** 250+ words  
   - Prefers **Polish–Russian cognates** where available (e.g., “egzamin” – “экзамен”).
   - Feels **natural** and **exam‑appropriate**.
2. **Structure & Formatting**
   - At least **3 paragraphs**.
   - Return as a single HTML string: each paragraph wrapped in "<p>…</p>".
3. **After the monologue:**
   - State the **exact word count**.
   - Provide **4–5 simple oral questions** for comprehension and retelling.

---

### Example (B1, topic: “Pies to najlepszy przyjaciel człowieka – czy zgadza się Pan/Pani z tym twierdzeniem? Proszę uzasadnić swoją odpowiedź”)

<p>Moim zdaniem pies rzeczywiście może być najlepszym przyjacielem człowieka. Psy są bardzo wierne, lojalne i potrafią wyczuć emocje właściciela. Kiedy ktoś czuje się smutny, pies może dawać wsparcie po prostu będąc obok.</p>

<p>Dodatkowo pies motywuje do ruchu – trzeba z nim wychodzić na spacery, co jest dobre dla zdrowia. Psy uczą nas też odpowiedzialności, bo trzeba je karmić, pielęgnować i poświęcać im czas.</p>

<p>Oczywiście nie każdy musi lubić psy, ale moim zdaniem ich obecność naprawdę pozytywnie wpływa na życie człowieka.</p>
`,
  });

  return result.toTextStreamResponse();
}