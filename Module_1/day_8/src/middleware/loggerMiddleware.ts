import { NextFunction, Request, Response } from "express";
import { LogModel } from "../models/Log";

const loggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logData = {
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    statusCode: req.statusCode,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
  };
  res.on("finish", async () => {
    logData.statusCode = res.statusCode;
    try {
      await LogModel.create(logData);
    } catch (err) {
      console.error("Error logging data", err);
    }
  });
  next();
};

export default loggerMiddleware;
