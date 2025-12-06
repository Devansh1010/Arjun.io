import { Router } from "express";
import { forgotPassword, logInUser, registerUser, resetPassword, verifyCode } from '../controllers/Auth.controller.js'
import { validate } from '../middleware/validator.middleware.js'
import { userRegistrationValidator } from '../utils/validators/index.js'

const router = Router()

router.route('/register').post(userRegistrationValidator(), validate,  registerUser)
router.route('/login').post(userRegistrationValidator(), validate,  logInUser)
router.route('/forgot-password').post(userRegistrationValidator(), validate,  forgotPassword)
router.route('/verify').post(userRegistrationValidator(), validate,  verifyCode)
router.route('/reset-password').post(userRegistrationValidator(), validate,  resetPassword)

export default router