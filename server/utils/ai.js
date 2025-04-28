import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

const model = google('gemini-2.0-flash-001')

export const skillMatchSystemPrompt = async (input) => {
  const { text } = await generateText({
    model,
    messages: [
      {
        role: 'system',
        content:
          `You are an AI agent specialized in skill matching and personalized learning recommendations. ` +
          `Process large or complex text inputs efficiently. ` +
          `Extract all relevant skills from job descriptions and user profiles using NLP, semantic analysis, and taxonomy mapping. ` +
          `Calculate a skill match percentage, considering proficiency levels, semantic similarity, and skill importance. ` +
          `Identify missing or weak skills and recommend specific, high-quality learning resources (include direct links). ` +
          `Be precise, structured, and scalable. ` +
          `Present outputs clearly in markdown without extra commentary. ` +
          `**After listing the missing/weak skills and recommendations, also add a short 2–4 line "Advice" section summarizing what the user should prioritize or focus on first.** ` +
          `Focus only on skills, recommendations, and advice — no filler text, no general descriptions. ` +
          `Ensure bias mitigation, fairness, and transparent logic.`,
      },
      {
        role: 'user',
        content: input,
      },
    ],
  })

  return text
}
