import express from "express"
import { generateSupport } from "../controllers/support.controller.js"

const router = express.Router()

router.post("/generate-support", generateSupport)

export default router
