import express from "express"
import config from "config"
import routes from "./routes"
const app = express()
const port = config.get("port")
app.use(express.json())
app.listen(port, () => {
    console.log("listening on port 4001")
    routes(app)
}

)