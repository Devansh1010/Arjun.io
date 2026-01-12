import { body } from 'express-validator'

export const userRegistrationValidator = () => {

    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Please Enter valid Email"),

        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 2 }).withMessage('Username must be atleast 2 character long')
            .isLength({ max: 20 }).withMessage('Username must be atmost 20 character long'),

        body('password')
            .trim()
            .notEmpty().withMessage('password is required')
            .isLength({ min: 6 }).withMessage('password must be atleast 6 character long')
            .isLength({ max: 20 }).withMessage('password must be atmost 20 character long')
    ]
}