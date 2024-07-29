import express from "express";
import { loginUser, registerUser } from '../controllers/usercontroller.js';

const userRouter = express.Router();


// route for login user
userRouter.post('/login', loginUser);

// route for register user
userRouter.post('/register', registerUser);


export default userRouter;