import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { userEvent } from '../events/userEvent';
import { UserModel } from '../models/User';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   res.status(400).json({ errors: errors.array() });
   return ;
  }

  const { email, password, name } = req.body;

  try {
    const existing = await UserModel.findOne({ email });
    if (existing) {
       res.status(400).json({ message: 'Email đã tồn tại' });
       return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, password: hashedPassword, name });
    await newUser.save();

    userEvent.emit('user_registered', newUser);

    res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
    return ;
  } catch (err) {
    console.error('Registration error:', err); 
     res.status(500).json({ message: 'Lỗi server' });
     return ;
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
      return 
    }

    const isMatch = await bcrypt.compare(password, user.password); 
    
    if (!isMatch) {
      res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
      return ;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '1h' }
    );

    res.json({ message: 'Đăng nhập thành công', token });
    return ;
  } catch (err) {
    console.error('Login error:', err); 
    res.status(500).json({ message: 'Lỗi server' });
    return ;
  }
};