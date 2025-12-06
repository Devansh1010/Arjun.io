import express from "express"

// ? Router Imports
import  healthCheckRouter  from "./routes/HealthCheck.route.js"
import authRoute from './routes/Auth.route.js'

const app = express()

app.use('/api/v1/healthcheck', healthCheckRouter)
app.use('/api/v1/auth', authRoute)

export default app