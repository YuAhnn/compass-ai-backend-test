import express from "express"
import supportRoutes from "./support.routes.js"

const router = express.Router()

router.use("/", supportRoutes)

export default router
