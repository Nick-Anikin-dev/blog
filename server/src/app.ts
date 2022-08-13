import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";

require('dotenv').config()
import cors from "cors";
import router from "./routes";
import express, { Application } from "express"
import sequelize from "./config/db"

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandlingMiddleware)

const bootstrap = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

bootstrap()
