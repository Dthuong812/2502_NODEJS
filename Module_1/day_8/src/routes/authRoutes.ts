import { Router } from 'express';
import registrationValidationPipe from '../pipes/registrationValidationPipe';
import { login, register } from '../controllers/authController';


const router = Router();

router.post('/register', registrationValidationPipe,register);
router.post('/login',login);

export default router;
