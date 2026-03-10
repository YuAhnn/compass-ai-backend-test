import dotenv from "dotenv"

dotenv.config()

const { GEMINI_API_KEY, NODE_ENV } = process.env

if (!GEMINI_API_KEY) {
  console.error("Missing env variables ❌")
  process.exit(1)
}

export { GEMINI_API_KEY, NODE_ENV }
