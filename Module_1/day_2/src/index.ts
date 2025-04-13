import express , {Request , Response} from "express";
import userRoute from "./router/userRoute";

const app = express();
const PORT = 3000;

// Dinh nghia route
app.get("/",(req: Request , res: Response)=>{
    res.send("Hello may mom")
})
app.use("/api/users",userRoute)
//khoi dong chay server
app.listen(PORT ,()=>{
    console.log(` Server running at http://localhost:${PORT}`)
})