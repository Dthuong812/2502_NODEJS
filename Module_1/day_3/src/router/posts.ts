import  express, { Request, Response }  from 'express';
import rateLimit from 'express-rate-limit';

const PostsRouter = express.Router();

const getPostLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 4, 
    message: "Too many requests from this IP, please try again later."
})

const createPostLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 2, 
    message: "Too many requests from this IP, please try again later."
})
PostsRouter.post("/create",createPostLimiter, (req:Request, res:Response) => {
    const { title, content } = req.body;
    if(!title || !content) {
        res.status(400).json({ message: "Title and content are required" });
        return;
    }
   res.status(201).json({ message: "Post created successfully", post: { title, content } });
});
PostsRouter.get("/", getPostLimiter,(req:Request, res:Response) => {
    res.status(200).json({ message: "Get all posts" });
});
export default PostsRouter;
