import express, { Request, Response } from "express";

const userRoute = express.Router();
userRoute.get("//",(req:Request, res:Response)=>{
    const page = req.query.page;
    const limit = req.query.limit
    const id = req.params.id
    res.json({
        message :"thông tin chi tiết : ",
        page : "trang hiện tại " + page,
        limit :" Số trang dữ liệu trong 1 trang " + limit
    })
})
userRoute.post("/",(req:Request, res:Response)=>{
    res.json({
        message :"Thêm người dùng mới"
    })
})
userRoute.put("/",(req:Request, res:Response)=>{
    res.json({
        message :"Cập nhật người dùng"
    })
})
userRoute.delete("/",(req:Request, res:Response)=>{
    res.json({
        message :"Đã xóa người dùng"
    })
})
export default userRoute