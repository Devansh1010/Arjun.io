import { Router } from "express";
import { forgotPassword, getUserProfile, logInUser, logOutUser, registerUser, resetPassword, verifyEmailVarificationCode } from '../controllers/Auth.controller.js'
import { validate } from '../middleware/validator.middleware.js'
import { userRegistrationValidator } from '../utils/validators/index.js'
import { authenticateUser } from "../middleware/authentication-check.middleware.js";

const router = Router()

router.route('/register').post(userRegistrationValidator(), validate, registerUser)
router.route('/verify-email').post(verifyEmailVarificationCode)
router.route('/login').post(logInUser)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(authenticateUser, resetPassword)
router.route('/logout').post(authenticateUser, logOutUser)
router.route('/get-user-profile').post(authenticateUser, getUserProfile)

export default router