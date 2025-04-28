import express , {Request , Response} from "express";
import userRoute from "./router/userRoute";
import productRoute from "./router/productRoute";
import bankAccountRoute from "./router/bankAcountRoute";
import path from "path";
import Joi from "joi";
import { body, validationResult } from "express-validator";
path
import Queue from 'bull';
import cron from 'node-cron';

const app = express();
const PORT = 3000;

const emailQueue = new Queue('emailQueue')

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Dinh nghia route
app.get("/",(req: Request , res: Response)=>{
    res.send("Hello may mom")
})
const users = [
    {id:1 , name:"Nguyen Van A"},
    {id:2 , name:"Nguyen Van B"},
    {id:3 , name:"Nguyen Van C"}
]
app.get("/users",(req : Request , res : Response)=>{
    res.render('user.ejs', {data: users});
});
app.post("/users",(req : Request , res : Response)=>{
    const user = req.body;
    console.log(user)
    users.push(user);
    res.render('user.ejs', {data: users});
});


const validationRegister = [
    body('username').notEmpty().withMessage("UserName is required"),
    body('email').isEmail().withMessage("Invalid email format"),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character')
]

app.post ("/register",validationRegister,(req:Request, res:Response)=>{
    const {email} = req.body ?? {};
    // const {username , email, password} = req.body || {};

    // validate thu cong
    // Kiem tra cac truong rong
    // if(!username || !email || !password){
    //     res.status(400).json({error: " All fields are required"});
    //     return ;
    // }
    // // kiem tra dinh dang email 
    // const emailRegex = /\S+@\S+\.\S+/;
    // if (!emailRegex.test(email)) {
    //     res.status(400).json({ error: "Invalid email format" });
    //     return;
    // }
    // // kiem tra do dai cua passwors
    // if(password.length <6){
    //     res.status(400).json({error :" Password must be at least 6 character long"})
    //     return ;
    // }



    // validation thu vien joi

    // const schema = Joi.object({
    //     username : Joi.string().min(3).max(30).required(),
    //     email:Joi.string().email().required(),
    //     password: Joi.string().min(6).required(),
    // });
    // const {error} = schema.validate(req.body);
    // if(error){
    //     res.status(400).json({error: error.details[0].message})
    // }


    //validation express-validator
    const errors = validationResult(req);
    console.log('errors: ', errors);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        return;
        }

        emailQueue.add({email})

        res.status(201).json({ message: 'Đăng kí thành công' });
});

emailQueue.process(async(job) => {
    const {email} = job.data;

    console.log(`Sending email to ${email}`);
})

cron.schedule('*/1 * * * *', () => {
console.log('cronjob được chạy sau 1 phút')
})

    

app.use("/api/products",productRoute);
app.use("/api/bank",bankAccountRoute);
//khoi dong chay server
app.listen(PORT ,()=>{
    console.log(` Server running at http://localhost:${PORT}`)
})