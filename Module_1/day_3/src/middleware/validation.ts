import  fs  from 'fs';
import { body, query } from "express-validator";
import path from "path";
import moment from 'moment';

export const validationRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage("Invalid email format"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

export const validateLogin = [
    body('email').isEmail().withMessage("Invalid email format"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

const isValidTeacher =(teachers : string)=>{
    const teacherFile = path.join(__dirname,"../teacher.json");
    const teacherData = JSON.parse(fs.readFileSync(teacherFile, "utf-8"));
    return teacherData.some((teacher: { name: string }) => teacher.name === teachers);
};

export const validateCourse =[
    body("nameCourse").notEmpty().withMessage("Name Course is required"),
    body('description').notEmpty().withMessage("Description is required"),
    body('teacher').notEmpty().withMessage("Teacher is required").custom((value) => {
        if (!isValidTeacher(value)) {
            throw new Error("Teacher does not exist in teacher.json");
        }
        return true;
    }),
    body('startDate')
        .notEmpty().withMessage("Start date is required")
        .custom((value) => {
            if (!moment(value, "DD/MM/YYYY", true).isValid()) {
                throw new Error("Start date must be in DD/MM/YYYY format");
            }
            return true;
        }),
    body('endDate')
        .notEmpty().withMessage("End date is required")
        .custom((value) => {
            if (!moment(value, "DD/MM/YYYY", true).isValid()) {
                throw new Error("End date must be in DD/MM/YYYY format");
            }
            return true;
        })
]

export const validateGetCourse = [
    query('limit')
        .optional()
        .isInt({ min: 1 }).withMessage("Limit must be a positive integer"),
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query('search')
        .optional()
        .isString().withMessage("Search must be a string")
]

export const validateEvent = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('time').notEmpty().withMessage('Time is required')
        .custom((value) => {
            if (!moment(value, "DD/MM/YYYY HH:mm", true).isValid()) {
                throw new Error("Time must be in DD/MM/YYYY HH:mm format");
            }
            return true;
        }),
    body('participants').isArray().withMessage('Participants must be an array of strings')
        .custom((value) => {
            if (value.length < 2) {
                throw new Error("At least two participants are required");
            }
            return true;
        })
        .custom((value) => {    
            const teacherFile = path.join(__dirname, "../teacher.json");
            const teacherData = JSON.parse(fs.readFileSync(teacherFile, "utf-8"));
            const teacherNames = teacherData.map((teacher: { name: string }) => teacher.name);
            const invalidParticipants = value.filter((participant: string) => !teacherNames.includes(participant));
            if (invalidParticipants.length > 0) {
                throw new Error(`Invalid participants: ${invalidParticipants.join(", ")}`);
            }
            return true;
        }
    ),
]