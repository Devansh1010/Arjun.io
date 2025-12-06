import { ApiResponse } from './../utils/ApiResponse.js'
const healthCheck = async (req, res) => {
    try {
        res.status(200).json(
            new ApiResponse(200, {message: "Server is Running"})
        )
    } catch (error) {
        console.error("Some error occured: ", error)
    }
}

export {healthCheck}