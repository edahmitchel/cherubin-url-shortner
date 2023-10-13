import express from "express"
import config from "config"
import routes from "./routes"
import db from "./database/db"
import dotenv from "dotenv"
import swaggerUi from 'swagger-ui-express';
import appRoutes from "./routes/index"
import swaggerSpec from './swagger'; // Import the Swagger configuration

dotenv.config()

const app = express()
const port = process.env.PORT
db()
app.use(express.json())
app.use("/api", appRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
    console.log(`listening on port ${port}`)
}

)