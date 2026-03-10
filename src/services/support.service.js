import { ai } from "./gemini.service.js"
import { getSupportLevel } from "../utils/supportLevel.js"

const VARIATION_SEEDS = [
  "Start with an open-ended question.",
  "Begin with a brief, warm observation.",
  "Lead with quiet acknowledgment.",
  "Open with a gentle, grounding statement.",
  "Start with a soft, hopeful note.",
  "Begin by naming the feeling without labeling it.",
  "Open with a simple, honest affirmation.",
]

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildPrompt(toolId, supportLevel) {
  const variationHint = pickRandom(VARIATION_SEEDS)

  return `You are a warm, compassionate friend — not a therapist. Keep your response under 70 words.

The user just completed: ${toolId}
Support level needed: ${supportLevel}

Support level guide:
- light check-in: easy, affirming, no assumptions of distress
- gentle support: acknowledge mild heaviness, normalize feelings, offer encouragement  
- extra care: acknowledge difficulty clearly, convey steady presence, gently encourage reaching out — no advice or solutions

Style instruction: ${variationHint}

Rules:
- Never mention scores, assessments, or results
- No medical advice
- Tone: calm, kind, non-alarming`
}

/**
 * Generates support feedback based on the tool completed and the score user achieved.
 * @param {string} toolId 
 * @param {number} score 
 * @param {number} maxScore 
 * @returns {Promise<string>}
 */
export async function generateSupportFeedback(toolId, score, maxScore) {
  const supportLevel = getSupportLevel(score, maxScore)
  const prompt = buildPrompt(toolId, supportLevel)

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  })

  return response.text
}
