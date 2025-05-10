import express from "express"
import { Request, Response } from "express"
import { getAuthToken } from "../utils/auth"

const router = express.Router()

router.get("/stocks/:ticker", async (req: Request, res: Response) => {
  const ticker = req.params.ticker
  const authToken = getAuthToken()
})

export default router
