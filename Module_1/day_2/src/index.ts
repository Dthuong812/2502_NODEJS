import express , {Request , Response} from "express";
import userRoute from "./router/userRoute";
import productRoute from "./router/productRoute";

const app = express();
const PORT = 3000;

app.use(express.json());
// Dinh nghia route
app.get("/",(req: Request , res: Response)=>{
    res.send("Hello may mom")
})
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
//khoi dong chay server
app.listen(PORT ,()=>{
    console.log(` Server running at http://localhost:${PORT}`)
})