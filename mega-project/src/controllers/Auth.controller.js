import { asyncHandler } from './../utils/asyncHandler.js'
import { User } from '../models/User.model.js'
import { ApiError } from '../utils/ApiErros.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import crypto from 'crypto';
import { emailVerificationMailGenContent, sendMail } from '../utils/mail.js'

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

    //save user in the db
    const createdUser = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        fullName,
    })


    if (!createdUser) throw new ApiError(504, "Something went worng while creating user")

    const { hashedToken, unHashToken, tokenExpiry } = createdUser.generateTemporyToken()

    createdUser.emailVerificationToken = hashedToken
    createdUser.emailVerificationTokenExpiry = tokenExpiry

    await createdUser.save()

    //user created response
    res.status(201).json(new ApiResponse(201, "User created successfully", {
        id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        fullName: createdUser.fullName,
    }))

    //send email for verification

    await sendMail({
        email: createdUser.email,
        subject: 'Welcome to Arjun.io! Please verify your email.',
        mailGenContent: emailVerificationMailGenContent(createdUser.username, `http://example.com/verify-email/${unHashToken}`)
    })

})

export const logInUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !password) {
        throw new ApiError(403, "Fields are missing")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(405, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(405, "Invalid email or password")
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    // Optional: Save Refresh Token to DB if you want to allow "Logout from all devices"
    // user.refreshToken = refreshToken
    // await user.save({ validateBeforeSave: false })

    const options = {
        httpOnly: true,
        secure: true // In production
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            user: { _id: user._id, username: user.username },
            accessToken,
            refreshToken,
            message: "User logged in successfully"
        })
})

export const logOutUser = asyncHandler(async (req, res) => {

    const { email } = req.body

    if (!email) {
        throw new ApiError(403, "Fields are missing")
    }

    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new ApiError(405, "User not found")
    }

    user.accessToken = undefined
    user.refreshToken = undefined

    await user.save({ validateBeforeSave: false })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            success: true,
            message: "User logged out successfully"
        })
})

export const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(504, "User doesn't exist with this email")
    }

    const { hashedToken, unHashToken, tokenExpiry } = user.generateTemporyToken()

    user.forgotPasswordToken = hashedToken
    user.forgotPasswordTokenExpiry = tokenExpiry

    await user.save()

    //send mail for forgot password
    sendMail({
        email: user.email,
        subject: 'Arjun.io Password Reset Request',
        mailGenContent: forgotPasswordMailGenContent(user.username, `http://example.com/reset-password/${unHashToken}`)
    })
})

export const resetPassword = asyncHandler(async (req, res) => {

    const { token } = req.params;
    const { newPassword } = req.body;
    // 1. Hash the incoming token
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    // 2. Find the user with this hash AND ensure it hasn't expired
    const user = await User.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(401, "Token is invalid or has expired");
    }

    // 3. Success! Allow user to set the new password
    user.password = newPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password has been reset successfully"
    });
})

export const verifyEmailVarificationCode = asyncHandler(async (req, res) => {

    const { verifyCode, email } = req.params

    const hashedToken = crypto
        .createHash('sha256')
        .update(verifyCode)
        .digest('hex');

    const user = await User.findOne({
        email,
        emailVerificationToken: hashedToken,
        emailVerificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(401, "Token is invalid or has expired");
    }

    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;
    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Token verified"
    })

})

export const getUserProfile = asyncHandler(async (req, res) => {

    console.log("Inside getUserProfile controller, req.user:", req.user);
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, "User profile fetched successfully", user));
});
