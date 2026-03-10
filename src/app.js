import express from "express"
import cors from "cors"
import mainRouter from "./routes/index.js"
import { NODE_ENV } from "./config/env.js"
import { errorHandler } from "./middleware/errorHandler.js"

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "Compass API is running smoothly 🧭",
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use("/", mainRouter)

// Global Error Handler
app.use(errorHandler)

// Start server if not in serverless environment
if (NODE_ENV !== "production" && process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Compass is Online 💌 Your Compassionate Companion is Ready 🧭 on port ${PORT}`)
  })
}

export default app