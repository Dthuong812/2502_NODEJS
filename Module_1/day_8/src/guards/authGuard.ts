import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const authGuard =( res: Response, req: Request, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Authorization header is missing"
        });
    }

    if(!token){
        return res.status(401).json({
            message: "Ban chua dang nhap"
        })
    }
    try{
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        (req as any).user = decoded;
        next();
    }
    catch(err){
        return res.status(403).json({
            message: "Token khong hop le"
        })
    }
}
export default authGuard;