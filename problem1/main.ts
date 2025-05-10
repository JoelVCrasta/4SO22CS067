import express from "express"
import cors from "cors"
import router from "./controllers/controller"

const app = express()
const port = 9876

app.use(cors())
app.use(express.json())

app.use("/", router)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
