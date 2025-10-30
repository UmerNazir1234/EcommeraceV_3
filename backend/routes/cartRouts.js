import express from 'express';
import { addTocart, updatecart, getUsercart } from '../controllers/cartControllers.js';
import authUser from '../middleware/authUser.js';

const cartRouter = express.Router();

cartRouter.post('/get', authUser, getUsercart);
cartRouter.post('/add', authUser, addTocart);
cartRouter.post('/update', authUser, updatecart);

export default cartRouter;
