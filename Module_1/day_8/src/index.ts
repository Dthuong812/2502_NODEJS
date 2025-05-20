// import express, { NextFunction, Request, Response } from "express";
// import { EventEmitter } from "events";
// const app = express();
// app.use(express.json());
// const functionMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { isLogin } = req.query;
//   if (Number(isLogin)) {
//     next();
//   } else {
//     res.status(403).json({
//       message: "You are not logged in",
//     });
//   }
// };
// // app.use(functionMiddleware); //dung cho tat ca cac route
// app.get("/test", functionMiddleware, (req: Request, res: Response) => {
//   console.log("chay vao controller");
//   res.send("Hello World");
// });

// app.get("/test2", (req: Request, res: Response, next: NextFunction) => {
//   const { isError } = req.query;
//   if (Number(isError)) {
//     const error = new Error("Something went wrong");
//     next(error);
//   } else {
//     res.send("Hello World 2");
//   }
// });
// const middlewareErrorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log(err);
//   res.status(500).json({
//     message: err.message,
//   });
// };
// const normalizeUserName = (req: Request, res: Response, next: NextFunction) => {
//   if (req.body.username) {
//     req.body.username = req.body.username.trim().toLowerCase();
//   }
//   next();
// };

// const myEventEmitter = new EventEmitter();

// myEventEmitter.on("test", function (name: string) {
//     console.log("test event", name);
// });

// app.post("/signup", normalizeUserName, (req: Request, res: Response) => {
//     myEventEmitter.emit("test", req.body.username);
//   res.json({
//     message: "Ten da dc chuan hoa",
//     data: req.body.username,
//   });
// });

// const checkAuthentication =(req: Request, res: Response, next: NextFunction) => {
//     const autHeader = req.headers.authorization;
//     if (autHeader && autHeader.startsWith("Bearer")) {
//         const token = autHeader.split(" ")[1];
//         if(token === "123456") {
//             next();
//         } else {
//             res.status(403).json({
//                 message: "Ban khong co quyen truy cap"
//             })
//         }
//     }else {
//         res.status(401).json({
//             message: "Ban chua dang nhap"
//         })
//     }
// }
// app.get("/profile", checkAuthentication, (req: Request, res: Response) => {
//   res.json({
//     message: "Day la trang ca nhan",
//   });
// });
// // app.use(middlewareErrorHandler);
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import loggerMiddleware from "./middleware/loggerMiddleware";
import dotenv from "dotenv";
dotenv.config();
// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi MongoDB:", err));
const app = express();
app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});
