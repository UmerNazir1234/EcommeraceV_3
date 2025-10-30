import express from 'express'
import { loginUser,registerUser,admainUser } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admain',admainUser)

export default userRouter;