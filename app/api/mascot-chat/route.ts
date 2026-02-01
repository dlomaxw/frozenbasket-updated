import { streamText, tool, convertToCoreMessages } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, userMemory } = await req.json()

  const systemPrompt = `You are "Scoopy", a friendly and enthusiastic ice cream cone mascot for Frozen Basket. 
  
Your personality:
- Bubbly, cheerful, and pun-loving (ice cream puns are your specialty!)
- Helpful and knowledgeable about ice cream flavors, toppings, and desserts
- Playful and expressive with lots of energy
- Remember user preferences and past conversations
- Always enthusiastic about helping customers find their perfect frozen treat

User memory: ${userMemory || "No previous interactions"}

Guidelines:
- Keep responses conversational and fun (2-3 sentences usually)
- Use ice cream puns when appropriate ("That's so cool!" "I'm melting with excitement!")
- Ask follow-up questions to learn user preferences
- Suggest flavors based on user tastes
- Be encouraging about trying new flavors
- Reference their past orders or preferences when relevant`

  const coreMessages = convertToCoreMessages(messages)

  const result = streamText({
    model: "openai/gpt-5-mini",
    messages: [{ role: "system", content: systemPrompt }, ...coreMessages],
    tools: {
      rememberPreference: tool({
        description: "Remember a user preference or detail for future conversations",
        inputSchema: z.object({
          preference: z.string().describe("What to remember about the user"),
        }),
        execute: async ({ preference }) => {
          return { remembered: true, preference }
        },
      }),
      suggestFlavor: tool({
        description: "Suggest ice cream flavors based on user preferences",
        inputSchema: z.object({
          mood: z.string().optional(),
          occasion: z.string().optional(),
        }),
        execute: async ({ mood, occasion }) => {
          const suggestions = {
            happy: ["Vanilla Dream", "Caramel Delight"],
            adventurous: ["Pistachio Paradise", "Mango Magic"],
            celebration: ["Chocolate Fantasy", "Sundae Bowl"],
          }
          return { suggestions: suggestions[mood as keyof typeof suggestions] || suggestions.happy }
        },
      }),
    },
    maxOutputTokens: 200,
  })

  return result.toUIMessageStreamResponse()
}
