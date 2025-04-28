import { sendConfirmationEmail } from './../services/emailService';
import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { readTeacher, writeTeacher } from "../services/teacherService";
import { validationRegister, validateLogin } from "../middleware/validation";
import { user } from "../types/authType";

const teacherRoute = express.Router();

// Endpoint đăng ký
teacherRoute.post("/register", validationRegister, async (req: Request, res: Response) => {
    console.log("Received registration request:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { name, email, password } = req.body;
    console.log("Processing registration for:", email);

    const teachers = readTeacher();

    // Check for existing email
    const existingUser = teachers.find(user => user.email === email);
    if (existingUser) {
        console.log("Email already exists:", email);
        res.status(400).json({ message: "Email already exists" });
        return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed for:", email);

    // Create new user
    const newUser: user = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword
    };

    teachers.push(newUser);
    writeTeacher(teachers);
    console.log("User saved to JSON:", email);

    // Send confirmation email
    try {
        await sendConfirmationEmail(email, name);
        console.log("Confirmation email sent to:", email);
        res.status(201).json({ message: "Registration successful. Confirmation email sent." });
        return;
    } catch (error) {
        console.error("Failed to send confirmation email:", error);
        res.status(500).json({ message: "Registration successful, but failed to send confirmation email." });
        return;
    }
});
// Endpoint đăng nhập
teacherRoute.post('/login', validateLogin, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return ;
    }

    const { email, password } = req.body;

    const teachers = readTeacher();

    // Tìm người dùng theo email
    const user = teachers.find(user => user.email === email);
    if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return ;
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid email or password" });
        return ;
    }

    res.status(200).json({ message: "Login successful" });
});

export default teacherRoute;