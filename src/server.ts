import express from "express"
import config from "config"
const app = express()
const port = config.get("port")
app.use(express.json())
app.listen(port, () => console.log("listening on port 4001")
)