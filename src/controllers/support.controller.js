import { generateSupportFeedback } from "../services/support.service.js"

export const generateSupport = async (req, res, next) => {
  try {
    const { toolId, score, maxScore } = req.body

    if (!toolId) {
      return res.status(400).json({ error: "toolId is required" })
    }

    const feedback = await generateSupportFeedback(toolId, score, maxScore)
    
    res.status(200).json({ feedback })
  } catch (error) {
    next(error)
  }
}
