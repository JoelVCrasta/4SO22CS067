import express from "express"
import { Request, Response } from "express"
import axios, { AxiosResponse } from "axios"
import store from "../utils/store"
import { getAuthToken } from "../utils/auth"

const router = express.Router()

router.get("/numbers/:numberid", async (req: Request, res: Response) => {
  const numberId = req.params.numberid
  let endpoint = ""

  switch (numberId) {
    case "p":
      endpoint = "primes"
      break
    case "f":
      endpoint = "fibo"
      break
    case "e":
      endpoint = "even"
      break
    case "r":
      endpoint = "rand"
      break
    default:
      res.status(400).json({ error: "Invalid number id provided" })
      return
  }

  const token = await getAuthToken()

  const url = `http://20.244.56.144/evaluation-service/${endpoint}`

  try {
    const response = (await Promise.race([
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 500)
      ),
    ])) as AxiosResponse

    console.log(response)

    const prevState = store.getvalues()
    const newState = Array.from(response.data.numbers as number[])

    newState.forEach((value: number) => {
      store.insert(value)
    })

    const currState = store.getvalues()

    const result = store.getvalues()

    const avg = result.reduce((acc, val) => acc + val, 0) / result.length

    res.status(200).json({
      windowPrevState: prevState,
      windowCurrState: currState,
      numbers: result,
      avg: avg,
    })
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).json({ error: `Error: ${error}` })
  }
})

export default router
