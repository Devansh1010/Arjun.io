import app from "./app.js"
import dotenv from 'dotenv'
import dbConnect from "./db/index.js"

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 8080

dbConnect()
    .then(() => {
        app.listen(port, () => console.log(`Server is listing on port ${port}`))
    })
    .catch((err) => {
        console.log(`Mongodb connection error ${err}`)
        process.exit(1)
    })

