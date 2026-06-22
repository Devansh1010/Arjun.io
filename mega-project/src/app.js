import express from "express"
import cookieParser from "cookie-parser";


// Router Imports
import healthCheckRouter from "./routes/HealthCheck.route.js"
import authRoute from './routes/Auth.route.js'
import projectRoute from './routes/Project.route.js'

const app = express()
app.use(express.json())
app.use(cookieParser());

// Routes
const baseApiUrl = process.env.BASE_API_URL || '/api/v1'

app.use(`${baseApiUrl}/healthcheck`, healthCheckRouter)
app.use(`${baseApiUrl}/auth`, authRoute)
app.use(`${baseApiUrl}/projects`, projectRoute)


export default app