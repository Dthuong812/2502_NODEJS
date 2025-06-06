import { body } from "express-validator";

const registrationValidationPipe = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
]
export default registrationValidationPipe;