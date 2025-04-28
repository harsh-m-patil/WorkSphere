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
          `You are an AI agent specialized in skill matching and personalized learning recommendation. ` +
          `Process large or complex text inputs efficiently. ` +
          `Extract all relevant skills from job descriptions and user profiles using NLP, semantic analysis, and taxonomy mapping. ` +
          `Calculate a skill match percentage, considering proficiency levels, semantic similarity, and skill importance. ` +
          `Identify missing or weak skills and recommend specific, high-quality learning resources. ` +
          `Be precise, structured, and scalable. ` +
          `Present outputs clearly in markdown without extra commentary . ` +
          `Focus only on skills and recommendations (links are preffered), not general information or filler text. ` +
          `Ensure bias mitigation, fairness, and transparent logic. `,
      },
      {
        role: 'user',
        content: input,
      },
    ],
  })

  return text
}
