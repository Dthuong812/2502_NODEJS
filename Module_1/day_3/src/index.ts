import { event } from './types/authType';
import express from "express"
import path from "path";
import teacherRoute from "./router/assignment.1";
import courseRoute from "./router/courses";
import eventRoute from './router/event';
import PostsRouter from './router/posts';


const app = express();
const PORT = 3000;


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/b1",teacherRoute )
app.use("/b2/course",courseRoute )
app.use("/b4/event",eventRoute )
app.use("/b5/posts",PostsRouter )

app.listen(PORT ,()=>{
    console.log(` Server running at http://localhost:${PORT}`)
})