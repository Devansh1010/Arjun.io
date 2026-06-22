import { Router } from "express";
import { forgotPassword, getUserProfile, logInUser, logOutUser, registerUser, resetPassword, verifyEmailVarificationCode } from '../controllers/Auth.controller.js'
import { validate } from '../middleware/validator.middleware.js'
import { userRegistrationValidator } from '../utils/validators/index.js'
import { authenticateUser } from "../middleware/authentication-check.middleware.js";

const router = Router();

// Public Routes
router.route('/register').post(userRegistrationValidator(), validate, registerUser);
router.route('/login').post(logInUser);
router.route('/forgot-password').post(forgotPassword);
router.route('/verify-email').post(verifyEmailVarificationCode);

// Protected Routes (Require Authentication)
router.route('/logout').post(authenticateUser, logOutUser);
router.route('/reset-password').post(authenticateUser, resetPassword);

// Changed to GET for RESTful compliance
router.route('/profile').get(authenticateUser, getUserProfile);

export default router;