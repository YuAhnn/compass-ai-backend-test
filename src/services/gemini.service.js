import { GoogleGenAI } from "@google/genai"
import { GEMINI_API_KEY } from "../config/env.js"

export const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY
})
