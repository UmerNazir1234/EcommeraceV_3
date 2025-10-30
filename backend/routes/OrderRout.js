import express from 'express'
import {placeOrder,placeOrderStrip,placeOrderRazorpay,allOrders,userOrders,updateStaus} from '../controllers/OrderController.js'
import adminAuth from '../middleware/admainAuth.js'
import authUser from '../middleware/authUser.js'


const orderRouter = express.Router()
// Admin Feature
orderRouter.post('/list',allOrders)
orderRouter.post('/status',updateStaus)

// Payment feature

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/strip',authUser,placeOrderStrip)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// User feature 
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter