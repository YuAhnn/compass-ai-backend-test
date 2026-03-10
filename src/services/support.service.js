import { ai } from "./gemini.service.js"

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

function buildPrompt(toolId, score, maxScore) {
  const variationHint = pickRandom(VARIATION_SEEDS)

  return `You are a warm, compassionate friend — not a therapist. Keep your response under 70 words.

          The user just completed: ${toolId}
          Their score: ${score} out of ${maxScore}

          Based on the score, infer the emotional support level needed:
          - Low scores (bottom 25%): easy, affirming, no assumptions of distress
          - Mid scores (25–60%): acknowledge mild heaviness, normalize feelings, offer encouragement
          - High scores (top 40%): acknowledge difficulty clearly, convey steady presence, gently encourage reaching out — no advice or solutions

          Style instruction: ${variationHint}

          Rules:
          - Never mention scores, assessments, or results
          - No medical advice
          - Tone: calm, kind, non-alarming`
}

export async function generateSupportFeedback(toolId, score, maxScore) {
  const prompt = buildPrompt(toolId, score, maxScore)

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  })

  return response.text
}
