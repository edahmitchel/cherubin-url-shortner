import express from "express"
import config from "config"
import routes from "./routes"
import db from "./database/db"
import dotenv from "dotenv"
dotenv.config()
const app = express()
const port = process.env.port as string
app.use(express.json())
app.listen(port, () => {
    console.log(`listening on port ${port}`)
    db()
    routes(app)
}

)