import { asyncHandler } from './../utils/asyncHandler.js'
import {User} from '../models/User.model.js'
import { ApiError } from '../utils/ApiErros.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto';

export const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password, fullName } = req.body

    //validation
    if ([username, email, password, fullName].some(field => !field)) {
        // Show error or return
        console.log("All fields are required");
        throw new ApiError(403, "Fields are missing")
    }

    //check if user exist or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(400, "User already exist")
    }

    //! multer

    //save user in the db
    const createdUser = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        fullName,
    })

    //chek if user created or not

    const userCreated = await User.findOne({ _id: createdUser._id })

    if (!userCreated) throw new ApiError(504, "Something went worng while creating user")

    //user created response
    res.status(201).json(new ApiResponse(201, "User created successfully", {
        id: userCreated._id,
        username: userCreated.username,
        email: userCreated.email,
        fullName: userCreated.fullName,
    }))

    //send email for verification

})

export const logInUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new ApiError(403, "Fields are missing")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    console.log("User in logIn User: ", user)

    if (!user) {
        throw new ApiError(405, "User not found")
    }

    if (user.password != password) {
        throw new ApiError(405, "Invalid email or password")
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SERECT)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "Strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }).status(200).json({
        success: true,
        message: "Login Successful",
    });
})

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(504, "User doesn't exist with this email")
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiryTime = Date.now() + 15 * 60 * 1000;

    user.forgotPasswordToken = token
    user.forgotPasswordTokenExpiry = expiryTime

    await user.save()

    //send mail for forgot password
})

export const verifyCode = asyncHandler(async (req, res) => {

    const { verifyCode, email } = req.params

    const user = await User.findone({ email })

    if (user.forgotPasswordToken != verifyCode && user.forgotPasswordTokenExpiry < Date.now()) {
        throw new ApiError(405, "Invalid Token or Token Expired")
    }

    res.status(200).json({
        success: true,
        message: "Token verified"
    })

})

export const resetPassword = asyncHandler(async (req, res) => {

})