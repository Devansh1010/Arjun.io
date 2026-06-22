import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import bcrypt from "bcryptjs";

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },

    fullName: {
        type: String,
        required: true,

    },

    avatar: {
        type: {
            url: String,
            localpath: String,
        },
        default: {
            url: `https://placehold.co/600x400`,
            localpath: ''
        }
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,

    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },

    password: {
        type: String,
        required: true,
    },

    accessToken: {
        type: String,
    },

    refreshToken: {
        type: String,
    },
    emailVerificationToken: {
        type: String,
    },
    emailVerificationTokenExpiry: {
        type: Date,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SERECT,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SERECT,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateTemporyToken =  function () {
    const unHashToken = crypto.randomBytes(32).toString('hex')

    const hashedToken= crypto.createHash('sha256').update(unHashToken).digest('hex')
    const tokenExpiry = Date.now() + (20 * 60 * 1000)

    return {hashedToken, unHashToken, tokenExpiry}
}


export const User = mongoose.model("User", userSchema)